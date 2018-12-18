<?php 

require APPPATH . '/libraries/phpmailer/PHPMailerAutoload.php';

class Test_model extends CI_Model {

        // public $title;
        // public $content;
        // public $date;
       
        public function __construct()
        {
                // Call the CI_Model constructor
                parent::__construct();
        }
        public function new_test($data)
        {       
                 
                 //, $data['quetype'],$data['status'],$data['status']
                //   Predefind function don't think much
                $this->load->helper('url');
                $nameVal = $data['name'] ;
                $testid = mt_rand(100000, 999999) ; ;
                $status =  $data['status'] ;
                $test_type_id =  $data['test_type_idVal'] ;
                $sections = $data['sections'] ;
                //  Call proccedures 
                $sql="CALL `createTest`(?,?,?,?)" ;
                $query = $this->db->query($sql,array($nameVal,$testid,$status,$test_type_id));
                //  $query1 = $this->db->query("CALL `GetOptionByTrackid`($trackid)");
                //  $query2 =$this->db->query("CALL `createOptions`(456,'dfsd',0)");
                //  $getId=$query1->result_array() ;
                //  $getIdVal=$getId[0]['id'] ;
                foreach($sections as $key=>$data){
                         //$this->commission_one[$row['0']]= $row['1'];
                        //store values in db as jsonformat using json encode mathed 
                        $sections[$key]['questionids'] = json_encode($data['questionids']) ;
                        $sections[$key]['testid'] = $testid ;
                 }
                 //Create batch array insert
                $this->db->insert_batch('tbl_sections',$sections);
                //NO error handling assume everything fine
                //$commission_one=array();
                return [];
                //return $getId[0] ;
         }
      public function users_list()
            {     
                    //Predefind function don't think much
                    //$this->load->helper('url');
                    //Call proccedures 
                    $query = $this->db->query("CALL `usersget`()");
                    //NO error handling assume everything fine
                    $commission_one=array();
                   
                  //   $commission_one[1]['options']=1;
                 return $commission_one;
            }

           public function test_listbytestid($userid,$testid)
                 { 
                  // $stored_procedure= "CALL gettest_by_id($userid,$testid)";
                 $query = $this->db->query("CALL gettest_by_id('$userid','$testid')");
                 $result = $query->result();
                 // $query->next_result(); 
                 // $query->free_result();
                return $result;
                 }

 public function review_writing($data,$text)
         {   
              //,$data['quetype'],$data['status'],$data['status']
                    //Predefind function don't think much
                    $this->load->helper('url');
                    $useId = $data['useId'] ;
                    $testId = $data['testId'] ;
                    $phoneNo = $data['phoneNo'] ;
                    $jsonData = json_encode($data["toalObj"]);
                    $myfile = file_put_contents('uploads/'.$useId. $testId.'.json',  $jsonData);
                    $toalObj = 'uploads/'.$useId. $testId.'.json' ; 
                    $graphdata = json_encode($data["graphdata"],true);
                    $resultData = json_encode($data['resultData'],true) ;
                    // $sql="CALL `updatewritingreview`($useId,$testId)" ;
                    $sql= "CALL `updatewritingreview`(?,?,?,?,?)" ;
                    // echo "$sql";
                    // exit;
                    $query = $this->db->query($sql,array($useId,$testId,$toalObj,$resultData,$graphdata));
                    // print_r($query);
                    // exit;
                    $sms=$this->sms_integration_post($phoneNo);
                    echo  $sms;
                    return [];
            }

       
            // public function save_test_data($data)
            //         {       
            //         //Predefind function don't think much
            //         $this->load->helper('url');
            //         $useId = $data['useId'] ;
            //         $testId = $data['testId'] ;
            //         $trackid = mt_rand(100000, 999999) ; 
            //         //json_encode($data['toalObj'] )
            //         $jsonData = json_encode($data["toalObj"]);
            //         $myfile = file_put_contents('uploads/'.$useId. $testId.'.json',  $jsonData);
            //         $toalObj = 'uploads/'.$useId. $testId.'.json' ; 
            //         $resultData = json_encode($data['resultData'],true) ;
            //         $testType = $data['testType'] ;
            //         $sectionWiseResult = $data['sectionWiseResult'] ;
            //         $resultData = json_encode($data['resultData'],true) ;
            //         $testType = $data['testType'] ;
            //         $awsstatus = $data['awsstatus'] ;
            //         $graphdata =json_encode($data['graphdata'],true) ;
            //         $r1 = $data['r1'] ;
            //         $r2 = $data['r2'] ;
            //         $sql="CALL `saveTest`(?,?,?,?,?,?,?,?,?,?)" ;
            //          $query = $this->db->query($sql,array($useId,$testId,$trackid,$toalObj, $resultData,$testType,$awsstatus,$graphdata,$r1, $r2));
                    
