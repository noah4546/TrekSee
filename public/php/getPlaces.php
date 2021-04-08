<?php

include_once "config.php";

$command = "SELECT * FROM `places` ORDER BY `place` ASC";
$stmt = $dbh->prepare($command);
$success = $stmt->execute();

$json = [];

if ($success) {

    while($row = $stmt->fetch()) {

        $place = [
            "id" => $row['id'],
            "place" => $row['place']
        ];

        array_push($json, $place);

    }

} else {
    $json = [
        "success" => false,
        "error" => "Could not connect to server"
    ];
}

echo json_encode($json);