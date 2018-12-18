
<?php 
error_reporting(1);
class PractLesson_model extends CI_Model {

        // public $title;
        // public $content;
        // public $date;
       
        public function __construct()
        {
                // Call the CI_Model constructor
                parent::__construct();
        }

     
        
          public function new_practlesson($data)

        {       

          $this->load->helper('url');
                 // $userid = $data['useridVal'] ;
                 $lessonname = $data['lessonnameVal'] ;
                $testid = $data['testidVal'] ;
              
               $status = $data['status'] ;

print_r("$testidVal");
         exit();
        $sql= "CALL `createpractlesson`(?,?,?)" ;
                //  Call proccedures 
                $query = $this->db->query($sql, array($lessonname,$testid,$status) );
         
               
                return [];
 }   
    public function practlesson_list()
       {       
                //Predefind function don't think much
                //$this->load->helper('url');
                //Call proccedures 
                $query = $this->db->query("CALL `getpractlesson`()");
                //NO error handling assume everything fine
                // foreach($query->result_array()as $key=>$data){
                //         $data['options'] =  $this->optionById_list($data['trackid']) ;
                //         $commission_one[] = $data ;
                // }
               //$commission_one[1]['options']=1;
               return $query->result_array();
            }
     

}

?>
