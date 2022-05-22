let card_on_field = [];
let card_on_field_2_level = [] // Это карты, которые покрывают другие
let table_current = [];


function move_player(event) {
    let id = event.target.id;

    let numbers_on_table = []

    if (document.querySelector(`img.${event.target.className}`).style.opacity === '0') return; // чтобы не выбирать дважды одну карту

    // Нужно добавить то, что карт можно больше выбирать при "подкидывании"
    card_on_field.forEach(function (card) { //Чтобы были только одного ранга карты
        numbers_on_table.push(card.split('-')[0])
    });

    card_on_field_2_level.forEach(function (card) {
        numbers_on_table.push(card.split('-')[0])
    });

    if (card_on_field.length === 0 || numbers_on_table.indexOf(id.split('-')[0]) !== -1) {
        for (let j = 1; j < 7; j++) { // Поиск первого незаполненого место карты поля для карты игрока
            let field_card = document.querySelector(`img.field_card_${j}`);
            if (field_card.style.opacity === "0" || field_card.style.opacity === '') {
                field_card.src = event.target.currentSrc;
                field_card.style.opacity = "1";
                card_on_field.push(id);
                document.querySelector(`img.${event.target.className}`).style.opacity = '0';
                document.querySelector(`img.${event.target.className}`).style.zIndex = '0';
                break;
            }
        }
    }
    console.log(card_on_field)
}

function move_field(event) {

    if (event.target.style.opacity === '0' || event.target.style.opacity === '') return;

    let id = event.target.id;

    for (let j = 1; j < 7; j++) { // Поиск первого незаполненого место для карты игрока для карты поля
        let player_card = document.querySelector(`img.player_card_${j}`);
        if (player_card.style.opacity === "0" || player_card.style.opacity === '') {
            player_card.src = event.target.currentSrc;
            player_card.style.opacity = "1";
            player_card.style.zIndex = "1"

            for (let k = card_on_field.indexOf(id) + 1; k < card_on_field.length; k++) { // была проблема с тем, когда убираю не крайнюю правую карту
                card_on_field[k - 1] = card_on_field[k]
            }
            card_on_field.splice(card_on_field.length - 1, 1);

            document.querySelector(`img.${event.target.className}`).style.opacity = "0";
            break;
        }
    }
    console.log(card_on_field)
}


function end_turn_attack() {
    // Получить список карт соперника
    let enemy_info_split_current = enemy_info_split;

    // Смог ли покрыться
    let enemy_pass_bad = false;
    let enemy_pass_good = true;

    card_on_field.forEach(function (card_field) {  // Сопоставляет каждой карте на поле карту противника, которую  может побить

        if (!table_current.includes(card_field)) {

            enemy_pass_good = false;
            let answer = [];
            let result = [' ', ' ', true, 20]; // [своя карта, вражеская, был ли козырь, разница]

            enemy_info_split_current.forEach(function (card_enemy) {

                if (!table_current.includes(card_enemy)) { // Убираем задействованные карты
                    let false_or_difference = can_beat_card(card_enemy, card_field);

                    if (false_or_difference[0]) {

                        answer = [card_field, card_enemy, true, false_or_difference[1]];

                        if (result[3] > answer[3] && result[2] !== false) {
                            result = answer;
                        }

                    } else if (false_or_difference[1]) {
                        answer = [card_field, card_enemy, false, false_or_difference[1]];

                        if (result[3] > answer[3] || result[2]) {
                            result = answer;
                        }
                    }
                }
            })

            console.log(`Результат сравнения: |${result}|`);

            if (result[1] !== ' ')
                card_on_field_2_level.push(result[1]); // обновляем карты 2 уровня

            table_current.push(result[0], result[1]); // обновляем таблицу задействованных карт

            if (result[1] === ' ') {
                enemy_pass_bad = true;
            }
        }
    });

    // Обновляем список карт в руке
    card_on_field.forEach(function (card_field) {
        player_info_split = player_info_split.filter(function (f) { return f !== card_field })
    })

    card_on_field_2_level.forEach(function (card_field) {
        enemy_info_split = enemy_info_split.filter(function (f) { return f !== card_field })
    })

    // Обновляем свойства на поле и тд
    for (let i = 1; i < card_on_field_2_level.length + 1; i++) {

        let above_card = document.querySelector(`img.field_card_${i}1`);
        above_card.src = `images/${card_on_field_2_level[i-1]}.png`;
        above_card.style.opacity = '1';
        above_card.style.zIndex = '1';
        above_card.id = card_on_field_2_level[i-1];

        let field_card = document.querySelector(`img.field_card_${i}`);
        field_card.style.zIndex = '0';

        let enemy_card = document.getElementById(card_on_field_2_level[i-1]);
        enemy_card.style.opacity = '0';
    }

    // Смотрим хороший пас или плохой
    if (enemy_pass_bad) {
        console.log('bad_pass');
        clear_table();
        new_cards_enemy_from_table();
        card_distribution();

        card_on_field_2_level = [];
        card_on_field = [];
        table_current = [];

        let no_cards = false;
        let i = 1;

        while (!no_cards) {
            let player_card = document.querySelector(`img.player_card_${i}`);
            let field_card = document.querySelector(`img.field_card_${i}`);

            if (player_card !== null) {
                player_card.addEventListener('click', move_player);
            } else if (field_card !== null) {
                field_card.addEventListener('click', move_field);
            } else {
                no_cards = true;
            }
            i++;
        }

        let button = document.querySelector("button.button");
        button.addEventListener('click', end_turn_attack)

        location_cards('player');
        location_cards('enemy');

        return;
    }

    if (enemy_pass_good) {
        console.log('good_pass');
        clear_table();
        redefinition_styles();
        card_distribution();

        card_on_field_2_level = [];
        card_on_field = [];
        table_current = [];

        let no_cards = false;
        let i = 1;

        while (!no_cards) {
            let player_card = document.querySelector(`img.player_card_${i}`);
            let field_card = document.querySelector(`img.field_card_${i}`);

            if (player_card !== null) { // Разве здесь не может быть так, чтобы выполнялось и то, и то условие? Вроде бы здесь некоторые карты поля могут не получить событие возвращения в коллоду
                player_card.addEventListener('click', move_player); 
            } else if (field_card !== null) {
                field_card.addEventListener('click', move_field);
            } else {
                no_cards = true;
            }
            i++;

            // писать защиту
        }

        let button = document.querySelector("button.button");
        button.addEventListener('click', end_turn_defense);

        location_cards('player');
        location_cards('enemy');

        enemy_move();

        return;
    }

    location_cards('player');
    location_cards('enemy');

    console.log(`Карты на поле: |${table_current}|`);
}

location_cards('player');
location_cards('enemy');

for (let i = 1; i < 7; i++) {
    let player_card = document.querySelector(`img.player_card_${i}`);
    let field_card = document.querySelector(`img.field_card_${i}`);
    player_card.addEventListener('click', move_player);
    field_card.addEventListener('click', move_field);
}

let button = document.querySelector("button.button_attack");
button.addEventListener('click', end_turn_attack)