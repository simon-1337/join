<?php

########### CONFIG ###############

$recipient = 'your@mail.de';
#$redirect = 'reset_password.html';

########### CONFIG END ###########

#$timeStamp= round(microtime(true) * 1000);
#$to="sesgigi@yahoo.de";
#+$message="gruppe-348.developerakademie.net/join/reset_password.html";
#mail($to, $subject, $message, $headers);
#$somevar = $_GET["uid"]; //puts the uid varialbe into $somevar




########### Intruction ###########   
#
#   This script has been created to send an email to the $recipient
#   
#  1) Upload this file to your FTP Server
#  2) Send a POST rewquest to this file, including
#     [name] The name of the sender (Absender)
#     [message] Message that should be send to you
#
##################################



###############################
#
#        DON'T CHANGE ANYTHING FROM HERE!
#
#        Ab hier nichts mehr ändern!
#
###############################

switch ($_SERVER['REQUEST_METHOD']) {
    case ("OPTIONS"): //Allow preflighting to take place.
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: POST");
        header("Access-Control-Allow-Headers: content-type");
        exit;
    case ("POST"): //Send the email;
        header("Access-Control-Allow-Origin: *");

        $email = $_POST['email'];

        $message = "Hello,\n
        \nFollow this link to reset your Join password for your  " . $email ." account.\n
        \nhttps://gruppe-348.developerakademie.net/join/reset_password.html?email=" . $email . "\n
        \nIf you didn't ask to reset your password, you can ignore this email.\n
        \nThanks,\n
        \nYour Join team\n";

        $recipient = $email;
        $subject = "Reset your password for Join App";
        $headers = "Form: noreply@https://gruppe-348.developerakademie.net";

        $result = mail($recipient, $subject, $message, $headers);
        print($result);
        

        #mail($recipient, $subject, $_POST['message'], $headers);
       #header("Location: " . $redirect); 

        break;
    default: //Reject any non POST or OPTIONS requests.
        header("Allow: POST", true, 405);
        exit;
}


$url="gruppe-348.developerakademie.net/join/reset_password.html?email=".$_POST['email']."&timeSTamp=".$timeSTamp;