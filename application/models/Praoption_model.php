<?php 
//error_log(0);
class Praoption_model extends CI_Model {

        // public $title;
        // public $content;
        // public $date;
       
        public function __construct()
        {
                // Call the CI_Model constructor
                parent::__construct();
        }

     
        public function new_par($data)
        { 
                //Predefind function don't think much
                $this->load->helper('url');
                $title = $data['title'] ;
                $trackid = mt_rand(100000, 999999) ;
                $paragraph=$data['paragraph'] ;
                $type =   $data['type'] ;
                $f1   =   $data['f1'] ;
                $f2   =   $data['f2'] ;
                $f3   =   $data['f3'] ;
                $f4   =   $data['f4'] ;                
                //$sql= "CALL `createQuestion`('$nameVal','$quetype','$status','$trackid','$noblk')" ;
                $sql= "CALL `createParagraph`(?,?,?,?,?,?,?,?)" ;
                //Call proccedures 
                $query = $this->db->query($sql,
                  array($title,$trackid,$paragraph,$type,$f1,$f2,$f3, $f4));
                //  foreach($options as $key=>$data){
                //          //$this->commission_one[$row['0']]= $row['1'];
                //         $options[$key]['question_id'] = $trackid ;
                //  }
                //  //Create batch array insert
                // $this->db->insert_batch('tbl_options',$options);
                //NO error handling assume everything fine
                //$commission_one=array();
                return $trackid;
        }
        public function new_par_que($data)
       {
               //Predefind function don't think much
               $this->load->helper('url');
               $title = $data['title'] ;
               $trackid = mt_rand(100000, 999999) ;
               $quetion=$data['quetion'] ;
               $pra_trackid =$data['pra_trackid'] ;
               $type =   $data['type'] ;
               $f1   =   $data['f1'] ;
               $solution   =   $data['solution'] ;
               $f3   =   $data['f3'] ;
               $f4   =   $data['f4'] ;
               $options=$data['options'] ;
               //$sql= "CALL `createQuestion`('$nameVal','$quetype','$status','$trackid','$noblk')" ;
               $sql= "CALL `createQuestion`(?,?,?,?,?,?,?,?,?)" ;
               //Call proccedures
               $query = $this->db->query($sql,
                 array($title,$pra_trackid,$trackid,$quetion,$type,$f1,$solution,$f3, $f4));
                foreach($options as $key=>$data){
                        //$this->commission_one[$row['0']]= $row['1'];
                       $options[$key]['is_answer'] = json_encode($data['is_answer']) ;
                       $options[$key]['question_id'] = $trackid ;
                }
                //  //Create batch array insert

                 
                $this->db->insert_batch('tbl_options',$options);
                //NO error handling assume everything fine
                //$commission_one=array();
                return [];
        }
            public function update_par_que($data)
       {
              
               //Predefind function don't think much
               $this->load->helper('url');
               $title = $data['title'] ;
               $quetion=$data['quetion'] ;
               $type =   $data['type'] ;
               $f1   =   $data['f1'] ;
               $solution   =   $data['solution'] ;
               $f3   =   $data['f3'] ;
               $f4   =   $data['f4'] ;
               $id=$data['id'];
               $options=$data['options'] ;
               
               //$sql= "CALL `createQuestion`('$nameVal','$quetype','$status','$trackid','$noblk')" ;
               $sql= "CALL `updateque`(?,?,?,?,?,?,?,?)" ;
               //Call proccedures
              $query = $this->db->query($sql,
                array($title,$quetion,$type,$f1,$solution,$f3, $f4,$id));

                foreach($options as $key=>$data){
                        //$this->commission_one[$row['0']]= $row['1'];
                        $options[$key]['is_answer'] = json_encode($data['is_answer']) ;
                       // $options[$key]['name'] = "'".$data['name']."'";
                }
                $new_entry=[] ;
                $old_entry=[] ;
                foreach($options as $key=>$data){
                // echo $data['id']   ;
                        if($data['id'] != 0){
                        $old_entry[] = $data ;
                        }
                }
                $this->db->update_batch('tbl_options', $old_entry, 'id');
                foreach($options as $key=>$data){
                        // echo $data['id']   ;
                         if($data['id'] == "0"){
                              $new_entry[] = $data ;
                         }
                  }
                if(count($new_entry)){
                   $this->db->insert_batch('tbl_options',$new_entry);     
                }        


                
                
                //NO error handling assume everything fine
                //$commission_one=array();
                return [];
        }
   public function test_list()
            {       
                //Predefind function don't think much
                //$this->load->helper('url');
                //Call proccedures 
                $query = $this->db->query("CALL `full_length_tests`()");
                //NO error handling assume everything fine
                // foreach($query->result_array()as $key=>$data){
                //         $data['options'] =  $this->optionById_list($data['trackid']) ;
                //         $commission_one[] = $data ;
                // }
               //$commission_one[1]['options']=1;
               return $query->result_array();
            }
      public function new_fulllength($data)
            { 
                    //Predefind function don't think much
                    $this->load->helper('url');
                    $title = $data['title'] ;
                    $trackid = mt_rand(100000, 999999) ;
                    $reading= json_encode($data['reading']) ;
                    $lesioning= json_encode($data['lesioning']) ;
                    $writting= json_encode($data['writting']) ;
                    $time =   $data['time'] ;
                    $type =   $data['type'] ;
                    $f1   =   $data['f1'] ;
                    $f2   =   $data['f2'] ;
                    $f3   =   $data['f3'] ;
                    $f4   =   $data['f4'] ;  
                    $options=$data['options'] ;
                    $created_date = Date('Y-m-d H:i:s');                  
                    //$sql= "CALL `createQuestion`('$nameVal','$quetype','$status','$trackid','$noblk')" ;
                    $sql= "CALL `createFullength`(?,?,?,?,?,?,?,?,?,?,?,?)" ;
                    //Call proccedures 
                    $query = $this->db->query($sql,
                      array($title,$trackid,$reading,$lesioning,$writting,$time,$type,$f1,$f2,$f3, $f4,$created_date));
                    
                    //NO error handling assume everything fine
                    //$commission_one=array();
                    return [];
            }
        

