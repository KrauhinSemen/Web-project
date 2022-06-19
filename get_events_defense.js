function enemy_move() {
    let who_move = document.querySelector('p.who_move');
    who_move.textContent = 'Ход противника';
    who_move.style.color = 'red';

    let count_free_fields = 6 - Math.max(card_on_field.length, (6 - player_info_split.length)); // количество свободных карт поля
    if (count_free_fields === 0) return;

    let values_on_field = []
    for (let i = 0; i < card_on_field.length; i++) {
        let card_value_1_level = Number(card_on_field[i].split('-')[0]);
        let card_value_2_level = Number(card_on_field_2_level[i].split('-')[0]);
        if (values_on_field.indexOf(card_value_1_level) === -1) values_on_field[values_on_field.length] = card_value_1_level;
        if (values_on_field.indexOf(card_value_2_level) === -1) values_on_field[values_on_field.length] = card_value_2_level;
    }

    let min_trump = ''; // минимальный козырь, приоритет 3
    let multi_values = []; // парные карты без козыря, приоритет 1
    let count_multi_pars = []
    let min_card = ''; // минимальная карта, приоритет 2
    let answer = [];

    // Заполнение информации о картах игрока
    let trump = document.querySelector('img.trump_card').src.split('/').pop().split('-')[1].substring(0, 1);
    for (let i = 0; i < enemy_info_split.length; i++) {
        let card_split = enemy_info_split[i].split('-');
        if (card_split[1] === trump) {
            if (min_trump === '' || Number(card_split[0]) < Number(min_trump.split('-')[0])) {
                min_trump = enemy_info_split[i];
            }
            continue;
        }

        if (min_card === '' || Number(card_split[0]) < Number(min_card.split('-')[0])) {
            min_card = enemy_info_split[i];
        }

        let card_value = Number(card_split[0]);
        if (multi_values.indexOf(card_value) === -1) {
            multi_values[multi_values.length] = card_value;
            count_multi_pars[count_multi_pars.length] = 1;
            continue;
        }
        for (let j = 0; j < multi_values.length; j++) {
            if (multi_values[j] === card_value) {
                count_multi_pars[j] += 1;
                break;
            }
        }
    }

    // Ответ игроку
    if (min_card === '' && (values_on_field.indexOf(Number(min_trump.split("-")[0])) !== -1 || values_on_field.length === 0)) {
        answer[0] = min_trump
    }
    else {
        for (let i = 0; i < multi_values.length; i++) {
            if (((multi_values[i] <= 10 && multi_values[i] - Number(min_card.split('-')[0]) <= 3) || multi_values[i] - Number(min_card.split('-')[0]) <= 2)
                && count_multi_pars[i] > 1 && count_multi_pars[i] + answer.length <= count_free_fields
                && (values_on_field.indexOf(multi_values[i]) !== -1 || (values_on_field.length === 0 && answer.length === 0))) {
                if (answer.length === 0 || Number(answer[0].split('-')[0]) > multi_values[i]) {
                    answer = [];
                    for (let j = 0; j < enemy_info_split.length; j++) {
                        if (Number(enemy_info_split[j].split('-')[0]) === multi_values[i] && enemy_info_split[j].split('-')[1] !== trump) {
                            answer[answer.length] = enemy_info_split[j];
                        }
                    }
                }
            }
        }
        if (answer.length === 0 && (values_on_field.indexOf(Number(min_card.split("-")[0])) !== -1 || values_on_field.length === 0)) answer[0] = min_card;
    }

    // Заполнение информации о картах на поле и в колоде противника
    for (let i = 0; i < answer.length; i++) {
        card_on_field.push(answer[i])

        let enemy_card = document.getElementById(answer[i]);
        enemy_card.style.opacity = '0'
    }

    let new_enem_cards = [];
    for (let i = 0; i < enemy_info_split.length; i++) {
        if (answer.indexOf(enemy_info_split[i]) === -1) new_enem_cards[new_enem_cards.length] = enemy_info_split[i];
    }

    enemy_info_split = new_enem_cards;
    document.querySelector("p.enemy_info").textContent = enemy_info_split.join(' ');

    console.log("enem_cards", enemy_info_split);
    console.log("min_card", min_card);
    console.log("min_trump", min_trump);
    console.log("par_val", multi_values);
    console.log("count_par_card", count_multi_pars);
    console.log("answer", answer);

    // Расстановка карт на поле
    for (let i = 1; i < 7; i++) {
        let fiel_card = document.querySelector(`img.field_card_${i}`);
        if (fiel_card.style.opacity === '0' || fiel_card.style.opacity === '') {
            fiel_card.style.opacity = '1';
            let id = answer.shift();
            fiel_card.src = `images/${id}.png`;
            fiel_card.id = id;
        }
        if (answer.length === 0) break;
    }
}

