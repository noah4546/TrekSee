<?php

header('Accept: x-www-form-urlencoded');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");

session_start();

require_once './config.php';

if (!isset($_SESSION['loggedIn']) || !isset($_SESSION['email']) || !isset($_SESSION['id'])) {
    $_SESSION['loggedIn'] = false;
    $_SESSION['email'] = "";
}

$location = null;

if (isset($_SESSION['id'])) {
    $command = "SELECT * FROM `user_location` WHERE `user_id`=?";
    $stmt = $dbh->prepare($command);
    $params = [$_SESSION['id']];
    $success = $stmt->execute($params);

    if ($success && $stmt->rowCount() == 1) {

        $row = $stmt->fetch();

        $location = [
            "lat" => $row['lat'],
            "lng" => $row['lng']
        ];
    }
}


$json = [
    "loggedIn" => $_SESSION['loggedIn'],
    "id" => $_SESSION['id'],
    "firstName" => $_SESSION['firstName'],
    "lastName" => $_SESSION['lastName'],
    "email" => $_SESSION['email'],
    "created" => $_SESSION['created'],
    "location" => $location
];

echo json_encode($json);