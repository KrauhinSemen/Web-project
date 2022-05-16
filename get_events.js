let card_on_field = [];

function move_player(event) {
    let id = event.target.id;
    let numbers_on_table = []

    card_on_field.forEach(function(card) { //Чтобы были только одного ранга карты
        numbers_on_table.push(card.split('-')[0])
    });

    if (card_on_field.length === 0 || numbers_on_table.indexOf(id.split('-' )[0]) !== -1) {
        for (let j = 1; j < 7; j++) { // Поиск первого незаполненого место для карты поля
            let field_card = document.querySelector(`img.field_card_${j}`);
            if (field_card.style.opacity === "0" || field_card.style.opacity === '') {
                field_card.src = event.target.currentSrc;
                field_card.style.opacity = "1";
                card_on_field.push(id);
                document.querySelector(`img.${event.target.className}`).style.opacity = "0";
                break;
            }
        }
    }
    console.log(card_on_field)
}

function move_field(event) {
    let id = event.target.id;

    for (let j = 1; j < 7; j++) { // Поиск первого незаполненого место для карты поля
        let player_card = document.querySelector(`img.player_card_${j}`);
        if (player_card.style.opacity === "0" || player_card.style.opacity === '') {
            player_card.src = event.target.currentSrc;
            player_card.style.opacity = "1";

            card_on_field.splice(card_on_field.indexOf(id), 1);

            document.querySelector(`img.${event.target.className}`).style.opacity = "0";
            break;
        }
    }
    console.log(card_on_field)
}

function can_beat_card(card_from_above, card_on_field) {

    let number_above = card_from_above.split('-')[0];
    let fraction_above = card_from_above.split('-')[1];

    let number_field = card_on_field.split('-')[0];
    let fraction_field = card_on_field.split('-')[1];

    if (fraction_field === trump_fraction) {
        if (fraction_above === trump_fraction) {
            if (Number(number_above) > Number(number_field)) {
                return [false, Number(number_above) - Number(number_field)];
            } else {
                return [false, false];
            }
        } else {
            return [false, false];
        }
    } else {
        if (fraction_above === trump_fraction) {
            return [true, Number(number_above) - Number(number_field)];
        } else {
            if (fraction_field === fraction_above) {
                if (Number(number_above) > Number(number_field)) {
                    return [false, Number(number_above) - Number(number_field)];
                } else {
                    return [false, false];
                }
            } else {
                return [false, false];
            }
        }
    }
}

function end_turn() {

    let enemy_info_split_current = enemy_info_split;
    let table_current = [];

    card_on_field.forEach(function(card_field) {

        let answer = [];
        let result = [' ', ' ', true, 20];

        enemy_info_split_current.forEach(function(card_enemy) {

            let false_or_difference = can_beat_card(card_enemy, card_field);

            console.log(false_or_difference);

            if (false_or_difference[0]) {

                answer = [card_field, card_enemy, true, false_or_difference[1]];

                if (result[3] > answer[3] && result[2] !== false) {
                    result = answer;
                }

            } else if (false_or_difference[1]) {
                answer = [card_field, card_enemy, false, false_or_difference[1]];

                if (result[3] > answer[3]) {
                    result = answer;
                }
            }
        })

        enemy_info_split_current.splice(enemy_info_split_current.indexOf(result[1]), 1);
        console.log(enemy_info_split_current);

        table_current.push([result[0], result[1]]);

    });

    console.log(table_current);

    if (table_current.length === card_on_field.length){

        let i = 1;
        table_current.forEach(function(cards) {

            let above_card = document.querySelector(`img.field_card_${i}1`);
            let field_card = document.querySelector(`img.field_card_${i}`);

            above_card.src = `images/${cards[1]}.png`;
            above_card.style.opacity = '1';
            above_card.style.zIndex = '2';

            field_card.style.zIndex = '1';

            i = i+1;
        })
    }
}


for (let i = 1; i < 7; i++) {
    let player_card = document.querySelector(`img.player_card_${i}`);
    let field_card = document.querySelector(`img.field_card_${i}`);
    player_card.addEventListener('click', move_player);
    field_card.addEventListener('click', move_field);
}

let button = document.querySelector("button.button");

button.addEventListener('click', end_turn)