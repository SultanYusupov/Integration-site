<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
echo 'This is backend';
$json = file_get_contents('php://input');

if (isset($_POST['name'])) {
  print("Имя: " . $_POST['name']);
}
?>
