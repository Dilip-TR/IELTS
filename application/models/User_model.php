<?php 
error_reporting(0);
class User_model extends CI_Model {

        // public $title;
        // public $content;
        // public $date;
         public function __construct()
        {
                // Call the CI_Model constructor
                parent::__construct();
        }
           public function new_user($data)
            { 
                 //Predefind function don't think much
                 $this->load->helper('url');
                 $fullname    = $data['fullnameVal'] ;
                 $email       = $data['emailVal'] ;
                 $phonenumber = $data['phonenumberVal'] ;
                 $password    = "texas@".substr($phonenumber, 0, 4);
                 $branch      = $data['branchVal'] ;
                 $expire_date = $data['expiredate'] ;
                 $user_type   = $data['usertype'] ;
                 $status      = $data['status'] ;
                 $acttype      = $data['acttype'] ;
                 $sourcereg      = $data['sourcereg'] ;
                 $created_date = Date('Y-m-d H:i:s');
                 // echo sizeof($query->result() )
                 $sql= "CALL `newUser`(?,?,?,?,?,?,?,?,?,?,?)" ;
                 // $query = $this->db->query($sql, array($fullname,$email,$password,$branch,$phonenumber,$expire_date, $user_type,$status,$acttype,$sourcereg));

                 if ( ! $this->db->query($sql, array($fullname,$email,$password,$branch,$phonenumber,$expire_date, $user_type,$status,$acttype,$sourcereg,$created_date)))
                        {
                                $error = $this->db->error(); // Has keys 'code' and 'message'
                                print_r($error);exit();
                        }   
                 return 200 ;
           }

        //sms alert end

               public function getuser($id)
            {       
                     $this->load->helper('url');
                     $idVal=$id ;
                      $sql = "CALL `getlogin`(?)" ;
                    //  Call proccedures 
                    $query = $this->db->query($sql, array($idVal) );
         //Call proccedures 
                // $query = $this->db->query("CALL ``('$fullname','$email','$password''$branch','$phonenumber')");

                //NO error handling assume everything fine
              
                return $query->result_array()[0];
            }
             public function users_list()

        {
         $query = $this->db->query("CALL `usersget`()");
      
            return $query->result_array();
        }

       
          public function getlist_by_branchname($name)
               {    
                  $query = $this->db->query("CALL `getBranchwiseDetails`('$name')");
         //         //NO error handling assume everything fine
                    return $query->result_array() ;
                }

             public function new_status($data)
              {       
                 $this->load->helper('url');
                 $status1 = $data['status1'] ;
                 $useridV = $data['useridV'] ;
                 $sql= "CALL `userAct`(?,?)" ;
                        //  Call proccedures 
                 $query = $this->db->query($sql, array($status1,$useridV) );
                
                 return [];
             }
               
 
         public function new_login($data)
        {       

           $email = $data['email'] ;
                 $password = $data['password'] ;
        		//Predefind function don't think much
                $this->load->helper('url');
                //Call proccedures 
                $query = $this->db->query("CALL `userLogin`('$email','$password')");
                //NO error handling assume everything fine
               
                  if(sizeof($query->result_array())){ 
                        $result= array('id' => $query->result_array()[0]['id'],'ttl' =>"9BAxUC1DobvTUkwjdUKJiPZBtBPZbhDx8LcjmxUafuu1LPZoiEh6wMPQQHPOOf3L","created"=>"2017-06-11T04:58:53.213Z","userId"=>$query->result_array()[0]['id'],"status"=>$query->result_array()[0]['status']  );
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
