function enemy_move() {
    let enem_cards = enemy_info_split;
    let min_trump = ''; // минимальный козырь, приоритет 3
    let par_val = []; // парные карты без козыря, приоритет 1
    let count_par_card = []
    let min_card = ''; // минимальная карта, приоритет 2
    let answer = [];
    let trump = document.querySelector('img.trump_card').src.split('/').pop().split('-')[1].substring(0, 1);
    for (let i = 0; i < enem_cards.length; i++) {
        let card_split = enem_cards[i].split('-');
        if (card_split[1] === trump) {
            if (min_trump === '' || Number(card_split[0]) < Number(min_trump.split('-')[0])) {
                min_trump = enem_cards[i];
            }
            continue;
        }

        if (min_card === '' || Number(card_split[0]) < Number(min_card.split('-')[0])) {
            min_card = enem_cards[i];
        }

        let card_val = Number(card_split[0]);
        if (par_val.indexOf(card_val) === -1) {
            par_val[par_val.length] = card_val;
            count_par_card[count_par_card.length] = 1;
            continue;
        }
        for (let j = 0; j < par_val.length; j++) {
            if (par_val[j] === card_val) {
                count_par_card[j] += 1;
                break;
            }
        }
    }
    
    for (let i=1; i<7; i++ ) {
        let fiel_card = document.querySelector(`img.field_card_${i}`);
        if (fiel_card.style.opacity === '0' || fiel_card.style.opacity === '') {
            fiel_card.style.opacity = '1';
            if (min_card !== '') fiel_card.src = `images/${min_card}.png`;
            else fiel_card.src = `images/${min_trump}.png`;
            break;
        }
    }
}

function end_turn_defense() {


    // я буду здесь
}

let button_def = document.querySelector("button.button_defence");
button_def.addEventListener('click', enemy_move)