<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");

session_start();

require_once './config.php';

if (!isset($_SESSION['loggedIn']) || !isset($_SESSION['username'])) {
    $_SESSION['loggedIn'] = false;
    $_SESSION['username'] = "";
}
$username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_STRING);
$password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_STRING);
$email = filter_input(INPUT_POST, "email", FILTER_SANITIZE_STRING);

$paramsOk = true;
$errors = [];
$userCreated = false;

$json = [
    "success" => false,
    "error" => ["Unknown"]
];

if ($email === null || empty($email)) {
    $paramsOk = false;
    array_push($errors, "Email is invalid");
}
if ($username === null || empty($username) || strlen($username) < 6) {
    $paramsOk = false;
    array_push($errors, "Username is invalid");
}
if ($password === null || empty($password) || strlen($password) < 8) {
    $paramsOk = false;
    array_push($errors, "Password is invalid");
}

if ($paramsOk) {

    $command = "SELECT * FROM `users` WHERE `username`=?";
    $stmt = $dbh->prepare($command);
    $params = [$username];
    $success = $stmt->execute($params);

    if ($success) {
        if ($stmt->rowCount() == 0) {

            $command = "SELECT * FROM `users` WHERE `email`=?";
            $stmt = $dbh->prepare($command);
            $params = [$email];
            $success = $stmt->execute($params);

            if ($success) {
                if ($stmt->rowCount() == 0) {

                    $password_hash = password_hash($password, PASSWORD_DEFAULT);

                    $command = "INSERT INTO `user` (`username`, `password`, `email`)
                                VALUES (?, ?, ?)";
                    $stmt = $dbh->prepare($command);
                    $params = [$username, $password_hash, $email];
                    $success = $stmt->execute($params);

                    if ($success) {

                        $_SESSION['loggedIn'] = true;
                        $_SESSION['username'] = $username;
                        $userCreated = true;

                    } else {
                        array_push($errors, "Unable to create user");
                    }
                } else {
                    array_push($errors, "Email Taken");
                }
            } else {
                array_push($errors, "Unable to connect to server");
            }
        } else {
            array_push($errors, "Username Taken");
        }
    } else {
        array_push($errors, "Unable to connect to server");
    }
}

if ($userCreated) {
    $json = [
        "success" => true
    ];
} else if (!empty($errors)) {
    $json = [
        "success" => false,
        "errors" => $errors
    ];
}

echo json_encode($json);