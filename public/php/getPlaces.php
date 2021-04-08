<?php

header('Accept: x-www-form-urlencoded');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");

include_once "config.php";

$command = "SELECT * FROM `places` ORDER BY `place` ASC";
$stmt = $dbh->prepare($command);
$success = $stmt->execute();

$json = [];

if ($success) {

    while($row = $stmt->fetch()) {

        array_push($json, $row['place']);

    }

} else {
    $json = [
        "success" => false,
        "error" => "Could not connect to server"
    ];
}

echo json_encode($json);