
<?php 
// error_reporting(1);
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
            print_r( "enter in");
                exit();
                      

                //,$data['quetype'],$data['status'],$data['status']
               //Predefind function don't think much


                $this->load->helper('url');
                 $title = $data['titleVal'] ;
                 $testid = $data['testidVal'] ;
                 $trackid = mt_rand(100000, 999999) ;
                 $status = $data['status'] ;
                         //$thi
                // $trackid1 = $data['trackidVal'] ;
            
           
                
             // $subcat = $data['subcat'] ;
                 // $subcat = $data['subcat'] ;
               
                   // $sql= "CALL `createQuestion`('$nameVal','$quetype','$status','$trackid','$noblk')" ;
               $sql= "CALL `createVideos`(?,?,?,?)" ;
                //  Call proccedures 
                $query = $this->db->query($sql, array($title,$testid,$trackid,$status) );

                  

               //echo "CALL `createVideos`($title,$transcription,$trackid,$status)" ;
              
                //  $query2 =$this->db->query("CALL `createsubcat`(456,'dfsd',0)");
                //  $getId=$query1->result_array() ;
                //  $getIdVal=$getId[0]['id'] ;

                //     foreach($subcat as $key=>$data){

                // //$this->commission_one[$row['0']]= $row['1'];
                //         $subcat[$key]['catid'] = $trackid ;
                //  }
                //  //Create batch array insert
                // $this->db->insert_batch('video_subcategory',$subcat);
                
                


           
                     
                //NO error handling assume everything fine
                //$commission_one=array();
                return [];



        }   

        
              public function videos_list()
        {       
                //Predefind function don't think much
                //$this->load->helper('url');
                //Call proccedures 
                $query = $this->db->query("CALL `getAllvideos`()");
                //NO error handling assume everything fine
                $commission_one=array();
                foreach($query->result_array()as $key=>$data){
                        $data['subcat'] =  $this->subcatById_list($data['trackid']) ;
                         $commission_one[] = $data ;

                }

              //   $commission_one[1]['options']=1;
             return $commission_one;
        }


            public function subcatById_list($id)
            {       
                 $stored_procedure= "CALL 	GetSubcatByTrackid($id)";
                 $query=@$this->db->query($stored_procedure,array());
                 $result = $query->result();
                 $query->next_result(); 
                 $query->free_result();
                 
                 return $result;
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
