<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];
    $subject = "Contact Form Submission";

    $to = "baker.creations.llc@gmail.com";
    $headers = "From: " . $email . "\r\n" .
               "Reply-To: " . $email . "\r\n" .
               "Content-Type: text/html; charset=UTF-8\r\n";

    $body = "<h2>Contact Form Submission</h2>" .
            "<p><strong>Name:</strong> $name</p>" .
            "<p><strong>Email:</strong> $email</p>" .
            "<p><strong>Message:</strong> $message</p>";

    if (mail($to, $subject, $body, $headers)) {
        echo "Message sent successfully!";
    } else {
        echo "Failed to send the message.";
    }
}
?>
