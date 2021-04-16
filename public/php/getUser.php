<?php

header('Accept: x-www-form-urlencoded');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");

session_start();

if (!isset($_SESSION['loggedIn']) || !isset($_SESSION['email'])) {
    $_SESSION['loggedIn'] = false;
    $_SESSION['email'] = "";
}

$json = [
    "loggedIn" => $_SESSION['loggedIn'],
    "username" => $_SESSION['email']
];

echo json_encode($json);