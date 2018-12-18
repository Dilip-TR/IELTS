<?php 

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

                //,$data['quetype'],$data['status'],$data['status']
               //Predefind function don't think much
                $this->load->helper('url');
                $nameVal = $data['name'] ;
                $testid = mt_rand(100000, 999999) ; ;
                $status =  $data['status'] ;
                $sections = $data['sections'] ;
                //  Call proccedures 
                $sql="CALL `createTest`(?,?,?)" ;

                $query = $this->db->query($sql,array($nameVal,$testid,$status));
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


           public function save_test($data)
            {       
                    
                     //,$data['quetype'],$data['status'],$data['status']
                    //Predefind function don't think much
                    $this->load->helper('url');
                    $useId = $data['useId'] ;
                    $testId = $data['testId'] ;
                    $trackid = mt_rand(100000, 999999) ; ;
                    $toalObj =  json_encode($data['toalObj'],true) ;
                    $sectionWiseResult = $data['sectionWiseResult'] ;
                    $resultData = json_encode($data['resultData'],true) ;
                    //Call proccedures 
                    $sql="CALL `saveTest`(?,?,?,?,?)" ;
                    $query = $this->db->query($sql,array($useId,$testId,$trackid,$toalObj, $resultData));
                    $sections=[] ;
                     foreach($sectionWiseResult['sections'] as $key=>$data){
                              $sections[$key]['trackid'] =$trackid;
                              $sections[$key]['section'] =$key+1;
                              $sections[$key]['total_quations'] = count($data);
                              $sections[$key]['correct_ans'] = $data['result'];
                     }
                    //Create batch array insert
                    $this->db->insert_batch('tbl_result_sections',$sections);
                    //NO error handling assume everything fine
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

       

 
          public function question_By_in_list($obj)
        {       

               
                $comma_separated = implode(",", $obj);
                $query = $this->db->query("SELECT * from tbl_question_new WHERE trackid IN ( $comma_separated ) ");
                //NO error handling assume everything fine
                $commission_one=array();
                foreach($query->result_array() as $key=>$data){
                      $data['options'] =  $this->optionById_list($data['trackid']) ;
                         $commission_one[] = $data ;

                }
                 $query->next_result(); 
                 $query->free_result();
                 
              //   $commission_one[1]['options']=1;
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
                    $query = $this->db->query("CALL `allTestList`()");
                    //NO error handling assume everything fine
                    
                    // foreach($query->result_array()as $key=>$data){
                    //         $data['options'] =  $this->optionById_list($data['trackid']) ;
                    //          $commission_one[] = $data ;

                    // }

                  //   $commission_one[1]['options']=1;
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
                            $commission_one[] = $data ;
                    }
                  //   $commission_one[1]['options']=1;
                 return $commission_one ;
            }


            public function checkIsAttendExam($userid,$testid)
            {       
                 $stored_procedure= "CALL checkIdInTest($userid,$testid)";

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

                 echo   json_decode($result[0]['totalobject'],true)  ;  
               exit ;
                 
                 
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
