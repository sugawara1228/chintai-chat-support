<?php
header('Content-Type: application/json');

// データベースからデータを取得するなどの処理
$data = array('message' => 'Hello from PHP!');

echo json_encode($data);
?>