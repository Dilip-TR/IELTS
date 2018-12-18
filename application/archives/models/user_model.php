<?php 

class User_model extends CI_Model {

        // public $title;
        // public $content;
        // public $date;
       
        public function __construct()
        {
                // Call the CI_Model constructor
                parent::__construct();
        }

        public function new_user($email,$pass,$date)
        {       

        		//Predefind function don't think much
                $this->load->helper('url');
                //Call proccedures 
                $query = $this->db->query("CALL `newUser`('$email','$pass','$date')");

                //NO error handling assume everything fine
                $commission_one=array();
                return $query;
        }


         public function user_login($email,$pass)
        {       

        		//Predefind function don't think much
                $this->load->helper('url');
                //Call proccedures 
                $query = $this->db->query("CALL `userLogin`('$email','$pass')");
                //NO error handling assume everything fine
               
                  if(sizeof($query->result_array())){ 
                        $result= array('id' => $query->result_array()[0]['id'],'ttl' =>"9BAxUC1DobvTUkwjdUKJiPZBtBPZbhDx8LcjmxUafuu1LPZoiEh6wMPQQHPOOf3L","created"=>"2017-06-11T04:58:53.213Z","userId"=>$query->result_array()[0]['id']  );
                             return $result;
                    }else{
                        $result= array("error"=>array("name"=> "Error",
                                    "status"=> 401,
                                    "message"=> "login failed",
                                    "statusCode"=> 401,
                                    "code"=> "LOGIN_FAILED")) ;
                            return $result ;
                    }


                    
        }

       

}

?>
