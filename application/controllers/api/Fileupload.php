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
class Fileupload extends REST_Controller {

    function __construct()
    {
        // Construct the parent class
        parent::__construct();

        // Configure limits on our controller methods
        // Ensure you have created the 'limits' table and enabled 'limits' within application/config/rest.php
        $this->methods['rows_get']['limit'] = 500; // 500 requests per hour per user/key
        $this->methods['users_post']['limit'] = 100; // 100 requests per hour per user/key
        $this->methods['users_delete']['limit'] = 50; // 50 requests per hour per user/key
        $this->output->set_header('Access-Control-Allow-Origin: *');
    }

     public function uploadfile_post()
        {   

            $this->response( 'enterin', REST_Controller::HTTP_OK); 
            
            $valid_mime_types = array(
                "image/gif",
                "image/png",
                "image/jpeg",
                "image/pjpeg",
            );
 
        // Check that the uploaded file is actually an image
        // and move it to the right folder if is.
        if (in_array($_FILES["myimage"]["type"], $valid_mime_types)) {
            $destination = "uploads/" . $_FILES["myimage"]["name"];
            move_uploaded_file($_FILES["myimage"]["tmp_name"], $destination);
            
        }
            $array_test=$destination;
            $this->response( $array_test, REST_Controller::HTTP_OK); 
        }

}