            //         return [];
            //         //return $getId[0] ;
            //     }


        public function save_test_data($data)
                    {                    
                    //Predefind function don't think much
                    $this->load->helper('url');                    
                    $useId = $data['useId'] ;
                    $testId = $data['testId'] ;                    
                    $test_name = $data['test_name'] ;                    
                    $r2 = $data['r2'] ;
                    $trackid = mt_rand(100000, 999999) ;                    
                    $jsonData = json_encode($data["toalObj"]);                    
                    $file_name='uploads/'.$useId. $test_name.'.json';
                    $file_path=baseUrl.$file_name;
                    if (file_exists($file_path)) {                      
                       unlink($file_path);                           
                    }                                 
                    $myfile = file_put_contents($file_name, $jsonData);  
                    $toalObj = $file_name ; 
                    $resultData = json_encode($data['resultData'],true) ;
                    $testType = $data['testType'] ;
                    //$sectionWiseResult = $data['sectionWiseResult'] ;                   
                    $testType = $data['testType'] ;
                    $writing_status = $data['awsstatus'] ;
                    $graphdata =json_encode($data['graphdata'],true) ;                   
                    $r3 = $data['r3'] ; 
                    $date = date('Y-m-d H:i:s');                          
                    
                    $no_of_rec=$this->get_result_test_rows($useId,$test_name);

                    if($no_of_rec>0) 
                    {   // For updating test results                        
                        $sql="CALL `updateTest`(?,?,?,?,?)";    
                        if (!$this->db->query($sql,array($resultData,$graphdata,$writing_status,$date,$no_of_rec)))
                            {
                                $error = $this->db->error(); // Has keys 'code' and 'message'
                                //print_r($error);exit();
                            } 
                        else{
                                if($writing_status=="completed"){                                  
                                     $query = $this->db->query("SELECT fullname,phonenumber,email FROM  tbl_user_registration WHERE  id=$useId");
                                    $phoneNo = $query->result()[0]->phonenumber;
                                    $send_email = $query->result()[0]->email;   
                                    $full_name  = ucfirst($query->result()[0]->fullname);
                                    $sms=$this->sms_integration_post($full_name,$phoneNo);
                                    $send_msg=$this->email_integration_post($full_name,$send_email);
                                }
                            }    
                        return []; 
                    }
                    else{   // For creation of new test results
                        
                        $sql="CALL `saveTest`(?,?,?,?,?,?,?,?,?,?,?,?)" ;   
                        $query = $this->db->query($sql,array($useId,$testId,$trackid,$toalObj, $resultData,$testType,$writing_status,$graphdata,$test_name,$r2,$r3,$date));       
                        return [];  
                    }                                           
                    //return $getId[0] ;                    
                }


