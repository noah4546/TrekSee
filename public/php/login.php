<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");

session_start();

if (!isset($_SESSION['loggedIn']) || !isset($_SESSION['username'])) {
    $_SESSION['loggedIn'] = false;
    $_SESSION['username'] = "";
}

$username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_STRING);
$password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_STRING);

$_SESSION['loggedIn'] = true;
$_SESSION['username'] = $username;

$json = [
    "success" => true
];

echo json_encode($json);