function change_deck_counter() { // Изменение счётчика оставшихся в колоде карт
    let counter = document.querySelector('p.deck_counter');
    let count_cards = 36 - index_deck;
    if ((count_cards>20 || count_cards <10) && count_cards%10 === 1) counter.textContent = `${count_cards} карта`;
    else if ((count_cards>20 || count_cards <10) && count_cards%10 < 5 &&  count_cards%10 > 1) counter.textContent = `${count_cards} карты`;
    else counter.textContent = `${count_cards} карт`;
}

function get_winner(winner) {  //  Определение противника
    document.location.href = "#zatemnenie_winner";
    document.querySelector('p.who_winner').textContent = winner;
}

function change_display_player_cards() { // присваивает "style.display ='none'" всем картам игрока с opacity = 0 и наоборот
    for (let i = 1; i < 36; i++) {
        let player_card = document.querySelector(`img.player_card_${i}`);
        if (player_card === null) continue;
        if (player_card.style.opacity !== "1") player_card.style.display = 'none';
        else if (player_card.style.opacity === "1") player_card.style.display = null;
    }
}

function check_colode() {
    let count_cards = 36 - index_deck;
    if (count_cards <= 6) document.querySelector('img.deck').src = 'images/coloda.png';
    else if (count_cards <= 12) document.querySelector('img.deck').src = 'images/coloda.png';
    else if (count_cards <= 18) document.querySelector('img.deck').src = 'images/coloda.png';
    else if (count_cards <= 24) document.querySelector('img.deck').src = 'images/coloda.png';
    if (index_deck === 35) document.querySelector('img.deck').style.display ='none';
    if (index_deck === 36) document.querySelector('img.trump_card').style.display ='none';
}

function location_card_on_field() {
    for (let j = 1; j < 7; j++) {
        let card = document.querySelector(`img.field_card_${j}`);
        card.style.opacity = '0';
    }

    card_on_field.forEach(function (card) {
        for (let j = 1; j < 7; j++) {
            let card_on_field = document.querySelector(`img.field_card_${j}`);
            if (card_on_field.style.opacity !== '1') {
                card_on_field.src = `images/${card}.png`;
                card_on_field.style.opacity = '1';
                break;
            }
        }
    });
}

function location_cards(player_or_enemy) {

    let count;
    let step;
    let current_stage;

    if (player_or_enemy === 'player') {
        count = player_info_split.length ;
    } else {
        count = enemy_info_split.length;
    }

    switch (true) {
        case count < 7:
            step = 3.5
            break
        case count < 10:
            step = 3
            break
        case count < 12:
            step = 2.5
            break
        case count < 14:
            step = 2
            break
        case count < 16:
            step = 1.5
            break
        case count > 15:
            step = 1
            break
    }

    current_stage = 45 + (count - 1) * step ;

    for (let i = 1; i < count + 1; i++ ) {
        let card = document.querySelector(`img.${player_or_enemy}_card_${i}`);
        if (card.style.opacity !== '0') {
            card.style.right = `${current_stage}%`;
            current_stage -= step * 2;
        } else {
            count++;
        }
    }
}

function clear_table() {
    for (let i = 1; i < 7; i++) {
        let card_on_field_1 = document.querySelector(`img.field_card_${i}`);
        let card_on_field_2 = document.querySelector(`img.field_card_${i}1`);

        card_on_field_1.src = `images/card_reverse.png`;
        card_on_field_1.style.opacity = '0';
        card_on_field_1.style.zIndex = '1';

        card_on_field_2.src = `images/card_reverse.png`;
        card_on_field_2.style.opacity = '0';
        card_on_field_2.style.zIndex = '0';
    }
}

function redefinition_styles(is_player) {
    let i = 0;
    let enemy_or_player_card;
    let enemy_or_player_info;

    while (true) {
        if (is_player) {
            enemy_or_player_card = document.querySelector(`img.player_card_${i+1}`);
            enemy_or_player_info = player_info_split;
        } else {
            enemy_or_player_card = document.querySelector(`img.enemy_card_${i+1}`);
            enemy_or_player_info = enemy_info_split;
        }

        if (i < enemy_or_player_info.length) {
            enemy_or_player_card.id = enemy_or_player_info[i];
            enemy_or_player_card.style.opacity = '1';
            enemy_or_player_card.style.zIndex = '1';
            if (is_player)
                enemy_or_player_card.src = `images/${enemy_or_player_card.id}.png`;
        } else {
            if (enemy_or_player_card === null) {
                break
            } else if (i > 5){
                enemy_or_player_card.remove();
            } else {
                enemy_or_player_card.style.opacity = '0';
            }
        }
        i++;
    }
}