                public function email_integration_post($full_name,$send_email){ 

                    $email = "support@texasreview.in" ;
                    $password = "Support@123";                                     
                    $to_id = $send_email;                                                           
                    $message = "Dear $full_name,<br> Your IELTS Writing section was evaluated successfully.<br> Please check in http://18.218.122.78:8080/ieltsv02/#!/login portal for your results.<br>
                      If you have any problems contact support@texasreview.in and you will get a response within 24 hours<br><br>
                      <b><span style='color:red'>Note : </span></b> The above links should be open in PC and Laptops only because they are not working in Mobiles and Tablets";
                    $subject = "Status of IELTS Writing Section Evaluation"; 
                   
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

         public function get_result_test_rows($useId,$test_name){         
           $query = $this->db->query("SELECT id from tbl_test_result WHERE  userid=$useId AND test_name = '$test_name'");
           //NO error handling assume everything fine
           $retn = $query->result()[0]->id;           
           return $retn;            
         }
          public function sms_integration_post($full_name,$num){     
          
          $user_id    ='texass'; // Your Username
          $pwd        ='texas@321';    // Your Password
          $sender_id  = 'TEXASS';  // Add 6 char sender id viz: HDFCBK        
         // $mobile_num =$num;  // Mobile Number, You can add comma separated mobile number
          $message = "Dear $full_name, your IELTS Writing section was evaluated successfully, please check in portal for your results, Thank You";
          // Sending with PHP CURL
          $ch=curl_init();        
          curl_setopt($ch, CURLOPT_URL, "http://tra.bulksmshyderabad.co.in/websms/sendsms.aspx?userid=".$user_id."&password=".$pwd."&sender=".$sender_id."&mobileno=".urlencode($num)."&msg=".urlencode($message));
            curl_setopt($ch, CURLOPT_HEADER, 0);
            curl_exec($ch);
          //Print error if any
          if(curl_errno($ch))
          {
              //echo 'error:' . curl_error($ch);
          }
          curl_close($ch);
     }

         // public function save_test_data($data,$text)
         // {       
         //       // print_r('expression');
         //       // exit();      //,$data['quetype'],$data['status'],$data['status']
         //            //Predefind function don't think much
         //            $this->load->helper('url');
         //            $useId = $data['useId'] ;
         //            $testId = $data['testId'] ;
         //            $trackid = mt_rand(100000, 999999) ; 
         //            //json_encode($data['toalObj'] )
         //            $jsonData = json_encode($data["toalObj"]);
         //            $myfile = file_put_contents('uploads/'.$useId. $testId.'.json',  $jsonData);
         //            $toalObj = 'uploads/'.$useId. $testId.'.json' ;
         //            $sectionWiseResult = $data['sectionWiseResult'] ;
         //            $resultData = json_encode($data['resultData'],true) ;
         //            $testType = $data['testType'] ;
         //            $awsstatus = $data['awsstatus'] ;
         //            $graphdata =json_encode($data['graphdata'],true) ;
         //            $r1 = $data['r1'] ;
         //            $r2 = $data['r2'] ;

         //              // echo $resultData;
         //              // exit;

         //            // $fre=$this->get_result_test_rows($useId,$testId);
         //            //  //NO error handling assume everything fine 
         //            //  if($text == 'update'){
         //            //     //UPdate row
         //            //      // //Call proccedures 
         //            //     $sql="CALL `updateTest`(?,?,?,?,?,?,?,?,?,?)" ;
         //            //     $query = $this->db->query($sql,array($useId,$testId,$trackid,$toalObj,$resultData,$testType, $awsstatus, $graphdata,$r1, $r2));
         //            //  }else{
         //            //     //Insert row
         //            //      // //Call proccedures 
         //            //     $sql="CALL `saveTest`(?,?,?,?,?,?,?,?,?,?)" ;
         //            //     $query = $this->db->query($sql,array($useId,$testId,$trackid,$toalObj, $resultData,$testType,$awsstatus,$graphdata,$r1, $r2));
         //            //  }
         //              $sql="CALL `saveTest`(?,?,?,?,?,?,?,?,?,?)" ;
         //                $query = $this->db->query($sql,array($useId,$testId,$trackid,$toalObj, $resultData,$testType,$awsstatus,$graphdata,$r1, $r2));

                
         //            return [];
         //            //return $getId[0] ;
         //    }

                 public function resume_test($data)
                    {       
          
                
                        //Predefind function don't think much
                        $this->load->helper('url');
                        $useId = $data['useId'] ;
                        $testId = $data['testId'] ;
                        $trackid = mt_rand(100000, 999999) ; 
                        //json_encode($data['toalObj'] )
                        $jsonData = json_encode($data["toalObj"]);
                        $myfile = file_put_contents('uploads/'.$useId. $testId.'.json',  $jsonData);
                        $toalObj = 'uploads/'.$useId. $testId.'.json' ;
          

                      
                        //Call proccedures 
                        $sql="CALL `createtestresume`(?,?,?,?)" ;
                        $query = $this->db->query($sql,array($useId,$testId,$trackid,$toalObj));
                       
                        //$commission_one=array();
                        return [];
                        //return $getId[0] ;
                    }
            public function question_list()
                 {       
                    //Predefind function don't think much
                    //$this->load->helper('url');
                    //Call proccedures 
                    $query = $this->db->query("CALL `getQuestionsList`()");
                    //NO error handling assume everything fine
                    $commission_one=array();
                    foreach($query->result_array()as $key=>$data){
                            $data['options'] =  $this->optionById_list($data['trackid']) ;
                             $commission_one[] = $data ;
                    }
                  //   $commission_one[1]['options']=1;
                 return $commission_one;
            }
          public function dashbord($userid)
        {     
        // echo "enter in";  
        // exit;
              //Call proccedures 
              $commission_one=array();
              // $commission_one['maths']=$this->dashbordByCat_list('maths',$userid) ;
              // $commission_one['Verbal']=$this->dashbordByCat_list('Verbal',$userid) ;
              $commission_one['fullLength']=$this->fullLengthTestByUserlist($userid) ;

              $commission_one['lineData']=$this->line_data_values($commission_one['fullLength']) ;;

       
            return $commission_one ;
        }  

        public function fullLengthTestByUserlist($userid)
        	{       
                //Call proccedures 
              $query = $this->db->query("CALL `getUserAttendTest`($userid)");
              
               //NO error handling assume everything fine
              $commission_one=array();

              foreach($query->result_array() as $key=>$data){
                    //$commission_one[1]['options']=1;
              	      $commission_one[] = $data;
                	}

   				 return $query->result_array() ;
			}

			public function line_data_values($data_full)
        	{       
                //Call proccedures 
               
              
              $commission_one=array();

              foreach($data_full as $key=>$data){
                    //$commission_one[1]['options']=1;
              		  $total_data =  json_decode($data['graphdata']) ;
              		  $total_data->testname= $data['title'] ;
              	      $commission_one[] =  $total_data;
                	}

   				 return  $commission_one ;
			}


         public function test_by_id($id)
            {       
                    //Predefind function don't think much
                    //$this->load->helper('url');
                    //Call proccedures 
                    $query = $this->db->query("CALL `testBytrackid`($id)");
                    //NO error handling assume everything fine
                    $commission_one=array();
                    foreach($query->result_array()as $key=>$data){
                            $data['sections'] =  $this->sectionById_list($id) ;
                            $commission_one[] = $data ;
                    }
                    //$query->free_result();
                    $commission_one[0]['questions'] =[] ;
                    $tempArry = array() ;
                    foreach($commission_one[0]['sections'] as $key=>$data){
                      $commission_one[0]['sections'][$key]->questionids = json_decode($data->questionids);
                       // $commission_one[0]['sections'][$key]['questionids'] =  $data->questionids ;
                       $tempArry[] = $data->questionids;
                    }
                   $commission_one[0]['questions'] =  $this->question_By_in_list(array_merge(...$tempArry) ) ;
                  //   $commission_one[1]['options']=1;
                 return $commission_one[0];
            }
             public function question_By_in_list1($userid,$obj)
            {    
                
                    $comma_separated = implode(",", $obj);
                    // echo "SELECT * from  practise_result_data1 where userid = $userid and  trackid =  $comma_separated" ;
                    $query1 = $this->db->query("SELECT * from  practise_result_data1 where userid = $userid and  trackid = $comma_separated");

                    if($query1->result_array()){
                         $data =array() ;
                        // $data[0] =$query1->result_array() ;
                         //$data =$data['totalobj'] ;
                         $temp =[];
                       foreach($query1->result_array() as $key=>$data){
                             $temp = json_decode($data['totalobj'],true) ;
                        }
                         $data[0]['qua'] = $temp ;
                         $data[0]['is_attend'] = true ;
                         return $data[0] ;                       
                    }else{
                        $query = $this->db->query("SELECT * from tbl_question_new WHERE trackid IN ( $comma_separated)");
                        //NO error handling assume everything fine
                        $commission_one=array();
                        foreach($query->result_array() as $key=>$data){
                              $data['is_attend'] = false ; 
                              $data['options'] =  $this->optionById_list($data['trackid']) ;
                              $commission_one[] = $data ;
                        }
                        

                         $query->next_result(); 
                         $query->free_result();
                      // $commission_one[1]['options']=1;
                        return $commission_one;
                    }
                     }
                     public function writing_getlist_by_branchname($name)
               {    

                  $query = $this->db->query("CALL `getawscms`('$name')");
                 
         //         //NO error handling assume everything fine
                    return $query->result_array() ;
                }
          public function question_By_in_list($obj)
            {    
                
                    $comma_separated = implode(",", $obj);
                    $query = $this->db->query("SELECT * from tbl_question_new WHERE trackid IN ( $comma_separated)");
                    //NO error handling assume everything fine
                    $commission_one=array();
                    foreach($query->result_array() as $key=>$data){
                          $data['options'] =  $this->optionById_list($data['trackid']) ;
                          $commission_one[] = $data ;
                    }
                     $query->next_result(); 
                     $query->free_result();
                  // $commission_one[1]['options']=1;
                 return $commission_one;
            }
           public function optionById_list($id)
            {       
                 $stored_procedure= "CALL GetOptionByTrackid($id)";
                 $query=@$this->db->query($stored_procedure,array());
                 $result = $query->result();
                 $query->next_result(); 
                 $query->free_result();
                 return $result;
            }
          public function test_list()
            {       
                //Predefind function don't think much
                //$this->load->helper('url');
                //Call proccedures 
                $query = $this->db->query("CALL `gettest`()");
                //NO error handling assume everything fine
                // foreach($query->result_array()as $key=>$data){
                //         $data['options'] =  $this->optionById_list($data['trackid']) ;
                //         $commission_one[] = $data ;
                // }
               //$commission_one[1]['options']=1;
               return $query->result_array();
            }
           public function test_list_userId($userid)
            {       
                    //Predefind function don't think much
                    //$this->load->helper('url');
                    //Call proccedures 
                    $query = $this->db->query("CALL `allTestList`()");
                    //NO error handling assume everything fine
                    $commission_one=array();
                    foreach($query->result_array()as $key=>$data){
                            $data['is_attend_test'] =  $this->checkIsAttendExam($userid,$data['testid'])  ;
                            //$data['is_test_resume'] =  $this->checkIsResumeExam($userid,$data['testid'])  ;
                            $commission_one[] = $data ;
                    }
                  //   $commission_one[1]['options']=1;
                 return $commission_one ;
            }
            public function checkIsAttendExam($userid,$testid)
            {       
                // echo "CALL checkIdInTest($userid,$testid)" ;
                // exit ;
                 $stored_procedure= "CALL checkIdInTest($userid,$testid)";
                 $query=$this->db->query($stored_procedure,array());
                 $result = $query->result();
                 $query->next_result(); 
                 $query->free_result();
                 if($result){
                    return $result[0];
                 }else{
                    return "" ;
                 }
            }
               public function checkIsResumeExam($userid,$testid)
            {       

               
                 $stored_procedure= "CALL checkIsResumeExam($userid,$testid)";
                 $query=@$this->db->query($stored_procedure,array());
                 $result = $query->result();
                 $query->next_result(); 
                 $query->free_result();
                 if($result){
                    return true;
                 }else{
                    return false ;
                 }
            }

            public function test_review_id($userid,$testid)
            {       
                 $stored_procedure= "CALL checkIdInTest($userid,$testid)";
                 $query=@$this->db->query($stored_procedure,array());
                 $result = $query->result_array() ;
                 $query->next_result(); 
                 $query->free_result();
                 return   json_decode($result[0]['result_data'])   ;  
            }
            public function sectionById_list($id)
            {       
                 $stored_procedure= "CALL sectionsByid($id)";
                 $query=@$this->db->query($stored_procedure,array());
                 $result = $query->result();
                 $query->next_result(); 
                 $query->free_result();
                 
                 return $result;
            }
            public function row_delete($id){
               $res=$this->db->delete('tbl_question_new', array('trackid' => $id)); 
               $res1=$this->db->delete('tbl_options', array('question_id' => $id)); 
               if($res){
                   $result= array("error"=>array("name"=> "Error",
                                  "status"=> 200,
                                  "message"=> "success",
                                  "statusCode"=> 200,
                                  "code"=> "success")) ;
                          return $result ;
                  }else{
                    $result= array("error"=>array("name"=> "Error",
                                          "status"=> 401,
                                          "message"=> "Error",
                                          "statusCode"=> 401,
                                          "code"=> "delete_FAILED")) ;
                         return $result ;
                  }
          }

}

?>
