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




 
 
    public function new_user_post()
    {
            $input_data = json_decode(trim(file_get_contents('php://input')), true);
            $this->load->model('User_model');
            $test=$this->User_model->new_user($input_data['email'],$input_data['password'],$input_data['date']);
             try { 
                if(empty($test)) {
                     $finall=array(array("response"=> "fail" , "mesg" => "Check entered values") );
                     $this->set_response( $finall, REST_Controller::HTTP_OK);
                    
                }else{
                     $finall=array(array("response"=> "success" , "mesg"=> "") ) ;
                     $this->set_response( $finall, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
                    
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
            $data=$this->User_model->user_login($input_data['email'],$input_data['password']);
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

    

}
