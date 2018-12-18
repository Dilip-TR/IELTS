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
class Admin extends REST_Controller {

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


     public function login_post()
    {
         
         
       // $username=$this->uri->segment('4');
       // $password= $this->uri->segment('5');

         $input_data = json_decode(trim(file_get_contents('php://input')), true);
        // Users from a data store e.g. database
        $this->load->model('admin_model');
        $data= $this->admin_model->login($input_data) ;

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


     public function productDetail_get()
    {
         
        $str= $this->uri->segment('4');
        
        // Users from a data store e.g. database
        $this->load->model('product_model');
        $users= $this->product_model->productDetail( $str) ;

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



    public function cattycount_get()
    {
        // Users from a data store e.g. database
        $this->load->model('industries_model');
        $rows= $this->industries_model->get_rows_count() ;
        try { 
            if(empty($rows)) {
                $this->set_response([], REST_Controller::HTTP_OK);
            }else{
                $this->set_response($rows[0], REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
            }
        }catch(Exception $e){
        //alert the user.
             var_dump($e->getMessage());
        }
        
    }

 
    public function cattsty_post()
    {
            $input_data = json_decode(trim(file_get_contents('php://input')), true);
           
            $this->load->model('test_model');
           
            $test=$this->test_model->insert_entry($input_data);
           
        // $this->some_model->update_user( ... );
        //$message =$this->input->post();
        //print_r($this->input->post()) ;
        //$this->set_response($message, REST_Controller::HTTP_CREATED); // CREATED (201) being the HTTP response code
    }

    public function cattsty_delete()
    {
        $id = (int) $this->get('id');

        // Validate the id.
        if ($id <= 0)
        {
            // Set the response and exit
            $this->response(NULL, REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
        }

        // $this->some_model->delete_something($id);
        $message = [
            'id' => $id,
            'message' => 'Deleted the resource'
        ];

        $this->set_response($message, REST_Controller::HTTP_NO_CONTENT); // NO_CONTENT (204) being the HTTP response code
    }

}
