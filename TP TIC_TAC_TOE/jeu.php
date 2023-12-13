<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tic-tac-Toe</title>
    <link rel="stylesheet" href="jeu.css">
</head>

<body>
    <main>
        <section id="inscriptionSection" class="main">
            <form onsubmit="envoyerFormulaire(event); return false;" id="form" method="post"  action="">
                <h1>Formulaire d'Inscription</h1>
                <label for="nom">Veuillez saisir votre nom :</label>
                <input type="text" id="nom" name="nom" required>

                <label for="prenom">Veuillez saisir votre prénom :</label>
                <input type="text" id="prenom" name="prenom" required>

                <label for="sexe">Veuillez indiquer votre sexe :</label>
                <div class="gender-options">
                    <label for="homme" style="font-weight: initial; margin-left: 30px;">Homme</label>
                    <input type="radio" id="homme" name="sexe" value="homme" required checked>

                    <label for="femme" style="font-weight: initial; margin-left: 30px;">Femme</label>
                    <input type="radio" id="femme" name="sexe" value="femme" required>
                </div>
                <button type="submit" value="Suivant">Suivant</button>
            </form>
        </section>
        <section id="difficulteSection" style="display: none;">
            <form onsubmit="commencerJeu(event); return false;" id="IDform">
                <div class="choixNiveau">
                    <label for="difficulty">Difficulté : </label>
                    <select name="difficulty" style="margin: 15px;" id="difficulty" onchange="changeDifficulty()">
                        <option value="3">Facile</option>
                        <option value="4">Moyen</option>
                        <option value="5">Difficile</option>
                    </select>
                </div>
                <div style="display:flex; align-items: center;">
                    <label for="symbole" style="margin-left: 30px;">Symbole :</label>
                    <label for="x" style="margin-left:40px; margin-right:15px; font-weight:initial ;">x</label>
                    <input type="radio" name="symbole" value="x" required style="margin-top:15px ;">
                    <label for="o" style="margin-left:40px; margin-right:15px; font-weight:initial ;">o</label>
                    <input type="radio" name="symbole" value="o" required style="margin-top:15px ;">
                </div><br>
                <button type="submit" value="Commencer le jeu">Commencer le Jeu</button>
            </form>
        </section>
        <section id="jeuSection" style="display: none;">
               <div class="board" id="board" style="margin-bottom:25px;">
                    <div class="cell" data-cell></div>
                    <div class="cell" data-cell></div>
                    <div class="cell" data-cell></div>
                    <div class="cell" data-cell></div>
                    <div class="cell" data-cell></div>
                    <div class="cell" data-cell></div>
                    <div class="cell" data-cell></div>
                    <div class="cell" data-cell></div>
                    <div class="cell" data-cell></div>
               </div>

               <div style="display:inline;">
                    <button id="abandonnerButton" onclick="abandonnerJeu()">Abandonner</button>
                    <button id="restartButton">Recommencer</button>
               </div>
               
               <div class="winning-message" id="winningMessage">
                    <div data-winning-message-text></div>      
               </div>
        </section>
        <section id="scoreSection" style="display: none;">
            <h1>Tableau des Scores</h1>
            <table border="1">
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Difficulté</th>
                        <th>Résultat</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    // Afficher les scores ici en utilisant les données de la session
                    if (isset($_SESSION["joueur"])) {
                        $nom = $_SESSION["joueur"]["nom"];
                        $prenom = $_SESSION["joueur"]["prenom"];
                        $difficulty = isset($_SESSION["joueur"]["difficulty"]) ? $_SESSION["joueur"]["difficulty"] : "";
                        $resultat = ""; // Vous devez déterminer le résultat en fonction du déroulement du jeu
        
                        echo "<tr>
                                <td>$nom</td>
                                <td>$prenom</td>
                                <td>$difficulty</td>
                                <td>$resultat</td>
                                </tr>";
                    }
                    ?>
                </tbody>
            </table>
        </section>
    </main>

    <?php
        session_start();
                
                // Vérifier si le formulaire d'inscription a été soumis
                if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["nom"], $_POST["prenom"], $_POST["sexe"])) {
                    // Récupérer les données du formulaire
                    $nom = $_POST["nom"];
                    $prenom = $_POST["prenom"];
                    $sexe = $_POST["sexe"];
                
                    // Stocker les données dans la session
                    $_SESSION["joueur"] = [
                        "nom" => $nom,
                        "prenom" => $prenom,
                        "sexe" => $sexe,
                    ];
                
                    // Rediriger vers la page suivante (difficulté)
                    header("Location: difficulte.php");
                    exit();
                }
                
                // Vérifier si le formulaire de difficulté a été soumis
                if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["difficulty"], $_POST["symbole"])) {
                    // Récupérer les données de difficulté
                    $difficulty = $_POST["difficulty"];
                    $symbole = $_POST["symbole"];
                
                    // Ajouter les données de difficulté à la session
                    $_SESSION["joueur"]["difficulty"] = $difficulty;
                    $_SESSION["joueur"]["symbole"] = $symbole;
                
                    // Rediriger vers la page du jeu
                    header("Location: jeu.php");
                    exit();
                }
                
                // Si vous avez des résultats de jeu à traiter, vous pouvez les stocker ici
                
                // Afficher le tableau des scores
    ?>
    <script src="jeu.js" defer></script>
</body>

</html>
