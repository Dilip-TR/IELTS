
<?php 
error_reporting(1);
class PractsubCategory_model extends CI_Model {

        // public $title;
        // public $content;
        // public $date;
       
        public function __construct()
        {
                // Call the CI_Model constructor
                parent::__construct();
        }

     
        public function new_practsubcategory($data)

        {       

                //,$data['quetype'],$data['status'],$data['status']
               //Predefind function don't think much
                $this->load->helper('url');
                 $title = $data['titleVal'] ;
                  $testid = $data['testidVal'] ;
                   $catid = $data['catidVal'] ;
                   $status = $data['status'] ;

                
              
                 // $subcat = $data['subcat'] ;
               
                   // $sql= "CALL `createQuestion`('$nameVal','$quetype','$status','$trackid','$noblk')" ;
                $sql= "CALL `createpractsubcategory`(?,?,?,?)" ;
                //  Call proccedures 
                $query = $this->db->query($sql, array($title,$testid,$catid,$status) );
               
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
      public function practsubcategory_list()
       {       
                //Predefind function don't think much
                //$this->load->helper('url');
                //Call proccedures 
                $query = $this->db->query("CALL `getpractisesubcat`()");
                //NO error handling assume everything fine
                // foreach($query->result_array()as $key=>$data){
                //         $data['options'] =  $this->optionById_list($data['trackid']) ;
                //         $commission_one[] = $data ;
                // }
               //$commission_one[1]['options']=1;
               return $query->result_array();
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
