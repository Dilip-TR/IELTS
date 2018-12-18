<?php

defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
require APPPATH . '/libraries/REST_Controller.php';
require APPPATH . '/libraries/phpmailer/PHPMailerAutoload.php';

/**
 * This is an example of a few basic user interaction methods you could use
 * all done with a hardcoded array
 *
 * @package         CodeIgniter
 * @subpackage      Rest Server
 * @category        Controller
 * @author          Phil Sturgeon, Chris Kacerguis
 * @license         MIT
 * @link            https://github.com/chriskacerguis/codeigniter-restserver
 */
class User extends REST_Controller {

    function __construct()
    {
        // Construct the parent class
        parent::__construct();

        // Configure limits on our controller methods
        // Ensure you have created the 'limits' table and enabled 'limits' within application/config/rest.php
        $this->methods['rows_get']['limit'] = 500; // 500 requests per hour per user/key
        $this->methods['users_post']['limit'] = 100; // 100 requests per hour per user/key
        $this->methods['users_delete']['limit'] = 50; // 50 requests per hour per user/key
    }


public function loginget_get()
    {
         
$id=$this->uri->segment('4');
      
      // echo $str ;
      // exit;

     
        // Users from a data store e.g. database
        $this->load->model('User_model');
        $users= $this->User_model->getuser($id) ;

        try { 
            if(empty($users)) {
                $this->set_response([], REST_Controller::HTTP_OK);
            }else{
                $this->set_response($users, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
            }
        }catch(Exception $e){
        //alert the user.
             var_dump($e->getMessage());
        }
        
    }


    public function new_user_post()
    {
            $input_data = json_decode(trim(file_get_contents('php://input')), true);
            $this->load->model('User_model');
           
           
              $email = $input_data['emailVal'];

              if($this->emailexist($email) == 1){
                // echo"email already exists";
                    $finall=array(array("response"=> "fail" , "mesg" => "Email Already Exist") );
                    $this->set_response( $finall, REST_Controller::HTTP_OK);
                 }else{
                  //Call proccedures 
                  
                     try { 

                       $data=$this->User_model->new_user($input_data);
                       if($data == 200) {
                        $email_msg=$this->email_integration_post($input_data);
                         //sms  alert
                        // $this-> sms_integration($input_data) ;
                         //echo $output;
                         $finall=array(array("response"=> "success" , "mesg"=> "Success Fully Registered") ) ;
                         $this->set_response( $finall, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
                         } 
                       }catch(Exception $e){
                //alert the user.
                     var_dump($e->getMessage());
                }
               }  
    }
    public function email_integration_post($input_data){ 

                    $email = "support@texasreview.in";
                    $password = "Support@123";                                     
                    $to_id = $input_data['emailVal'];
                    $fullname = $input_data['fullnameVal'];                    
                    $pass_word = "texas@".substr($input_data['phonenumberVal'], 0, 4);                   
                    $message = "Dear $fullname,<br> You have registered successfully on http://ieltsscorebooster.com<br>
                      Your login credentials are :<br>
                      <b>Username : </b>$to_id<br>
                      <b>Password : </b>$pass_word<br><br>
                      To view your courses and tests, go to http://18.218.122.78:8080/ieltsv02/#!/login and log in with your credentials<br>
                      If you have any problems contact support@ieltsscorebooster.com and you will get a response within 24 hours<br><br>
                      <b><span style='color:red'>Note : </span></b>The above links should be open in PC and Laptops only because they are not working in Mobiles and Tablets";
                    $subject = "IELTS Login Details"; 
                   
                    $mail = new PHPMailer;

                    $mail->isSMTP();

                    $mail->Host = 'smtp.gmail.com';

                    $mail->Port = 587;

                    $mail->SMTPSecure = 'tls';

                    $mail->SMTPAuth = true;

                    $mail->Username = $email;

                    $mail->Password = $password;

                    $mail->setFrom('from@texasreview.in', 'Texas Review');

                    $mail->addReplyTo('replyto@texasreview.in', 'Texas Review');

                    $mail->addAddress($to_id);

                    $mail->Subject = $subject;

                    $mail->msgHTML($message);
                    
                    $mail->send();                      
          
       
     }
      

     public function sms_integration_post(){
      
          $input_data = json_decode(trim(file_get_contents('php://input')), true);
          $user_id    ='texass'; // Your Username
          $pwd        ='texas@321';    // Your Password
          $sender_id  = 'TEXASS';  // Add 6 char sender id viz: HDFCBK        
          $mobile_num = $input_data['phonenumberVal'];  // Mobile Number, You can add comma separated mobile number
          $message = 'Welcome to TexasReview. Your IELTS Login Details
          Username:'.$input_data['emailVal'].' Password:'.'texas@'.substr($input_data['phonenumberVal'], 0, 4);
          // Sending with PHP CURL
          $ch=curl_init();        
          curl_setopt($ch, CURLOPT_URL, "http://tra.bulksmshyderabad.co.in/websms/sendsms.aspx?userid=".$user_id."&password=".$pwd."&sender=".$sender_id."&mobileno=".urlencode($mobile_num)."&msg=".urlencode($message));
            curl_setopt($ch, CURLOPT_HEADER, 0);
            curl_exec($ch);
          //Print error if any
          if(curl_errno($ch))
          {
              //echo 'error:' . curl_error($ch);
          }
          curl_close($ch);
     }

   public function emailexist($email){
             $query   = $this->db->query("CALL `useremailExist1`('$email')");
             $varGet= sizeof($query->result()); 
             $query->next_result(); 
             $query->free_result();
             return  $varGet ;
            }
      
      public function new_status_update_post()
        {
            $input_data = json_decode(trim(file_get_contents('php://input')), true);
            $this->load->model('User_model');
           
            $test=$this->User_model->new_status($input_data);
             try { 
                if(empty($test)) {
                     $finall=array(array("response"=> "success" , "mesg"=> "") ) ;
                     $this->set_response( $finall, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
                }else{
                     $finall=array(array("response"=> "fail" , "mesg" => "Check entered values") );
                     $this->set_response( $finall, REST_Controller::HTTP_OK);

                }
                }catch(Exception $e){
                //alert the user.
                     var_dump($e->getMessage());
                }
          }
 

    public function user_login_post()
        {
            $input_data = json_decode(trim(file_get_contents('php://input')), true);
            $this->load->model('User_model');

            $data=$this->User_model->new_login($input_data);
           try { 
            if(empty($data)) {
                $this->set_response([], REST_Controller::HTTP_OK);
            }else{
                $this->set_response($data, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
            }
        }catch(Exception $e){
        //alert the user.
             var_dump($e->getMessage());
        }
    }
       public function branchList_by_user_get()
            {
                    $name=$this->uri->segment('4');
                    $this->load->model('User_model');
                    $commission_one=$this->User_model->getlist_by_branchname($name) ;
                    
                    try { 
                        if(empty($commission_one)) {
                            $this->set_response([], REST_Controller::HTTP_OK);
                        }else{
                            $this->set_response($commission_one, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
                        }
                    }catch(Exception $e){
                    //alert the user.
                         var_dump($e->getMessage());
                    }
            }

              

    public function user_all_list_get()
      {
        // print_r("enter in");
        // exit;
              $input_data = json_decode(trim(file_get_contents('php://input')), true);
              $this->load->model('User_model');
              $commission_one=$this->User_model->users_list() ;
              
              try { 
                  if(empty($commission_one)) {
                      $this->set_response([], REST_Controller::HTTP_OK);
                  }else{
                      $this->set_response($commission_one, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
                  }
              }catch(Exception $e){
              //alert the user.
                   var_dump($e->getMessage());
              }
      }


    

}
