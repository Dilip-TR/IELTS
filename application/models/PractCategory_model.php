<?php 
error_reporting(1);
class  PractCategory_model extends CI_Model {

        // public $title;
        // public $content;
        // public $date;
       
        public function __construct()
        {
                // Call the CI_Model constructor
                parent::__construct();
        }
         public function new_practUserQuaData($data)
         {       
                //Predefind function don't think much
                $this->load->helper('url');
                $userid = $data['userid'] ;
                $result = $data['result'] ;
                $trackid = $data['trackid'] ;
                $totalobj =json_encode($data['totalobj'],true)  ;
                $cattype = $data['cattype'] ;
                $sessionid = $data['sessionid'] ;
                $create_date="" ;
                $timetaken=$data['timetaken'];
                $sql= "CALL `createPractUserQuaData`(?,?,?,?,?,?,?,?)" ;
                // Call proccedures 
                $query = $this->db->query($sql,array($userid,$result,$totalobj,$trackid,$cattype,$sessionid,$create_date,$timetaken) );
                // print_r($testid);
                // exit;
                return [];
                //return $getId[0] ;

         } 
        public function new_practcategory($data)
        {       
                //Predefind function don't think much
                $this->load->helper('url');
                $categoryid = $data['categoryidVal'] ;
                $lessonid = $data['lessonidVal'] ;
                $questiontype = $data['questiontypeVal'] ;
                $questionids =json_encode($data['questionidsVal'],true)  ;
                $status = $data['statusVal'] ;
                $sql= "CALL `createpractcategory`(?,?,?,?,?)" ;
                //  Call proccedures 
                $query = $this->db->query($sql, array($categoryid,$lessonid,$questiontype,$questionids,$status) );
                // print_r($testid);
                // exit;
                return [];
                //return $getId[0] ;

        }   
        //Dashboard Services Start
        public function dashbord($userid)
        {       
              //Call proccedures 
              $commission_one=array();
              $commission_one['maths']=$this->dashbordByCat_list('maths',$userid) ;
              $commission_one['Verbal']=$this->dashbordByCat_list('Verbal',$userid) ;
              $commission_one['fullLength']=$this->fullLengthTestByUserlist($userid) ;

        //      foreach($query->result_array() as $key=>$data){
        //         $data['questionids']  = json_decode($data['questionids']) ;
        //         $data['subcategories'] = $this->practsubcatByCatName_list($data['questiontype']) ;
        //         $data['totalQuationsInSec'] = $this->get_total_section_count($data['subcategories']) ;
        //         $commission_one[] = $data;
        //       }
             //$commission_one[1]['options']=1;
            // return $commission_one[0];
            return $commission_one ;
        }  

        public function fullLengthTestByUserlist($userid)
        {       
                //Call proccedures 
              $query = $this->db->query("CALL `getUserAttendTest`($userid)");
                //NO error handling assume everything fine
              $commission_one=array();
              $commission_one['row_data']=array();
              foreach($query->result_array() as $key=>$data){
                $temp  = json_decode($data['result_data']) ;
                $commission_one['row_data'][] =[0,0,0,0,0,0] ;
                
                foreach($temp as $key1=>$data1){
                        
                        $count= count($data1) ; 
                          
                       $commission_one['row_data'][$key][$data1[0]->section] = $count*10;
                       //echo $data1[$key1]->section ;
                       
                      }

                $commission_one[] = $data;
              }
                  //$commission_one[1]['options']=1;
                 // return $commission_one[0];
              return $commission_one ;
        } 


        public function dashbordByCat_list($categoryid,$userid)
        {       
             $query=@$this->db->query("CALL totalPracticeQueCountByCat('".$categoryid."')");
             $commission_one=array();
             $totalCount=0 ; 
             foreach($query->result_array() as $key=>$data){
                $totalCount += count( json_decode( $data['questionids']) )  ;
               // $data['questionids'] =   json_decode($data['questionids']) ;
               // $commission_one[] = $data;
              }
              $commission_one['totalqua'] = $totalCount ;
              $commission_one['practisedqua'] =$this->dashbordPractCountByUser($categoryid,$userid) ; 
              $commission_one['correctAns'] =$this->dashbordCorrerctcountByUser($categoryid,$userid) ; 
              $commission_one['avgTime'] =$this->dashbordTimeavgByUser($categoryid,$userid) ; 
              $query->next_result(); 
              $query->free_result();
              return  $commission_one;
        } 
        public function dashbordTimeavgByUser($categoryid,$userid)
        {       
             $query=@$this->db->query("CALL getTimeAvgByUser($userid,'".$categoryid."')");
             $temp= $query->result_array(); 
             $query->next_result(); 
             $query->free_result();
             return  $temp[0]['AverageTime'] == null ? 0 : $temp[0]['AverageTime'] ;
        } 
        public function dashbordCorrerctcountByUser($categoryid,$userid)
        {       
             $query=@$this->db->query("CALL getcorrectAnsByUser('".$categoryid."',$userid)");
             $temp= $query->result_array(); 
             $query->next_result(); 
             $query->free_result();
             return  $temp[0]['count'];
        } 
        public function dashbordPractCountByUser($categoryid,$userid)
        {       
             $query=@$this->db->query("CALL getpractisedQua('".$categoryid."',$userid)");
             $temp= $query->result_array(); 
             $query->next_result(); 
             $query->free_result();
             return  $temp[0]['count'];
        } 
        //Dashbord Service End
        public function all_practcategory()
        {       
              //Call proccedures 
              $query = $this->db->query("CALL `all_practiceCategory`()");
              //NO error handling assume everything fine
              $commission_one=array();
              foreach($query->result_array() as $key=>$data){
                $data['questionids']  = json_decode($data['questionids']) ;
                $data['subcategories'] = $this->practsubcatByCatName_list($data['questiontype']) ;
                $data['totalQuationsInSec'] = $this->get_total_section_count($data['subcategories']) ;
                $commission_one[] = $data;
              }
             //$commission_one[1]['options']=1;
            // return $commission_one[0];
            return $commission_one ;
        }  