        public function update_que($data)
        { 
                   //Predefind function don't think much
                $this->load->helper('url');
                $category1 = $data['category'] ;
                $paragraph1= $data['paragraph'] ;
                $nameVal = $data['name'] ;
                $quetype = $data['question_type_id'] ;
                $status  = $data['status'] ;
                $noblk   = $data['noblk'] ;
                $note    = $data['noteVal'] ;
                $solution= $data['solutionVal'] ;
                $options = $data['options'] ;
                $numbers = range(1, 20);
                $trackid = mt_rand(100000, 999999) ;
                $id=$data['idVal'] ;
                   // $sql= "CALL `createQuestion`('$nameVal','$quetype','$status','$trackid','$noblk')" ;
                $sql= "CALL `updateQuestion`(?,?,?,?,?,?,?,?,?,?)" ;

                //  Call proccedures 
                $query = $this->db->query($sql, array($nameVal,$quetype,$status,$trackid,$noblk,$category1, $paragraph1,$note,$solution,$id) );

                 foreach($options as $key=>$data){
                         //$this->commission_one[$row['0']]= $row['1'];
                        $options[$key]['question_id'] = $trackid ;
                 }
                 //Create batch array insert
                $this->db->insert_batch('tbl_options',$options);
                //NO error handling assume everything fine
                //$commission_one=array();
                return [];
              
        }


            public function getfulllength_test_by_id($id)
            {       
                  //Predefind function don't think much
                  //$this->load->helper('url');
                  //Call proccedures 
                  $query = $this->db->query("CALL `getfulllength_test_by_id`($id)");
                  //NO error handling assume everything fine
                  $reading   = json_decode($query->result_array()[0]['reading'], true) ;
                  $lesioning = json_decode($query->result_array()[0]['lesioning'], true) ;
                   $writting = json_decode($query->result_array()[0]['writting'], true) ;
                  // print_r( $lesioning);
                  // exit;
                  $paragraphs=array();
                 foreach($reading as $key=>$data){

                         $getPar=$this->pargraphById($data['trackid']) ;
                         $getPar['time'] = $data['time'] ;
                         $paragraphs[] =  $getPar  ;
                 }
                  $paragraphs1=array();
                  foreach($lesioning as $key=>$data){

                         $getPar=$this->pargraphById($data['trackid']) ;
                         $getPar['time'] = $data['time'] ;
                         $paragraphs1[] =  $getPar  ;

                 }
                 $paragraphs2=array();
                  foreach($writting as $key=>$data){

                         $getPar=$this->pargraphById($data['trackid']) ;
                         $getPar['time'] = $data['time'] ;
                         $paragraphs2[] =  $getPar  ;
                         
                 }
                  //$commission_one[1]['options']=1;
                  $data=array() ;
                  $data['reading']=$paragraphs ;
                  $data['lesioning']= $paragraphs1;
                  $data['writting']=$paragraphs2;
                  $data['test_type']=$query->result_array()[0]['f3'];
                  $data['awastatus']="process";
                  // $data['isAttend']="process";


                  return $data;
            }


