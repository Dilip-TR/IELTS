<?php 
error_log(0);
class Queoption_model extends CI_Model {

        // public $title;
        // public $content;
        // public $date;
       
        public function __construct()
        {
                // Call the CI_Model constructor
                parent::__construct();
        }

     
        public function new_que($data)
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
                   // $sql= "CALL `createQuestion`('$nameVal','$quetype','$status','$trackid','$noblk')" ;
                $sql= "CALL `createQuestionv1`(?,?,?,?,?,?,?,?,?)" ;

                //  Call proccedures 
                $query = $this->db->query($sql, array($nameVal,$quetype,$status,$trackid,$noblk,$category1, $paragraph1,$note,$solution) );

                 foreach($options as $key=>$data){
                         //$this->commission_one[$row['0']]= $row['1'];
                        $options[$key]['question_id'] = $trackid ;
                 }
                 //Create batch array insert
                $this->db->insert_batch('tbl_optionsv1',$options);
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
                $this->db->insert_batch('tbl_optionsv1',$options);
                //NO error handling assume everything fine
                //$commission_one=array();
                return [];
              
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
               $res1=$this->db->delete('tbl_optionsv1', array('question_id' => $id)); 
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
