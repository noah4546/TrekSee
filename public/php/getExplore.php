<?php

header('Accept: x-www-form-urlencoded');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");

require_once './config.php';

$json = [];

$command = "SELECT * FROM `explore`";
$stmt = $dbh->prepare($command);
$success = $stmt->execute();

if ($success) {

    while ($row = $stmt->fetch()) {

        $item = [
            "id" => $row['id'],
            "name" => $row['name'],
            "image_url" => $row['image_url'],
            "is_closed" => $row['is_closed'],
            "phone" => $row['phone'],
            "info" => $row['info'],
            "url" => $row['url'],
            "yelp_id" => $row['yelp_id'],
            "categories" => [
                [
                    "title" => $row['type'],
                ],
                [
                    "title" => $row['type'],
                ],
            ],
            "coordinates" => [
                "latitude" => $row['lat'],
                "longitude" => $row['lng']
            ],
        ];

        array_push($json, $item);
    }
}

echo json_encode($json);