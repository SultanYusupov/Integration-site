<?php
// функция удаляет все ненужные символы (также защищает от эксплойта)
function test_input($dat) {
  $dat = trim($dat);
  $dat = stripslashes($dat);
  $dat = htmlspecialchars($dat);
  return $dat;
}

$received = file_get_contents('php://input');
$code = 0;
$error = '';

//if (empty($received)) {
//  $error = 'Ошибка. Получены пустые данные';
//}
 $array = json_decode($received, true);

if (preg_match('/\+?[0-9]+/', $array['telephone'])) {
  $code = 1;
}
else {
  $error = 'Неверно указан номер телефона';
}

  $arResult = [
    //'data' => $array['telephone'],
    'data' => [
      'next' => 2,
      'name' => test_input($array['name']),
      'email' => test_input($array['email']),
      'telephone' => test_input($array['telephone']),
      'comment' => test_input($array['comment']),
    ],
    'code' => $code,
    'message' => $code ? 'Ваша заявка отправлена' : $error,
  ];

  $forLog = [
    'date' => date('Y-m-d H:i:s'),
    'data1' => $array,
    'data_input' => $received,
    'result_code' => $code
  ];
  $forLog = print_r($forLog, true);
  $save = file_put_contents($_SERVER["DOCUMENT_ROOT"] . "/backend/log.txt", $forLog, FILE_APPEND);

  echo json_encode($arResult);
/*------Отправляем данные в Битрикс--------------*/
// формируем URL, на который будем отправлять запрос в битрикс24
$queryURL = "https://b24-sy2iop.bitrix24.ru/rest/1/6sx4gmjg6vh3vqj9/crm.lead.add.json";

//собираем данные из формы
$sName = htmlspecialchars($array['name']);
$sPhone = htmlspecialchars($array["telephone"]);
$arEmail = Array(
  "n0" => Array(
    "VALUE" => str_replace(" ","",$array["email"]),
    "VALUE_TYPE" => "WORK",
  ),
);
$sComments = strip_tags($array['comment']);
$arPhone = (!empty($sPhone)) ? array(array('VALUE' => $sPhone, 'VALUE_TYPE' => 'MOBILE')) : array();

// формируем параметры для создания лида
$queryData = http_build_query(array(
  "fields" => array(
    "TITLE" => 'Интеграция систем',
    "NAME" => $sName,	// имя
    "EMAIL" => $arEmail,	// почта
    "PHONE" => $arPhone, // телефон
    "COMMENTS" => $sComments, // дополнительное сообщение
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
