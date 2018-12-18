<?php 

class Admin_model extends CI_Model {

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



        public function login($input_data)
        {       

            

            $username = trim($input_data['username']) ;
            $password = trim($input_data['password']) ;
                $this->load->helper('url');
                $query = $this->db->query("CALL `adminLogin`('$username','$password')");
                

              
                    if(sizeof($query->result_array())){ 
                        $result= array('id' => $query->result_array()[0]['id'],'ttl' =>"9BAxUC1DobvTUkwjdUKJiPZBtBPZbhDx8LcjmxUafuu1LPZoiEh6wMPQQHPOOf3L","created"=>"2017-06-11T04:58:53.213Z","userId"=>$query->result_array()[0]['id']  );
                             return $result;
                    }else{
                        $result= array("error"=>array("name"=> "Error",
                                    "status"=> 401,
                                    "message"=> "login failed",
                                    "statusCode"=> 401,
                                    "code"=> "LOGIN_FAILED")) ;
                            return $result ;
                    }
                 
        }


  public function get_last_ten_entries($from,$to)
        {       

                $this->load->helper('url');
                $query = $this->db->query("CALL `getProductLimit`($from,$to)");
                $commission_one=array();
                   foreach($query->result_array()as $key=>$data){
                            //$this->commission_one[$row['0']]= $row['1'];
                            $data['product_image']= base_url().'prodimages/'.$data['product_image'] ;
                            $commission_one[] = $data ;
                   }
                return $commission_one;
        }

        public function productDetail($str)
        {        $this->load->helper('url');

                
                
                $query = $this->db->query("CALL `getProductDetail`('$str')");
                $commission_one=array();
                   foreach($query->result_array()as $key=>$data){
                            //$this->commission_one[$row['0']]= $row['1'];
 
                                if($data['pimage']){
                                $data['pimage']= base_url().'prodimages/'.$data['pimage'] ;
                                }else{
                                $data['pimage']=base_url().'prodimages/'."noimage.png" ;
                                }

                            //$data['product_image']= base_url().'prodimages/'.$data['product_image'] ;
                            $commission_one[] = $data ;
                       
                   }
                  
                return $commission_one;

        }

        
         public function get_rows_count()
        {
                $query = $this->db->query("CALL `countindustrytable`()");
                return $query->result_array();
        }

        public function insert_entry($data)
        {
                $this->name    = $data['name']; // please read the below note
                $this->email = $data['email'];
                $this->fact  = $data['fact'];
                $res=$this->db->insert('tbl_industry', $this);
                print_r( $res) ;
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