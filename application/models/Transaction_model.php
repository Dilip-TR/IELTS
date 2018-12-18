<?php 
error_reporting(1);
class Transaction_model extends CI_Model {

        // public $title;
        // public $content;
        // public $date;
       
        public function __construct()
        {
                // Call the CI_Model constructor
                parent::__construct();
        }
        public function new_transaction($data)
        {   
                 $this->load->helper('url');
                 $txnid          = $data['txnid'] ;
                 $userid         = $data['userid'] ;
                 $firstname      = $data['firstname'] ; 
                 $lastname       = $data['lastname'] ;
                 $productinfo    = $data['productinfo'] ;
                 $email          = $data['email'] ; 
                 $phone          = $data['phone'] ;
                 $bank_ref_num   = $data['bank_ref_num'] ;
                 $txnStatus      = $data['txnStatus'] ; 
                 $jsondata       = json_encode($data['jsondata'],true);
                 $amount         = $data['amount'] ;
                 $addedon        = $data['addedon'] ;
                 // $        = $data['addedon'] ;

                 $sql= "CALL `createtransations`(?,?,?,?,?,?,?,?,?,?,?,?)" ;
                 //  Call proccedures 
                 $query = $this->db->query($sql, array($txnid,$userid,$firstname,$lastname,$productinfo,$email,$phone,$bank_ref_num,$txnStatus,$jsondata,$amount,$addedon) );

                 if( $txnStatus=='success'){
               
                      $data = array(
                       'acttype'      => 'paid' 
                      
                    );

                    $this->db->where('id', $userid );

                    $this->db->update('tbl_user_registration', $data);                
                  }
                 return [];

        }


        //  public function create_transactionlist($data)
        //      {    

     
        //          $this->load->helper('url');
        //          $fromVal          = $data['fromVal'] ;
        //          $toVal         = $data['toVal'] ;
        //           // echo  $fromVal;
        //           // echo  $toVal;
        //           // exit;
        //         $query1 = $this->db->query("CALL `getdatewisetransaction`('$fromVal','$toVal')");
                   
        //           echo    $query1;
        //           exit;
        //         //NO error handling assume everything fine
        //         return $query1->result_array();

                
        // }
        public function create_transactionlist($data)
            {

                $this->load->helper('url');
                $fromVal          = $data['fromVal'] ;
                $toVal         = $data['toVal'] ;
                 // echo  $fromVal;
                 // echo  $toVal;
               $query = $this->db->query("CALL `getdatewisetransaction`('$fromVal','$toVal')");
                
                // echo $query ;
                // exit;
               //NO error handling assume everything fine
               return $query->result_array();


       }
        
     
              public function txn_list()
        {       
                $query = $this->db->query("CALL `gettxn`()");
               
                //NO error handling assume everything fine
               return $query->result_array();
        }

        
       
}

?>
