<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");

session_start();

require_once './config.php';

$lat = filter_input(INPUT_POST, "lat", FILTER_VALIDATE_FLOAT);
$lng = filter_input(INPUT_POST, "lng", FILTER_VALIDATE_FLOAT);

$paramsOk = true;

if (!isset($_SESSION['loggedIn']) || !isset($_SESSION['email'])) {
    $_SESSION['loggedIn'] = false;
    $_SESSION['email'] = "";
}

if (isset($_SESSION['id']) && $paramsOk) {
    $command = "SELECT * FROM `user_location` WHERE `user_id`=?";
    $stmt = $dbh->prepare($command);
    $params = [$_SESSION['id']];
    $success = $stmt->execute($params);

    if ($success) {

        if ($stmt->rowCount() == 1) {

            $command = "UPDATE `user_location` 
                        SET lat=?, lng=?
                        WHERE `user_id`=?";
            $stmt = $dbh->prepare($command);
            $params = [$lat, $lng, $_SESSION['id']];
            $stmt->execute($params);

        } else {

            $command = "INSERT INTO `user_location` (`lat`, `lng`, `user_id`)
                        VALUES (?,?,?)";
            $stmt = $dbh->prepare($command);
            $params = [$lat, $lng, $_SESSION['id']];
            $stmt->execute($params);

        }      
    }
}