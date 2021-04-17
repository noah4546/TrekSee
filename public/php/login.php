<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");

session_start();

require_once './config.php';

if (!isset($_SESSION['loggedIn']) || !isset($_SESSION['email'])) {
    $_SESSION['loggedIn'] = false;
    $_SESSION['email'] = "";
}

$email = filter_input(INPUT_POST, "email", FILTER_SANITIZE_STRING);
$password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_STRING);

$paramsOK = true;
$loginSuccess = false;
$errors = [];

$json = [
    "success" => false,
    "errors" => ["Unknown"]
];

if ($email === null || empty($email)) {
    $paramsOk = false;
    array_push($errors, "Email is invalid");
}
if ($password === null || empty($password) || strlen($password) < 8) {
    $paramsOk = false;
    array_push($errors, "Password is invalid");
}

if ($paramsOK) {

    $command = "SELECT * FROM `users` WHERE `email`=?";
    $stmt = $dbh->prepare($command);
    $params = [$email];
    $success = $stmt->execute($params);

    if ($success) {
        if ($stmt->rowCount() == 1) {

            $row = $stmt->fetch();

            $id = $row['id'];
            $firstName = $row['firstName'];
            $lastName = $row['lastName'];
            $hashed_password = $row['password'];
            $email = $row['email'];
            $created = $row['created'];

            if (password_verify($password, $hashed_password)) {

                session_start();

                $_SESSION['loggedIn'] = true;
                $_SESSION['id'] = $id;
                $_SESSION['firstName'] = $firstName;
                $_SESSION['lastName'] = $lastName;
                $_SESSION['email'] = $email;
                $_SESSION['created'] = $created;

                $loginSuccess = true;
            }
        } else {
            array_push($errors, "No user found with that email");
        }
    } else {
        array_push($errors, "Unable to connect to server");
    }
}

if ($loginSuccess) {
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