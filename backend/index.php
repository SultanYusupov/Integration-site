<?php
 header("Access-Control-Allow-Origin: http://localhost:4200");
// header('Content-Type: text/html; charset=UTF-8');
 header("HTTP/1.1 200 OK");
 header("Access-Control-Allow-Credentials: true");
 header("Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT");
// header('Content-Type: application-json; charset=utf-8"');

$json = file_get_contents('php://input'); // string

// Запись в лог файл
$params = [
  'get' => $_GET,
  'post' => $_POST,
  'json' => $json
];

file_put_contents($_SERVER["DOCUMENT_ROOT"]. "/doc.log", var_export($params, true));

$arResult = [
  'code' => 0,
  'data' => [
    'message' => file_get_contents($_SERVER["DOCUMENT_ROOT"]. "/doc.log", true)
  ],

];

echo json_encode($arResult);
?>
