<?php 
error_reporting(1);
class Videos_model extends CI_Model {

        // public $title;
        // public $content;
        // public $date;
       
        public function __construct()
        {
                // Call the CI_Model constructor
                parent::__construct();
        }
        public function new_video($data)
        {       
                 $this->load->helper('url');
                 $title = $data['titleVal'] ;
                 $testid = $data['testidVal'] ;
                 $trackid = mt_rand(100000, 999999) ;
                 $status = $data['status'] ; 
                 $sql= "CALL `createVideos`(?,?,?,?)" ;
                 //  Call proccedures 
                 $query = $this->db->query($sql, array($title,$testid,$trackid,$status) );
                 return [];
        }
        
        public function new_video_que($data)
        {       
                 $this->load->helper('url');
                 $subcatid = $data['subcatid'] ;
                 $userid = $data['userid'] ;
                 $question = $data['question'] ; 
                 $sql= "CALL `createNewVedioQuesion`(?,?,?)" ;
                 //  Call proccedures sub_by_id_ques
                 $query = $this->db->query($sql, array($subcatid,$userid,$question) );
                 return [];
        }
        public function new_video_ans($data)
        {       
                 $this->load->helper('url');
                 $queid = $data['queid'] ;
                 $userid = $data['userid'] ;
                 $ans = $data['ans'] ; 
                 $sql= "CALL `createNewVedioAnswer`(?,?,?)" ;
                 //  Call proccedures 
                 $query = $this->db->query($sql, array($queid,$ans,$userid) );
                 return [];
        }
        public function check_que_like($userid,$que)
        {        
                
             $stored_procedure= "CALL checkquaLikeIsExs($userid,$que)";
             $query=@$this->db->query($stored_procedure,array());
             $result = $query->result();
             $query->next_result(); 
             $query->free_result();
             return $result  ;
        }
        public function new_qua_like($data)
        {       
                 $this->load->helper('url');
                 $que = $data['que'] ;
                 $userid = $data['userid'] ;
                 $likes = $data['likes'] ; 
                 $unlikes = $data['unlikes'] ; 
                if($this->check_que_like($userid,$que)){
                        $sql= "CALL `updateLikeQua`(?,?,?,?)" ;
                        //  Call proccedures 
                        $query = $this->db->query($sql, array($likes,$unlikes,$que,$userid) );
                }else{
                        $sql= "CALL `insertLikeQua`(?,?,?,?)" ;
                        //  Call proccedures 
                        $query = $this->db->query($sql, array($que,$userid,$likes,$unlikes) );
                }
                 return [];
        }

        public function check_ans_like($userid,$ans)
        {        
             $stored_procedure= "CALL checkansLikeIsExs($userid,$ans)";
             $query=@$this->db->query($stored_procedure,array());
             $result = $query->result();
             $query->next_result(); 
             $query->free_result();
             return $result  ;
        }
        public function new_ans_like($data)
        {       
                $this->load->helper('url');
                
                 $ans = $data['ans'] ;
                 $userid = $data['userid'] ;
                 $likes = $data['likes'] ; 
                 $unlikes = $data['unlikes'] ; 
                if($this->check_ans_like($userid,$ans)){
                        $sql= "CALL `updateLikeAns`(?,?,?,?)" ;
                        //  Call proccedures 
                        $query = $this->db->query($sql, array($likes,$unlikes,$ans,$userid) );

                }else{
                        $sql= "CALL `insertLikeAns`(?,?,?,?)" ;
                        //  Call proccedures 
                        $query = $this->db->query($sql, array($ans,$userid,$likes,$unlikes) );
                }

                
                 return [];
        }
              public function videos_list()
        {       
                $query = $this->db->query("CALL `getAllvideos`()");
                //NO error handling assume everything fine
                // $commission_one=array();
                // foreach($query->result_array()as $key=>$data){
                //         $data['subcat'] =  $this->subcatById_list($data['trackid']) ;
                //          $commission_one[] = $data ;
                // }
                return $query->result_array();
        }

        
        public function videos_list_ui()
        {       
                $query = $this->db->query("CALL `getAllvideos`()");
                //NO error handling assume everything fine
                $commission_one=array();
                foreach($query->result_array()as $key=>$data){
                         $data['total_vedios'] =  $this->subcatById_total_vedios($data['trackid']) ;

                         $data['total_test_que'] =  0 ;
                         foreach($this->subcatById_total_ques($data['trackid']) as $key1=>$data1){
                                $data['total_test_que'] +=  $data1['total_que'] ;
                         }
                         $commission_one[] = $data ;
                }
                return $commission_one;
        }

