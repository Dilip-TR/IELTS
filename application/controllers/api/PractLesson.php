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
class PractLesson extends REST_Controller {

    function __construct()
    {
        // Construct the parent class
        parent::__construct();

        // Configure limits on our controller methods
        // Ensure you have created the 'limits' table and enabled 'limits' within application/config/rest.php
        $this->methods['rows_get']['limit'] = 500000; // 500 requests per hour per user/key
        $this->methods['users_post']['limit'] = 100000; // 100 requests per hour per user/key
        $this->methods['users_delete']['limit'] = 500000; // 50 requests per hour per user/key
    }

 
 
    public function create_practlesson_post()
    {
       
            $input_data = json_decode(trim(file_get_contents('php://input')), true);
            $this->load->model('PractLesson_model');
            $test=$this->PractLesson_model-> new_practlesson($input_data);
          
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


  public function practlesson_all_list_get()
      {
              $input_data = json_decode(trim(file_get_contents('php://input')), true);
              $this->load->model('PractLesson_model');
              $commission_one=$this->PractLesson_model->practlesson_list() ;
              
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


  // public function practsubcategory_all_list_get()
  //     {
  //             $input_data = json_decode(trim(file_get_contents('php://input')), true);
  //             $this->load->model('PractsubCategory_model');
  //             $commission_one=$this->PractsubCategory_model->practsubcategory_list() ;
              
  //             try { 
  //                 if(empty($commission_one)) {
  //                     $this->set_response([], REST_Controller::HTTP_OK);
  //                 }else{
  //                     $this->set_response($commission_one, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
  //                 }
  //             }catch(Exception $e){
  //             //alert the user.
  //                  var_dump($e->getMessage());
  //             }
  //     }




}
