<?php

header("Access-Control-Allow-Origin: *");

$name = $_POST['name'] ?? '';
$surname = $_POST['surname'] ?? '';
$phone = $_POST['phone']  ?? '';
$phone = preg_replace('/[^\d+]/', '', $phone);
$email = $_POST['email'] ?? '';
$answers = $_POST['answers'] ?? '';

$user_data = [
    'name' => $name,
    'surname' => $surname,
    'phone' => $phone,
    'email' => $email,
    'links' => $answers,
];
echo $user_data['name'];
echo $user_data['surname'];
echo $user_data['phone'];
echo $user_data['email'];
echo $user_data['links'];
?>