        public function ans_like_count($id)
        {       
             $stored_procedure= "CALL like_count_by_ansid($id)";
             $query=@$this->db->query($stored_procedure,array());
             $result = $query->result();
             $query->next_result(); 
             $query->free_result();
             return $result[0]->count  ;
        }
        public function ans_unlike_count($id)
        {       
             $stored_procedure= "CALL unlike_count_by_ansid($id)";
             $query=@$this->db->query($stored_procedure,array());
             $result = $query->result();
             $query->next_result(); 
             $query->free_result();
             return  $result[0]->count   ;
        }
        public function que_by_id($id)
        {       
                
             $stored_procedure= "CALL get_que_data_by_id($id)";
             $query=@$this->db->query($stored_procedure,array());
             $result = $query->result();
             $query->next_result(); 
             $query->free_result();
             return $result;

        }
        public function ans_by_queid($que)
        {       
                $finallData=array();
                $finallData['quetion']=  $this->que_by_id($que)[0]->question;
                $finallData['qid'] =   $this->que_by_id($que)[0]->id;
                $finallData['userdata'] =  $this->userData($this->que_by_id($que)[0]->userid)  ;
                $finallData['qdate'] =   $this->que_by_id($que)[0]->date ;
                $finallData['like'] =  $this->qua_like_count($this->que_by_id($que)[0]->id) ; 
                $finallData['unlike'] =  $this->qua_unlike_count($this->que_by_id($que)[0]->id); 
                $finallData['qavatar'] =rand(1, 20).'.png' ;
               //$finallData['userdata'] =  $this->userData( $this->que_by_id($que)[0]['userid'])  ;
                $finallData['ans']= [] ;
                $query = $this->db->query("CALL `getAnswersByQueId`($que)");
                //NO error handling assume everything fine
                $commission_one=array();
                
                //$finallData['qdate']= $commission_one[0]['qdate'] ;
                //      $finallData['quser'] =  $this->userData($data['quser'])  ;
                
                if($query->result_array()){
                        foreach($query->result_array()as $key=>$data){
                                $data['userdata'] =  $this->userData($data['auser'])  ;
                                $data['like'] =  $this->ans_like_count($data['id']) ; 
                                $data['unlike'] =  $this->ans_unlike_count($data['id']); 
                                $data['avatar'] =rand(1, 20).'.png' ;
                                $commission_one[] = $data ;
                        }
                        
                        $finallData['ans']= $commission_one ;
                }
                return $finallData;
        }

      
        
        public function subcatById_total_vedios($id)
        {       
             $stored_procedure= "CALL GetSubcatByTrackiVedios($id)";
             $query=@$this->db->query($stored_procedure,array());
             $result = count($query->result());
             $query->next_result(); 
             $query->free_result();
             return $result;
        }
        public function subcatById_total_ques($id)
        {       
                $stored_procedure= "CALL getAllvideosTestsQueLength($id)";
                $query=@$this->db->query($stored_procedure,array());
                $count=0 ;
                $commission_one=array();
                foreach($query->result_array()as $key=>$data){
                        $data['total_que'] =  count(json_decode($data['questionids']) ) ;
                        //$data['total_vedios'] =   array("total_que"=>8) ;
                        $commission_one[] =  $data ; 
                        //$data['total_vedios'] ;
                };
                $query->next_result(); 
                $query->free_result();
                return $commission_one;
         }

