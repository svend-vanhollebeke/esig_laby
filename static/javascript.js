const grille = [
  [0 , 3 , 8 , 15, 8 , 15, 8 , 15, 15, 15, 15, 4 , 0 , 0 ],
  [3 , 1 , 5 , 0 , 10, 0 , 14, 0 , 0 , 0 , 0 , 7 , 4 , 0 ],
  [7 , 5 , 0 , 0 , 0 , 3 , 6 , 13, 0 , 98, 15, 1 , 6 , 4 ],
  [14, 0 , 0 , 0 , 0 , 14, 0 , 0 , 0 , 99, 0 , 14, 0 , 14],
  [7 , 15, 8 , 13, 0 , 2 , 4 , 0 , 0 , 0 , 3 , 9 , 0 , 14],
  [14, 0 , 14, 0 , 0 , 0 , 14, 0 , 12, 0 , 7 , 6 , 15, 9 ],
  [14, 0 , 2 , 15, 8 , 15, 1 , 15, 9 , 0 , 14, 0 , 0 , 10],
  [2 , 4 , 0 , 0 , 14, 0 , 14, 0 , 7 , 15, 1 , 4 , 0 , 0 ],
  [0 , 7 , 15, 8 , 5 , 0 , 7 , 15, 5 , 0 , 7 , 6 , 4 , 0 ],
  [0 , 14, 0 , 10, 0 , 11, 9 , 0 , 0 , 0 , 14, 0 , 7 , 13],
  [0 , 14, 0 , 0 , 0 , 0 , 2 , 15, 8 , 15, 6 , 15, 9 , 0 ],
  [11, 6 , 4 , 0 , 12, 0 , 0 , 0 , 14, 0 , 0 , 0 , 14, 0 ],
  [0 , 0 , 14, 0 , 2 , 8 , 15, 15, 9 , 0 , 17 , 0 , 14, 0 ],
  [3 , 15, 9 , 0 , 0 , 14, 0 , 0 , 10, 0 , 7 , 15, 5 , 0 ],
  [14, 0 , 10, 0 , 0 , 14, 0 , 12, 0 , 0 , 14, 0 , 0 , 0 ],
  [2 , 4 , 0 , 0 , 3 , 6 , 8 , 5 , 0 , 0 , 14, 0 , 0 , 0 ],
  [0 , 7 , 15, 15, 9 , 0 , 14, 0 , 3 , 15, 6 , 15, 4 , 0 ],
  [0 , 14, 0 , 0 , 14, 0 , 2 , 8 , 5 , 0 , 0 , 0 , 7 , 13],
  [0 , 7 , 15, 15, 5 , 0 , 0 , 14, 0 , 12, 0 , 3 , 5 , 0 ],
  [11, 5 , 0 , 0 , 0 , 0 , 0 , 2 , 15, 6 , 15, 5 , 0 , 0 ]
];

const indices = [
    [4, 1], [7, 2], [3, 4], [8, 5],
    [13, 6], [3, 9], [5, 9], [13, 9],
    [0, 11], [4, 11], [8, 13], [2, 14],
    [7, 14], [13, 17], [9, 18], [0, 19],
    [10, 12], [9, 2]
];

let score_equipe = 0;
let has_key = false;

