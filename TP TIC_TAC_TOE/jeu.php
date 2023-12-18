<?php

session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $_SESSION['nom'] = filter_input(INPUT_POST, 'nom', FILTER_SANITIZE_STRING);
    $_SESSION['prenom'] = filter_input(INPUT_POST, 'prenom', FILTER_SANITIZE_STRING);
    $_SESSION['sexe'] = filter_input(INPUT_POST, 'sexe', FILTER_SANITIZE_STRING);

    header("Location: jeu.html");
    exit;
}

header("Location: jeu.html");
exit;

?>