         public function check_vedio_unlock_pro($userid,$id1)
         {       
            // echo $userid;
            //   echo $id1;
            // exit;
              $stored_procedure= "CALL check_vedio_unlock_pro($userid,$id1)";
              $query1=@$this->db->query($stored_procedure,array());
              if(count($query1->result())){
                $result = true ;
              }else{
                $result = false ;
              }
              $query1->next_result(); 
              $query1->free_result();
              return $result;
         }
         public function vedio_unlock_insert($data)
         {       
                $userid=$data['userid'] ;
                $videoid=$data['videoid'] ;
                $result ="" ;
                 
                if(!$this->check_vedio_unlock_pro($userid,$videoid)){
                        $stored_procedure= "CALL vedio_unlock_insert($userid,$videoid)";
                        $query1=@$this->db->query($stored_procedure,array());
                        $query1->next_result(); 
                        $query1->free_result();
                     
                }
                return $result;
         }

         
         public function cat_by_id_subcat($id,$userid)
         {       
                 $stored_procedure= "CALL GetSubcatByTrackiVedios($id)";
                 $query=@$this->db->query($stored_procedure,array());
                 $commission_one=array();
                 foreach($query->result_array()as $key=>$data){
                        if($key == 0){
                        $data['is_open'] =  true ;
                        }else{
                        $data['is_open'] =  $this->check_vedio_unlock_pro($userid,$query->result_array()[$key-1]['id'] );
                        //$data['is_open'] =  count(json_decode($data['questionids']) ) ;
                        }    
                        //$data['total_vedios'] =   array("total_que"=>8) ;
                        $commission_one[] =  $data ; 
                        //$data['total_vedios'] ;
                 };
                 $query->next_result(); 
                 $query->free_result();
                 return $commission_one;
          }

          public function get_subcat_based_cat_id($cat,$id)
          {       
               $stored_procedure= "CALL  get_subcat_based_cat_id($cat,$id)";
               $query=@$this->db->query($stored_procedure,array());
               $result =  $query->result();
               $query->next_result(); 
               $query->free_result();
               return $result;
          }

          public function sub_by_id_ques($id,$userid,$sub_id)
          {       
                // echo $id;
                //   echo $userid;  
                //   echo $sub_id;
                //   exit;
                  $finallData=array() ;     
                  $finallData['video_link'] =  $this->get_subcat_based_cat_id($id,$sub_id)[0]->youtube_uniqid; 

                  $stored_procedure= "CALL GetSubcatByIdAndQuestions($sub_id)";
                  $query=@$this->db->query($stored_procedure,array());
                  $commission_one=array();
                 
                  foreach($query->result_array()as $key=>$data){
                         $data['userdata'] =  $this->userData($data['userid'])  ;
                         $data['ans_count'] =  count($this->ans_count($data['id']) ) ;
                         $data['like'] =  $this->qua_like_count($data['id']) ; 
                         $data['unlike'] =  $this->qua_unlike_count($data['id']); 
                         $data['avatar'] =rand(1, 20).'.png' ;
                         $commission_one[] =  $data ; 
                  };
                 
                  $finallData['questions'] = $commission_one ; 
                  $query->next_result(); 
                  $query->free_result();
                  return $finallData    ;
           }

           public function ans_count($id)
           {       
                $stored_procedure= "CALL ans_count_by_queid($id)";
                $query=@$this->db->query($stored_procedure,array());
                $result = $query->result();
                $query->next_result(); 
                $query->free_result();
                return $result;
           }

           
           public function qua_like_count($id)
           {       
                 $stored_procedure= "CALL like_count_by_queid($id)";
                $query=@$this->db->query($stored_procedure,array());
                $result = $query->result();
                $query->next_result(); 
                $query->free_result();
                return $result[0]->count  ;
           }
           public function qua_unlike_count($id)
           {       
                $stored_procedure= "CALL unlike_count_by_queid($id)";
                $query=@$this->db->query($stored_procedure,array());
                $result = $query->result();
                $query->next_result(); 
                $query->free_result();
                return  $result[0]->count   ;
           }
           public function userData($id)
           {       
                $stored_procedure= "CALL userGetbyId($id)";
                $query=@$this->db->query($stored_procedure,array());
                $result = $query->result();
                $query->next_result(); 
                $query->free_result();
                return $result[0];
           }
          // public function subcatById_list($id)
          //   {       
          //        $stored_procedure= "CALL GetSubcatByTrackid($id)";
          //        $query=@$this->db->query($stored_procedure,array());
          //        $result = $query->result();
          //        $query->next_result(); 
          //        $query->free_result();
          //        return $result;
          //   }
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
