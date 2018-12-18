


<?php

defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
require APPPATH . '/libraries/REST_Controller.php';

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
class Images extends REST_Controller {

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

    // public function latest_product_get()
    // {
         
         
    //    $fromid=(int)$this->uri->segment('4');
    //     $toid= (int)$this->uri->segment('5');
    //     // Users from a data store e.g. database
    //     $this->load->model('product_model');
    //     $users= $this->product_model->get_last_ten_entries( $fromid,$toid) ;

    //     try { 
    //         if(empty($users)) {
    //             $this->set_response([], REST_Controller::HTTP_OK);
    //         }else{
    //             $this->set_response($users, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
    //         }
    //     }catch(Exception $e){
    //     //alert the user.
    //          var_dump($e->getMessage());
    //     }
        
    // }


     public function upload_post()
    {
         
       //  print_r($_FILES) ;

            $valid_mime_types = array(
                        "image/gif",
                        "image/png",
                        "image/jpeg",
                        "image/pjpeg",
                    );
         
		        // Check that the uploaded file is actually an image
		        // and move it to the right folder if is.
                if (in_array($_FILES['file']["type"], $valid_mime_types)) {
                	$temp = explode(".", $_FILES["file"]["name"]);
					$newfilename = round(microtime(true)) . '.' . end($temp);
                    $destination = "uploads/" .$newfilename;
                    move_uploaded_file($_FILES['file']["tmp_name"], $destination);
                    echo json_encode(array('status' => 'success', 'msg' => 'success','error'=> 0,'path'=>$newfilename));
                }else{
                	 echo json_encode(array('status' => 'error', 'msg' => 'Please check date format','error'=> 1));
                }

             
         


       // $username=$this->uri->segment('4');
       // $password= $this->uri->segment('5');

       //  $input_data = json_decode(trim(file_get_contents('php://input')), true);
        // Users from a data store e.g. database
        
        
    }

 

}