function new_cards_enemy_from_table(is_player) {

    let new_card;
    let max_cards;
    let new_cards = card_on_field.concat(card_on_field_2_level);

    if (is_player)
        max_cards = player_info_split.length + new_cards.length * 2;
    else
        max_cards = enemy_info_split.length + new_cards.length * 2;

    new_cards.forEach(function (card_field) {
        if (is_player)
            player_info_split.push(card_field)
        else
            enemy_info_split.push(card_field)

        for (let i = 1; i < max_cards; i++) {
            let card;

            if (is_player)
                card = document.querySelector(`img.player_card_${i}`)
            else
                card = document.querySelector(`img.enemy_card_${i}`)

            if (card === null) {
                new_card = document.createElement("img");
                if (is_player) {
                    new_card.className = `player_card_${i}`
                    new_card.style.height = '165px';
                    new_card.style.wight = '115px';
                    new_card.style.top = '75%';
                    new_card.style.right = '35%';
                    new_card.style.zIndex = '1';
                    new_card.src = `images/${card_field}.png`;
                } else {
                    new_card.className = `enemy_card_${i}`
                    new_card.style.right = '35%';
                    new_card.src = `images/card_reverse.png`;
                }

                new_card.style.position = 'absolute';
                new_card.style.opacity = '1';
                new_card.id = card_field;

                if (is_player)
                    document.getElementById("player_cards").appendChild(new_card);
                else
                    document.getElementById("enemy_cards").appendChild(new_card);

                max_cards++;
                break
            } else if (card.style.opacity === '0') {
                card.style.opacity = '1';
                max_cards++;
                break
            }
        }
    })
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

function good_for_player(is_attack, is_player_takes) { // хорошее отбитие или противник взял

    console.log('bad_pass');

    let who_move = document.querySelector('p.who_move');
    who_move.textContent = 'Ход игрока';
    who_move.style.color = 'yellowgreen';

    clear_table();

    if (is_attack)
        new_cards_enemy_from_table(is_player_takes);

    redefinition_styles(true);
    redefinition_styles(false);

    card_distribution();

    card_on_field_2_level = [];
    card_on_field = [];
    table_current = [];

    let no_cards = [false, false];
    let i = 1;

    while (!(no_cards[0] && no_cards[1])) {
        let player_card = document.querySelector(`img.player_card_${i}`);
        let field_card = document.querySelector(`img.field_card_${i}`);
        let field_card_2 =  document.querySelector(`img.field_card_${i}1`);

        if (player_card !== null) {
            player_card.removeEventListener('click', select_current_card);
            player_card.addEventListener('click', move_player);
        } else {
            no_cards[0] = true
        }
        if (field_card !== null) {
            field_card.removeEventListener('click', move_player_current_card);
            field_card.addEventListener('click', move_field);
        }
        if (field_card_2 !== null) {
            field_card.removeEventListener('click', move_field_current_card);
        } else {
            no_cards[1] = true
        }
        i++;
    }

    let button = document.querySelector("button.button");
    button.removeEventListener('click', end_turn_defense);
    button.addEventListener('click', end_turn_attack)

    location_cards('player');
    location_cards('enemy');
}

function good_for_enemy(is_attack, is_player_takes) { // хорошее отбитие или игрок взял
    console.log('good_pass');
    clear_table();

    if (is_attack)
        new_cards_enemy_from_table(is_player_takes);

    redefinition_styles(true);
    redefinition_styles(false);

    card_distribution();


    card_on_field_2_level = [];
    card_on_field = [];
    table_current = [];

    let no_cards = [false, false];
    let i = 1;

    while (!(no_cards[0] && no_cards[1])) {
        let player_card = document.querySelector(`img.player_card_${i}`);
        let field_card = document.querySelector(`img.field_card_${i}`);

        if (player_card !== null) {
            player_card.removeEventListener('click', move_player);
            player_card.addEventListener('click', select_current_card);
        } else {
            no_cards[0] = true
        }
        if (field_card !== null) {
            field_card.removeEventListener('click', move_field);
            field_card.addEventListener('click', move_player_current_card);
        } else {
            no_cards[1] = true
        }
        i++;
    }

    let button = document.querySelector("button.button");
    button.removeEventListener('click', end_turn_attack);
    button.addEventListener('click', end_turn_defense);

    console.log(player_info_split, enemy_info_split)

    location_cards('player');
    location_cards('enemy');

    enemy_move();
}