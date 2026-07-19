<?php
session_start();
require_once 'cors.php';

$data = json_decode(file_get_contents("php://input"), true);

if ($data['email'] === 'test@test.com' && $data['password'] === '1234') {
  $_SESSION['user'] = [
    'id' => 1,
    'name' => 'テストユーザー'
  ];

  echo json_encode(['success' => true]);
} else {
  http_response_code(401);
  echo json_encode(['error' => 'Invalid credentials']);
}