function end_turn_defense() {
    console.log('defense')

    if (current_card !== null) {
        current_card.style.top = '75%';
        current_card.style.zIndex = '0';
    }

    // Обновляем список карт в руке
    card_on_field_2_level.forEach(function (card_field) {
        player_info_split = player_info_split.filter(function (f) { return f !== card_field })
    })

    card_on_field.forEach(function (card_field) {
        enemy_info_split = enemy_info_split.filter(function (f) { return f !== card_field })
    })

    // Смотрим хороший пас или плохой
    if (card_on_field.length > card_on_field_2_level.length) {
        good_for_enemy(true, true)
        return;
    } else {

        enemy_move();

        // Обновляем список карт в руке
        card_on_field_2_level.forEach(function (card_field) {
            player_info_split = player_info_split.filter(function (f) { return f !== card_field })
        })

        card_on_field.forEach(function (card_field) {
            enemy_info_split = enemy_info_split.filter(function (f) { return f !== card_field })
        })

        location_cards('player');
        location_cards('enemy');

        if (card_on_field.length === card_on_field_2_level.length) {
            document.querySelector('img.bito_card').style.opacity = '1';
            good_for_player(false, true)
            return;
        }
    }

    console.log(`Карты на поле: |${card_on_field.concat(card_on_field_2_level)}|`);
}

function select_current_card(event) {

    if (current_card !== null) {
        current_card.style.top = '75%';
    }

    current_card = event.target;
    current_card.style.top = '70%';
}

function move_player_current_card(event) {
    if (card_on_field_2_level.indexOf(current_card.id) !== -1) return;
    let card = event.target;
    let result = can_beat_card(current_card.id, card.id);

    if (card.style.opacity === '1' && current_card !== null && result[1] !== false) {
        let number = card.className[11];
        let field_card_1 = document.querySelector(`img.field_card_${number}`);
        let field_card_2 = document.querySelector(`img.field_card_${number}1`);

        field_card_2.src = current_card.currentSrc;
        field_card_2.style.opacity = "1";

        card_on_field_2_level.push(current_card.id);

        document.querySelector(`img.${current_card.className}`).style.opacity = '0';
        document.querySelector(`img.${current_card.className}`).style.top = '75%';

        document.querySelector(`img.${field_card_1.className}`).style.zIndex = '0';

        field_card_2.addEventListener('click', move_field_current_card)
    }
}

function move_field_current_card(event) {

    let card = event.target;

    if (card.style.opacity === '1') {
        for (let j = 1; j < 7; j++) { // Поиск первого незаполненого место для карты игрока для карты поля
            let player_card = document.querySelector(`img.player_card_${j}`);
            if (player_card.style.opacity === "0" || player_card.style.opacity === '') {
                player_card.src = event.target.currentSrc;
                player_card.style.opacity = "1";
                player_card.style.display = null;
                player_card.style.zIndex = "1"

                for (let k = card_on_field.indexOf(card.id) + 1; k < card_on_field.length; k++) {
                    card_on_field[k - 1] = card_on_field[k]
                }
                card_on_field_2_level.splice(card_on_field_2_level.length - 1, 1);

                document.querySelector(`img.${card.className}`).style.opacity = "0";
                document.querySelector(`img.${card.className}`).style.zIndex = "0";

                document.querySelector(`img.${card.className.substring(0, card.className.length - 1)}`).style.zIndex = "1";

                break;
            }
        }
    }
}