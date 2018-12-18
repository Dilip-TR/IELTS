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
class Ques extends REST_Controller {

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




 
 
    public function create_question_post()
    {
            $input_data = json_decode(trim(file_get_contents('php://input')), true);
            $this->load->model('Question_model');
            $test=$this->Question_model->new_question($input_data['section'],$input_data['question_type'],$input_data['question_title'],$input_data['question_cat'],$input_data['question_content'],$input_data['skills'],$input_data['difficulty_levels'],$input_data['choice1'],$input_data['choice2'],$input_data['choice3'],$input_data['choice4'],$input_data['choice5'],$input_data['choice6'],$input_data['choice7'],$input_data['choice8'],$input_data['choice9'],$input_data['is_answer'],$input_data['solution_text']);
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
    public function question_list_get()
    {
            $input_data = json_decode(trim(file_get_contents('php://input')), true);
            $this->load->model('Question_model');
            $users=$this->Question_model->question_list();

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

   
    

}