function LoadLaby(x,y,dir){
    let element = grille[y][x];
    if ((x===9 && y===2) && has_key){
        element = 16;
    }
    $('body').load('/load_room/' + element + "/" + dir + "/" + score_equipe);
    if (CheckIfClue(x,y)){
        setTimeout(function (){
            let noClue = ShowClue(x,y);
            if (noClue === 0){
                alert('Indice no 1 !\n\n [⊚ : C:\\-\\-\\-\\-\\-]');
            } else if (noClue === 1){
                alert('Indice no 2 !\n\n [⊡ : -- --5 1-]');
            } else if (noClue === 2){
                alert('Indice no 3 !\n\n [∆ : ----e ---]');
            } else if (noClue === 3){
                alert('Indice no 4 !\n\n [⊚ : -\\-\\-\\-\\-\\SERVER]');
            } else if (noClue === 4){
                alert('Indice no 5 !\n\n [⊚ : -\\ESIGUsers\\-\\-\\-\\-]');
            } else if (noClue === 5){
                alert('Indice no 6 !\n\n [∆ : --ll- ---]');
            } else if (noClue === 6){
                alert('Indice no 7 !\n\n [⊡ : P- --- --]');
            } else if (noClue === 7){
                alert('Indice no 8 !\n\n [⊚ : -\\-\\URL\\-\\-\\-]');
            } else if (noClue === 8){
                alert('Indice no 9 !\n\n [∆ : ----- --1]');
            } else if (noClue === 9){
                alert('Indice no 10 !\n\n [∆ : ----- 3-]');
            } else if (noClue === 10){
                alert('Indice no 11 !\n\n [⊡ : -- --- -2]');
            } else if (noClue === 11){
                alert('Indice no 12 !\n\n [⊡ : -C --- --]');
            } else if (noClue === 12){
                alert('Indice no 13 !\n\n [⊚ : -\\-\\-\\ROUTER\\-\\-]');
            } else if (noClue === 13){
                alert('Indice no 14 !\n\n [∆ : sa--- ---]');
            } else if (noClue === 14){
                alert('Indice no 15 !\n\n [⊚ : -\\-\\-\\-\\LOGIN\\-]');
            } else if (noClue === 15){
                alert('Indice no 16 !\n\n [⊡ : -- 31- --]');
            } else if (noClue === 16){
                alert('Clé trouvée !\n\n Elle ouvre forcément une porte...');
            } else if (noClue === 17){
                if (!has_key) {
                    alert('La porte est verrouillée, il faudrait trouver la clé.');
                }
            }
        }, 500)
    } else {
        let rand = Math.floor(Math.random() * 15);
        let computer = Math.floor(Math.random() * 3)+1;
        let comp_choice = "";
        if (computer === 1){ comp_choice = "Feuille"; } else if (computer === 2) { comp_choice = "Pierre"; } else { comp_choice = "Découpe"; }
        if (rand === 3){
            let quest = (prompt("Le Système essaie de vous supprimer ! \nChoisissez une attaque entre 1, 2 ou 3 ! \n(1:Feuille, 2:Pierre, 3:Découpe)")).toString();
            if ((quest === "1" && computer === 3) || (quest === "2" && computer === 1) || (quest === "3" && computer === 2)) {
                alert('Le Système avait "' + comp_choice + '". \nVous perdez un point, dommage.');
                score_equipe = score_equipe - 1;
            } else if ((quest === "3" && computer === 1) || (quest === "1" && computer === 2) || (quest === "2" && computer === 3)) {
                alert('Le Système avait "' + comp_choice + '". \nBravo, vous gagnez un point bonus !');
                score_equipe = score_equipe + 1;
            } else if ((quest === "1" && computer === 1) || (quest === "2" && computer === 2) || (quest === "3" && computer === 3)) {
                alert('Le système attaque comme vous. \nRien ne se passe.');
            } else {
                alert('Le système se demande si vous savez lire... \nVous perdez un point.');
                score_equipe = score_equipe - 1;
            }
        }
    }
}

function LoadEnd(dir){
    let element = grille[18][0];
    $('body').load('/load_room/' + element + "/" + dir + "/" + score_equipe);
}

function Start(x,y){
    let posx = x;
    let posy = y;
    score_equipe = 0;
    posy = posy + 1;
    if (CheckIfNotVoid(posx,posy)){
        LoadLaby(posx,posy,'s');
    }
}

function Left(x,y){
    let posx = x;
    let posy = y;
    posx = posx - 1;
    if (CheckIfNotVoid(posx,posy)){
        LoadLaby(posx,posy,'l');
    }
}

function Up(x,y){
    let posx = x;
    let posy = y;
    posy = posy - 1;
    if (CheckIfNotVoid(posx,posy)){
        LoadLaby(posx,posy,'u');
    }
}

function Down(x,y){
    let posx = x;
    let posy = y;
    posy = posy + 1;
    if (CheckIfNotVoid(posx,posy)){
        LoadLaby(posx,posy,'d');
    }
}

function Right(x,y){
    let posx = x;
    let posy = y;
    posx = posx + 1;
    if (CheckIfNotVoid(posx,posy)){
        LoadLaby(posx,posy,'r');
    }
}

function CheckIfNotVoid(x,y){
    try {
    if ((x===9 && y===3) && (!has_key)) {
        alert("La porte est verrouillée !");
        return false;
    }
    if (grille[y][x] === 0){
        alert("Impossible d'aller par là !");
        return false;
    } else {
        return true;
    }
    } catch (error) {
        alert("Impossible d'aller par là !");
        return false;
    }
}

function CheckIfClue(x,y){
    for (let i = 0; i < 18; i++) {
        if (JSON.stringify(indices[i]) === JSON.stringify([x,y])){
            if (JSON.stringify(indices[i]) === JSON.stringify([10, 12])){
                has_key = true;
            }
            return true;
        }
    }
}

function ShowClue(x,y){
    for (let i = 0; i < indices.length; i++) {
        if (JSON.stringify(indices[i]) === JSON.stringify([x,y])){
            console.log(i);
            return i;
        }
    }
}

