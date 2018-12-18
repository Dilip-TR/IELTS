
<?php 
error_reporting(1);
class Subcategory_model extends CI_Model {

        // public $title;
        // public $content;
        // public $date;
       
        public function __construct()
        {
                // Call the CI_Model constructor
                parent::__construct();
        }

     
        public function new_subcategory($data)

        {       

                //,$data['quetype'],$data['status'],$data['status']
               //Predefind function don't think much
                $this->load->helper('url');
                 $titlelink = $data['titlelinkVal'] ;
              $youtube_uniqid = $data['youtube_uniqidVal'] ;
               
                  $testid = $data['testidVal'] ;
                   $catid = $data['catidVal'] ;
                   
                         //$thi
                // $trackid1 = $data['trackidVal'] ;
            
           
                               $status = $data['status'] ;
                
              
                 // $subcat = $data['subcat'] ;
               
                   // $sql= "CALL `createQuestion`('$nameVal','$quetype','$status','$trackid','$noblk')" ;
                $sql= "CALL `createSubcat`(?,?,?,?,?)" ;
                //  Call proccedures 
                $query = $this->db->query($sql, array($titlelink,$youtube_uniqid,$testid,$catid,$status) );
               
                //  $query1 = $this->db->query("CALL `GetOptionByTrackid`($trackid)");
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
      public function subcategory_list()
       {       
                //Predefind function don't think much
                //$this->load->helper('url');
                //Call proccedures 
                $query = $this->db->query("CALL `getsubcategory`()");
                //NO error handling assume everything fine
                // foreach($query->result_array()as $key=>$data){
                //         $data['options'] =  $this->optionById_list($data['trackid']) ;
                //         $commission_one[] = $data ;
                // }
               //$commission_one[1]['options']=1;
               return $query->result_array();
            }
        

        
        //       public function subcategory_list()
        // {       
        //         //Predefind function don't think much
        //         //$this->load->helper('url');
        //         //Call proccedures 
        //         $query = $this->db->query("CALL `getAllvideos`()");
        //         //NO error handling assume everything fine
        //         $commission_one=array();
        //         foreach($query->result_array()as $key=>$data){
        //                 $data['subcat'] =  $this->subcatById_list($data['trackid']) ;
        //                  $commission_one[] = $data ;

        //         }

        //       //   $commission_one[1]['options']=1;
        //      return $commission_one;
        // }


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
