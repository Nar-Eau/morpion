import './style.scss'

function estValide(button) {
    return button.innerHTML.length == 0;
}

function setSymbol(btn, symbole) {
    btn.innerHTML = symbole
    btn.classList.add(symbole)
}

function rechercherVainqueur(pions, joueurs, tour) {
    if (
        pions[0].innerHTML == joueurs[tour] &&
        pions[1].innerHTML == joueurs[tour] &&
        pions[2].innerHTML == joueurs[tour]
    ) {
        pions[0].style.backgroundColor = "#9ACD32";
        pions[1].style.backgroundColor = "#9ACD32";
        pions[2].style.backgroundColor = "#9ACD32";
        return true;
    }

    if (
        pions[3].innerHTML == joueurs[tour] &&
        pions[4].innerHTML == joueurs[tour] &&
        pions[5].innerHTML == joueurs[tour]
    ) {
        pions[3].style.backgroundColor = "#9ACD32";
        pions[4].style.backgroundColor = "#9ACD32";
        pions[5].style.backgroundColor = "#9ACD32";
        return true;
    }

    if (
        pions[6].innerHTML == joueurs[tour] &&
        pions[7].innerHTML == joueurs[tour] &&
        pions[8].innerHTML == joueurs[tour]
    ) {
        pions[6].style.backgroundColor = "#9ACD32";
        pions[7].style.backgroundColor = "#9ACD32";
        pions[8].style.backgroundColor = "#9ACD32";
        return true;
    }

    if (
        pions[0].innerHTML == joueurs[tour] &&
        pions[3].innerHTML == joueurs[tour] &&
        pions[6].innerHTML == joueurs[tour]
    ) {
        pions[0].style.backgroundColor = "#9ACD32";
        pions[3].style.backgroundColor = "#9ACD32";
        pions[6].style.backgroundColor = "#9ACD32";
        return true;
    }

    if (
        pions[1].innerHTML == joueurs[tour] &&
        pions[4].innerHTML == joueurs[tour] &&
        pions[7].innerHTML == joueurs[tour]
    ) {
        pions[1].style.backgroundColor = "#9ACD32";
        pions[4].style.backgroundColor = "#9ACD32";
        pions[7].style.backgroundColor = "#9ACD32";
        return true;
    }

    if (
        pions[2].innerHTML == joueurs[tour] &&
        pions[5].innerHTML == joueurs[tour] &&
        pions[8].innerHTML == joueurs[tour]
    ) {
        pions[2].style.backgroundColor = "#9ACD32";
        pions[5].style.backgroundColor = "#9ACD32";
        pions[8].style.backgroundColor = "#9ACD32";
        return true;
    }

    if (
        pions[0].innerHTML == joueurs[tour] &&
        pions[4].innerHTML == joueurs[tour] &&
        pions[8].innerHTML == joueurs[tour]
    ) {
        pions[0].style.backgroundColor = "#9ACD32";
        pions[4].style.backgroundColor = "#9ACD32";
        pions[8].style.backgroundColor = "#9ACD32";
        return true;
    }

    if (
        pions[2].innerHTML == joueurs[tour] &&
        pions[4].innerHTML == joueurs[tour] &&
        pions[6].innerHTML == joueurs[tour]
    ) {
        pions[2].style.backgroundColor = "#9ACD32";
        pions[4].style.backgroundColor = "#9ACD32";
        pions[6].style.backgroundColor = "#9ACD32";
        return true;
    }
}

function matchNul(pions) {
    for (var i = 0, len = pions.length; i < len; i++) {
        if (pions[i].innerHTML.length == 0) return false;
    }

    return true;
}

var Afficheur = function(element) {
    var affichage = element;

    function setText(message) {
        affichage.innerHTML = message;
    }

    return { sendMessage: setText };
};

function imgJoueurOnField(players, round) {
    return "<div id='gifJoueur' class='" + players[round] +"'> </div>";
}
function main() {
    var pions = document.querySelectorAll("#Jeu button");
    var joueurs = ["croix", "rond"];
    var tour = 0;
    var jeuEstFini = false;
    var afficheur = new Afficheur(document.querySelector("#StatutJeu"));
    var imgJoueur = "<div id='gifJoueur' class='" + joueurs[tour] +"'> </div>";
    
    afficheur.sendMessage(
        imgJoueur + " c'est votre tour."
    );
    for (var i = 0, len = pions.length; i < len; i++) {
        pions[i].addEventListener("click", function() {
            if (jeuEstFini) return;

            if (!estValide(this)) {
                afficheur.sendMessage(
                    "Case occupée ! <br />" +
                    imgJoueur +
                    " c'est toujours à vous !"
                );
            } else {
                setSymbol(this, joueurs[tour]);
                jeuEstFini = rechercherVainqueur(pions, joueurs, tour);

                if (jeuEstFini) {
                    afficheur.sendMessage(
                        imgJoueur +
                        ' à gagné ! <br /> <a href="morpion.html">Rejouer</a>'
                    );
                    return;
                }

                if (matchNul(pions)) {
                    afficheur.sendMessage(
                        'Match Nul ! <br/> <a href="morpion.html">Rejouer</a>'
                    );
                    return;
                }

                tour++;
                tour = tour % 2;
                imgJoueur = imgJoueurOnField(joueurs,tour);
                afficheur.sendMessage(imgJoueur + " c'est à vous !");
            }
        });
    }
}

main();
