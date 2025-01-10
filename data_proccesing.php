<?php

header("Access-Control-Allow-Origin: *");


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $firstNameForm = isset($_POST['тame']) ? trim(htmlspecialchars($_POST['name'])) : '';
    $lastNameForm = isset($_POST['last']) ? trim(htmlspecialchars($_POST['surname'])) : '';
    $emailForm = isset($_POST['email']) ? trim(htmlspecialchars($_POST['email'])) : '';
    $phoneForm = isset($_POST['phone']) ? trim(htmlspecialchars($_POST['phone'])) : '';
    $mbr = $_POST['br'] ?? "TECH";
    $answers = $_POST['answers'] ?? "ERROR";
}

$click_id = $_POST['external_id'];
$nameDocument = $_POST['title_name'] ?? "DEFAULT";
$firstName = $firstNameForm ?? "ERROR";
$lastName = $lastNameForm ?? "ERROR";
$email = $emailForm ?? "error@gmail.com";
$phoneWithCode = $phoneForm;

// UTM parameters
$campaign_id = $_POST['campaign_id'] ?? null;
$adset_id = $_POST['adset_id'] ?? null;
$ad_id = $_POST['ad_id'] ?? null;
$utm_campaign = $_POST['utm_campaign'] ?? null;
$adset_name = $_POST['adset_name'] ?? null;
$ad_name = $_POST['ad_name'] ?? null;
$utm_placement = $_POST['utm_placement'] ?? null;
$utm_source = $_POST['utm_source'] ?? null;

// Buyer Tracking
$pxl = $_POST['pixel'] ?? "pxl";
$pxlt = $_POST['pixel'] ?? "pxlt";
$pxlg = $_POST['pxlg'] ?? "pxlg";
$pxlm = $_POST['pixel'] ?? 877087;
$pixel = $_POST['pixel'];
$nameDocument = $_POST['title_name'];

echo 'name', $firstName;
echo 'surname', $lastName;
echo 'email', $email;
echo 'phone', $phoneWithCode;
echo 'campaign_id', $campaign_id;
echo 'external_id', $click_id;
echo 'adset_id', $adset_id;
echo 'ad_id', $ad_id;
echo 'utm_campaign', $utm_campaign;
echo 'adset_name', $adset_name;
echo 'ad_name', $ad_name;
echo 'utm_placement', $utm_placement;
echo 'pxl', $pxl;
echo 'pxlt', $pxlt;
echo 'pxlg', $pxlg;
echo 'pxlg', $pxlg;
echo 'pxlm', $pxlm;
echo 'pixel', $pixel;
?>