                public function pargraphById($id)
                 {       
                  //Predefind function don't think much
                  //$this->load->helper('url');
                  //Call proccedures 
                  $query = $this->db->query("CALL `get_par_by_id`($id)");
                  //NO error handling assume everything fine
                  $commission_one=array();
                        //foreach($query->result_array()as $key=>$data){
                              ////$data['options'] =  $this->optionById_list($data['trackid']) ;
                             //  $commission_one[] = $data ;
                       // }
                  $data=$query->result_array()[0];
                  $data['questions'] = $this->quaById($data['pra_trackid']) ;

                   //   $commission_one[1]['options']=1;
                   return  $data;
          }
          public function quaById($id)
                 {       
                  //Predefind function don't think much
                  //$this->load->helper('url');
                  //Call proccedures 

                  $query = $this->db->query("CALL `quaById`($id)");
                  //NO error handling assume everything fine
                  $commission_one=array();
                  foreach($query->result_array()as $key=>$data){
                              $data['options'] =  $this->optionsById($data['que_trackid']) ;
                              $commission_one[] = $data ;
                   }
                 
                   return  $commission_one;
          }
          public function quaoptnById($qid)
                 {       
                  //Predefind function don't think much
                  //$this->load->helper('url');
                  //Call proccedures 

                  $query = $this->db->query("CALL `getParagraphQuesByid`($qid)");
                  //NO error handling assume everything fine
                  $commission_one=array();
                  foreach($query->result_array()as $key=>$data){
                              $data['options'] =  $this->optionsById($data['que_trackid']) ;
                              $commission_one[] = $data ;
                   }
                 
                   return  $commission_one;
          }

           public function optionsById($id)
                 {       
                  //Predefind function don't think much
                  //$this->load->helper('url');
                  //Call proccedures 

                  $query = $this->db->query("CALL `optById`($id)");
                  //NO error handling assume everything fine
                  $commission_one=array();
                  foreach($query->result_array()as $key=>$data){
                               $data['is_answer'] =  json_decode($data['is_answer'], true) ;
                             // $data['options'] =  array() ;
                              $commission_one[] = $data ;
                   }
                 
                   return  $commission_one;
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
        public function getlist_by_par()
        {       
                //Predefind function don't think much
                //$this->load->helper('url');
                //Call proccedures 
                $query = $this->db->query("CALL `getParagraph`()");
                //NO error handling assume everything fine
                $commission_one=array();
                foreach($query->result_array()as $key=>$data){
                        //$data['options'] =  $this->optionById_list($data['trackid']) ;
                         $commission_one[] = $data ;
                }
                //$commission_one[1]['options']=1;
                return $commission_one;
        }
        
        
     public function getlist_by_fullLength($userid)
        {       
                //Predefind function don't think much
                //$this->load->helper('url');
                //Call proccedures 
                $query = $this->db->query("CALL `full_length_tests`()");
                //NO error handling assume everything fine
                $commission_one=array();
                    foreach($query->result_array()as $key=>$data){
                            $data['is_attend_test'] =  $this->checkIsAttendExam($userid,$data['trackid'])  ;

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
                    // return $result[0];
                  return true;
                 }else{
                    return false;
                 }
            }
          public function getlist_by_par_que($id)
        {       
                //Predefind function don't think much
                //$this->load->helper('url');
                //Call proccedures 
                $query = $this->db->query("CALL `getParagraphQues`($id)");
                //NO error handling assume everything fine
                $commission_one=array();
                foreach($query->result_array()as $key=>$data){
                        //$data['options'] =  $this->optionById_list($data['trackid']) ;
                         $commission_one[] = $data ;

                }

              //   $commission_one[1]['options']=1;
             return $commission_one;
        }
        
           public function list_getbyparatid($tid)
        {       
                //Predefind function don't think much
                //$this->load->helper('url');
                //Call proccedures 
                $query = $this->db->query("CALL `get_par_by_id`($tid)");
                //NO error handling assume everything fine
                $commission_one=array();
                foreach($query->result_array()as $key=>$data){
                        //$data['options'] =  $this->optionById_list($data['trackid']) ;
                         $commission_one[] = $data ;

                }

              //   $commission_one[1]['options']=1;
             return $commission_one;
        }
              public function getlist_by_name($name)
               {    
                  $query = $this->db->query("CALL `getbycatid`('$name')");
         //         //NO error handling assume everything fine
                    return $query->result_array() ;
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