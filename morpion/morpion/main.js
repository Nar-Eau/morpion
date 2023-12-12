import './style.scss'

function estValide(button) {
    return button.classList.length == 0;
}

function setSymbol(btn, symbole) {
    btn.innerHTML = '<img src="http://localhost:5173/img/'+ symbole +'.gif" alt="'+ symbole +'"/>'
    btn.classList.add(symbole)
}

function rechercherVainqueur(pions, joueurs, tour) {
    if (
        pions[0].classList.contains(joueurs[tour]) &&
        pions[1].classList.contains(joueurs[tour]) &&
        pions[2].classList.contains(joueurs[tour])
    ) {
        return true;
    }

    console.log(pions[1].classList.contains(joueurs[tour]))
    console.log(joueurs[tour])

    if (
        pions[3].classList.contains(joueurs[tour]) &&
        pions[4].classList.contains(joueurs[tour]) &&
        pions[5].classList.contains(joueurs[tour])
    ) {
        return true;
    }

    if (
        pions[6].classList.contains(joueurs[tour]) &&
        pions[7].classList.contains(joueurs[tour]) &&
        pions[8].classList.contains(joueurs[tour])
    ) {
        return true;
    }

    if (
        pions[0].classList.contains(joueurs[tour]) &&
        pions[3].classList.contains(joueurs[tour]) &&
        pions[6].classList.contains(joueurs[tour])
    ) {
        return true;
    }

    if (
        pions[1].classList.contains(joueurs[tour]) &&
        pions[4].classList.contains(joueurs[tour]) &&
        pions[7].classList.contains(joueurs[tour])
    ) {
        return true;
    }

    if (
        pions[2].classList.contains(joueurs[tour]) &&
        pions[5].classList.contains(joueurs[tour]) &&
        pions[8].classList.contains(joueurs[tour])
    ) {
        return true;
    }

    if (
        pions[0].classList.contains(joueurs[tour]) &&
        pions[4].classList.contains(joueurs[tour]) &&
        pions[8].classList.contains(joueurs[tour])
    ) {
        return true;
    }

    if (
        pions[2].classList.contains(joueurs[tour]) &&
        pions[4].classList.contains(joueurs[tour]) &&
        pions[6].classList.contains(joueurs[tour])
    ) {
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

function main(player1,player2) {
    var pions = document.querySelectorAll("#Jeu button");
    var joueurs = ['na', 'ro'];
    var pseudo = [ '<span class="na">' + player1 + '</span>' , '<span class="ro">' + player2 + '</span>'];


    var tour = 0;
    var jeuEstFini = false;
    var afficheur = new Afficheur(document.querySelector("#StatutJeu"));
    var imgJoueur = "<div id='gifJoueur' class='" + joueurs[tour] +"'> </div>";


    afficheur.sendMessage(
        pseudo[tour] + " c'est votre tour."
    );
    for (var i = 0, len = pions.length; i < len; i++) {
        pions[i].addEventListener("click", function() {
            if (jeuEstFini) return;

            if (!estValide(this)) {
                if (!jeuEstFini) {
                    afficheur.sendMessage(
                        "Case occupée ! <br />" +
                        pseudo[tour] +
                        " c'est toujours à vous !"
                    );
                }
            } else {
                setSymbol(this, joueurs[tour]);
                jeuEstFini = rechercherVainqueur(pions, joueurs, tour);

                if (jeuEstFini) {
                    afficheur.sendMessage(
                        pseudo[tour] +
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
                afficheur.sendMessage(pseudo[tour] + " c'est à vous !");
            }
        });
    }
}

$(document).ready(function () {
    $('#overlay').css('display', 'block');
    $('#popup').css('display', 'block');

    let player1 = 'croix';
    let player2 = 'rond';

    $('#player1').submit(function (e) {
        e.preventDefault();

        player1 = $('#p1name').val();

        $('#player2').css('display', 'flex');
        $('#player1').css('display', 'none');

        $('#player2').submit(function (e) {
            e.preventDefault();

            player2 = $('#p2name').val();
            $('.marqueeTop .moving .name').html(player1);
            $('.marqueeBot .moving .name').html(player2);

            $('#overlay').css('display', 'none');
            $('#popup').css('display', 'none');
            main(player1, player2);
        });
    });
});