        public function get_total_section_count($data){
              $sum  =0 ;
              foreach($data as $key=>$data){
                 $sum+= count($data["questionids"]);
              }
              return $sum ;
        }
        public function practsubcatByCatName_list($lessonName)
        {       
             $stored_procedure= "CALL GetpractSubcatBySubCat('".$lessonName."')";
             $query=@$this->db->query($stored_procedure,array());
             $commission_one=array();
             foreach($query->result_array() as $key=>$data){
                // $data['questionids'] = json_decode($data['questionids']) ;
                $data['questionids'] =   json_decode($data['questionids']) ;
                $commission_one[] = $data;
              }
             $query->next_result(); 
             $query->free_result();
             return  $commission_one;
        } 
         public function update_practcategory($data)
        {       
                //Predefind function don't think much
                $this->load->helper('url');
                $categoryid = $data['categoryidVal'] ;
                $lessonid = $data['lessonidVal'] ;
                $questiontype = $data['questiontypeVal'] ;
                $questionids =json_encode($data['questionidsVal'],true)  ;
                $status = $data['statusVal'] ;
                $id = $data['id'] ;
                $sql= "CALL `updatepractcategory`(?,?,?,?,?,?)" ;
                //  Call procceduresupdatepractcategory 
                $query = $this->db->query($sql, array($categoryid,$lessonid,$questiontype,$questionids,$status,$id) );
                // print_r($testid);
                // exit;
                return [];
                //return $getId[0] ;
        }   
        public function practisecat_list()
        {       
                //Predefind function don't think much
                //$this->load->helper('url');
                //Call proccedures 
                $query = $this->db->query("CALL `getpractisecat`()");
                //NO error handling assume everything fine
                $commission_one=array();
                foreach($query->result_array()as $key=>$data){
                        // $data['subcat'] =  $this->practsubcatById_list($data['trackid']) ;
                         $commission_one[] = $data ;
                }
                //$commission_one[1]['options']=1;
                return $commission_one;
        }
        public function practisecat_id($id)
        {       
                //Predefind function don't think much
                //$this->load->helper('url');
                //Call proccedures 
                $query = $this->db->query("CALL `getpractisecat_id`($id)");
                //NO error handling assume everything fine
                $commission_one=array();
                foreach($query->result_array()as $key=>$data){
                       $data['questionids'] =json_decode($data['questionids']) ;
                       if(json_decode($data['questionids'])){
                          $qua=$this->question_By_in_list($data['questionids']);
                       }else {
                          $qua=[];
                       }
                       $data['quation_ids'] = $qua  ;
                       $commission_one[] = $data ;
                }
              //$commission_one[1]['options']=1;
             return $commission_one[0];
        }
        public function question_By_in_list($obj)
        {    
                $comma_separated = implode(",", $obj);
                $query = $this->db->query("SELECT * from tbl_question_new WHERE trackid IN ( $comma_separated ) ");
                //NO error handling assume everything fine
                $commission_one=array(); 
                // echo $query->result_array() ;
                // exit ;
                foreach($query->result_array() as $key=>$data){
                        $data['options'] =  $this->optionById_list($data['trackid']) ;
                        $commission_one[] = $data ;
                }
                 $query->next_result(); 
                 $query->free_result();
                 // $commission_one[1]['options']=1;
                 return $commission_one;
        }
            public function practsubcatById_list($id)
            {       
                 $stored_procedure= "CALL   GetpractSubcatByTrackid($id)";
                 $query=@$this->db->query($stored_procedure,array());
                 $result = $query->result();
                 $query->next_result(); 
                 $query->free_result();
                 return $result;
            }
       
            public function questionids($id)
            {       
                $query = $this->db->query("CALL `getpractquestionids`($id)");
                //NO error handling assume everything fine
                $commission_one[0]['questions'] =[] ;
                $tempArry = array() ;
                foreach($commission_one[0]['sections'] as $key=>$data){
                        $commission_one[0]['sections'][$key]->questionids = json_decode($data->questionids);
                        // $commission_one[0]['sections'][$key]['questionids'] =  $data->questionids ;
                        $tempArry[] = $data->questionids;
                }
                return $commission_one[0];
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
