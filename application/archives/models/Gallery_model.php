 <?php 

class Gallery_model extends CI_Model {

        // public $title;
        // public $content;
        // public $date;
       
        public function __construct()
        {
                // Call the CI_Model constructor
                parent::__construct();

        }

        // public function get_last_ten_entries($from,$to)
        // {       

        //         $this->load->helper('url');
        //         $query = $this->db->query("CALL `getProductLimit`($from,$to)");
        //         $commission_one=array();
        //            foreach($query->result_array()as $key=>$data){
        //                     //$this->commission_one[$row['0']]= $row['1'];
        //                     $data['product_image']= base_url().'prodimages/'.$data['product_image'] ;
        //                     $commission_one[] = $data ;
        //            }
        //         return $commission_one;
        // }



          public function listData()
                {       

                         $this->load->helper('url');
                          $query = $this->db->query("CALL photogalleryList()");
                        
                          $commission_one=array(); 
                           foreach($query->result_array() as $key=>$data){
                                    //$this->commission_one[$row['0']]= $row['1'];
                                    $commission_one[] = $data ;
                           }
                        return  $commission_one;

                        
                }

          public function galleryrow_delete($id){
               $res=$this->db->delete('tbl_gallery', array('id' => $id)); 
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


                  public function vedioListData()
                {       

                         $this->load->helper('url');
                          $query = $this->db->query("CALL vedioGallery()");
                        
                          $commission_one=array(); 
                           foreach($query->result_array() as $key=>$data){
                                    //$this->commission_one[$row['0']]= $row['1'];
                                    $commission_one[] = $data ;
                           }
                        return  $commission_one;

                        
                }

                  public function clientlistData()
                {       

                         $this->load->helper('url');
                          $query = $this->db->query("CALL clients()");
                        
                          $commission_one=array(); 
                           foreach($query->result_array() as $key=>$data){
                                    //$this->commission_one[$row['0']]= $row['1'];
                                    $commission_one[] = $data ;
                           }
                        return  $commission_one;

                        
                }

                    public function bannerlistData()
                {       

                         $this->load->helper('url');
                          $query = $this->db->query("CALL bannerimages()");
                        
                          $commission_one=array(); 
                           foreach($query->result_array() as $key=>$data){
                                    //$this->commission_one[$row['0']]= $row['1'];
                                    $commission_one[] = $data ;
                           }
                        return  $commission_one;

                        
                }

        
        
    
        public function insert_entry($data)
        {

                $this->name  = $data['name']; // please read the below note
                $this->path = $data['path'];
                $this->cat = $data['cat'];
                $this->link = $data['link'];

                 
                $res=$this->db->insert('tbl_gallery', $this);
 
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
                                            "code"=> "LOGIN_FAILED")) ;
                                    return $result ;
                    }
           
        }



        public function update_entry()
        {
                $this->title    = $_POST['title'];
                $this->content  = $_POST['content'];
                $this->date     = time();
                $this->db->update('entries', $this, array('id' => $_POST['id']));
        }

}

?>