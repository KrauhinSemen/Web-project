let card_on_field = []; // Можно попробовать менять элементы, когда их бьют карты противника !!!
let card_on_field_2_level = [] // Это карты, которые покрывают другие
let table_current = [];

function move_player(event) {
    let id = event.target.id;
    let numbers_on_table = []

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
                document.querySelector(`img.${event.target.className}`).style.opacity = "0";
                break;
            }
        }
    }
    console.log(card_on_field)
}

function move_field(event) {
    let id = event.target.src.split('/').pop().split(".")[0]  // event.target.id; Не знаю почему, но этот вариант часто выдаёт "", вместо src

    if (card_on_field.indexOf(id) < card_on_field_2_level.length) return;

    for (let j = 1; j < 7; j++) { // Поиск первого незаполненого место для карты игрока для карты поля
        let player_card = document.querySelector(`img.player_card_${j}`);
        if (player_card.style.opacity === "0" || player_card.style.opacity === '') {
            player_card.src = event.target.currentSrc;
            player_card.style.opacity = "1";

            //  card_on_field.splice(card_on_field.indexOf(id), 1);
            for (let k=card_on_field.indexOf(id) + 1; k<card_on_field.length; k++) { // была проблема с тем, когда убираю не крайнюю правую карту
                card_on_field[k-1] = card_on_field[k]
            }
            card_on_field.splice(card_on_field.length-1, 1);

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

function clear_table() {
    for (let i = 1; i < 7; i++) {
        let card_on_field_1 = document.querySelector(`img.field_card_${i}`);
        let card_on_field_2 = document.querySelector(`img.field_card_${i}1`);

        card_on_field_1.src = `images/card_reverse.png`;
        card_on_field_1.style.opacity = '0';

        card_on_field_2.src = `images/card_reverse.png`;
        card_on_field_2.style.opacity = '0';
    }
}

function new_cards_enemy_from_table() {

    // Тебе дописать
}

function end_turn() {
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

            card_on_field_2_level.push(result[1]); // обновляем карты 2 уровня

            table_current.push(result[0], result[1]); // обновляем таблицу задействованных карт

            if (result[1] === ' ') {
                enemy_pass_bad = true;
            }
        }
    });

    // Обновляем список карт в руке
    card_on_field.forEach(function (card_field) {
        player_info_split = player_info_split.filter(function(f) { return f !== card_field })
    })

    card_on_field_2_level.forEach(function (card_field) {
        enemy_info_split = enemy_info_split.filter(function(f) { return f !== card_field })
    })


    // Смотрим хороший пас или плохой
    if (enemy_pass_bad){
        console.log('bad_pass');
        clear_table();
        card_distribution();
        new_cards_enemy_from_table();
        return;
    }

    if (enemy_pass_good){
        console.log('good_pass');
        clear_table();
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
                player_card.addEventListener('click', move_player); // поменять
            } else if (field_card !== null) {
                field_card.addEventListener('click', move_field); // поменять
            } else {
                no_cards = true;
            }
            i++;
        }

        for (let i = 1; i < 7; i++) {
            let above_card = document.querySelector(`img.field_card_${i}1`);
            let field_card = document.querySelector(`img.field_card_${i}`);

            above_card.style.zIndex = '1';
            field_card.style.zIndex = '2';
        }

        let button = document.querySelector("button.button"); // поменять
        button.addEventListener('click', end_turn) // поменять

        return;
    }

    console.log(`Карты на поле: |${table_current}|`);

    let i = 1;
    card_on_field_2_level.forEach(function (card) {

        let above_card = document.querySelector(`img.field_card_${i}1`);
        let field_card = document.querySelector(`img.field_card_${i}`);
        let enemy_card = document.querySelector(`img.enemy_card_${i}`);


        above_card.src = `images/${card}.png`;
        above_card.style.opacity = '1';
        above_card.style.zIndex = '2';

        field_card.style.zIndex = '1';

        enemy_card.style.opacity = '0';

        i = i + 1;
    })
}


for (let i = 1; i < 7; i++) {
    let player_card = document.querySelector(`img.player_card_${i}`);
    let field_card = document.querySelector(`img.field_card_${i}`);
    player_card.addEventListener('click', move_player);
    field_card.addEventListener('click', move_field);
}

let button = document.querySelector("button.button");
button.addEventListener('click', end_turn)