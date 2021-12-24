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

 $array = json_decode($received, true);
$save = file_put_contents($_SERVER["DOCUMENT_ROOT"]. "/doc.log", $received, FILE_APPEND);

$message = file_get_contents($_SERVER["DOCUMENT_ROOT"]. "/doc.log", true);

//echo $message;

/*------Отправляем данные в Битрикс--------------*/
// формируем URL, на который будем отправлять запрос в битрикс24
$queryURL = "https://b24-24zdb7.bitrix24.ru/rest/1/9uveg12vvakig3t0/crm.lead.add.json";

//собираем данные из формы
$sName = htmlspecialchars($array['name']);
$sPhone = htmlspecialchars($array["telephone"]);
$sEmail = htmlspecialchars($array["email"]);
$arPhone = (!empty($sPhone)) ? array(array('VALUE' => $sPhone, 'VALUE_TYPE' => 'MOBILE')) : array();

// формируем параметры для создания лида
$queryData = http_build_query(array(
  "fields" => array(
    "NAME" => $sName,	// имя
    "EMAIL" => $sEmail,	// фамилия
    "PHONE" => $arPhone, // телефон
  ),
  'params' => array("REGISTER_SONET_EVENT" => "Y")	// Y = произвести регистрацию события добавления лида в живой ленте. Дополнительно будет отправлено уведомление ответственному за лид.
));

// отправляем запрос в Б24 и обрабатываем ответ
$curl = curl_init();
curl_setopt_array($curl, array(
  CURLOPT_SSL_VERIFYPEER => 0,
  CURLOPT_POST => 1,
  CURLOPT_HEADER => 0,
  CURLOPT_RETURNTRANSFER => 1,
  CURLOPT_URL => $queryURL,
  CURLOPT_POSTFIELDS => $queryData,
));
$result = curl_exec($curl);
curl_close($curl);
$result = json_decode($result,1);

// если произошла какая-то ошибка - выведем её
if(array_key_exists('error', $result))
{
  die("Ошибка при сохранении лида: ".$result['error_description']);
}
?>
