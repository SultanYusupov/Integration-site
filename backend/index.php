<?php
// header("Access-Control-Allow-Origin: http://localhost:4200");
// header('Content-Type: text/html; charset=UTF-8');
// header("HTTP/1.1 200 OK");
// header("Access-Control-Allow-Credentials: true");
// header("Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT");
// header('Content-Type: application-json; charset=utf-8"');

/*$json = file_get_contents('php://input'); // string
$obj = json_decode($json);
echo $obj['name'];
// Запись в лог файл
$params = array(
  'get' => $_GET,
  'post' => $_POST,
  'json' => $json
);

file_put_contents($_SERVER["DOCUMENT_ROOT"]. "/doc.log", var_export($params, true), 8);

$arResult = array(
  'code' => 0,
  'data' => array(
    'message' => file_get_contents($_SERVER["DOCUMENT_ROOT"]. "/doc.log", true)
  ),

);

echo json_encode($arResult);*/
$received = file_get_contents('php://input');

// $array = json_decode($received, true);
$save = file_put_contents($_SERVER["DOCUMENT_ROOT"]. "/doc.log", $received, FILE_APPEND);

$message = file_get_contents($_SERVER["DOCUMENT_ROOT"]. "/doc.log", true);

echo $message;
?>
