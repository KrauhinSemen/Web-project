let deck_info = document.querySelector("p.deck_info").textContent.split(' ');

let enemy_info = document.querySelector("p.enemy_info");
let enemy_info_split = [];

let player_info = document.querySelector("p.enemy_info");
let player_info_split = [];

let player_card;
let enemy_card;

let index_deck = 0;

let card_on_field = [];
let card_on_field_2_level = [] // Это карты, которые покрывают другие
let table_current = [];

let current_card = null;

function card_distribution() {

    for (let i = 1; i < 36; i++) {

        if (index_deck > 35) break;

        player_card = document.querySelector(`img.player_card_${i}`);
        enemy_card = document.querySelector(`img.enemy_card_${i}`);

        if (player_card !== null && (player_card.style.opacity === '0' || player_card.style.opacity === '')) {
            player_card.src = `images/${deck_info[index_deck]}.png`;
            if (player_info_split.length < 6)
                player_card.style.opacity = '1';
            player_info_split.push(deck_info[index_deck]);
            player_card.style.zIndex = '1';
            player_card.id = deck_info[index_deck];
            index_deck++;
            check_colode();
        }
        if (index_deck > 35) break;

        if (enemy_card !== null && (enemy_card.style.opacity === '0' || enemy_card.style.opacity === '')) {
            enemy_card.src = `images/card_reverse.png`;
            if (enemy_info_split.length < 6)
                enemy_card.style.opacity = '1';
            enemy_info_split.push(deck_info[index_deck]);
            enemy_card.id = deck_info[index_deck];
            index_deck++;
            check_colode();
        }
    }

    if (index_deck > 35) { // Определение победителя
        if (enemy_info_split.length === 0 && player_info_split.length === 0) {
            get_winner('В ожесточённой борьбе умов победителем никто не вышел');
            return;
        }
        else if (enemy_info_split.length === 0 && player_info_split.length !== 0) {
            get_winner('Победил Искусственный Интеллект');
            return;
        }
        else if (enemy_info_split.length !== 0 && player_info_split.length === 0) {
            get_winner('Победил человеческий разум');
            return
        }
    }

    change_display_player_cards();
    change_deck_counter();
}

// Начало
card_distribution()
location_cards('player');
location_cards('enemy');

enemy_info.textContent = enemy_info_split.join(' ');
player_info.textContent = enemy_info_split.join(' ');

console.log(`Карты противника: |${enemy_info.textContent}|`)

// Распределение, кто первый ходит
let coin = Math.floor(Math.random() * 2); // 0 - player, 1 - enemy

if (coin === 0) {
    console.log('Игрок начинает первый')

    for (let i = 1; i < 7; i++) {
        let player_card = document.querySelector(`img.player_card_${i}`);
        let field_card = document.querySelector(`img.field_card_${i}`);
        player_card.addEventListener('click', move_player);
        field_card.addEventListener('click', move_field);
    }

    let button = document.querySelector("button.button");
    button.addEventListener('click', end_turn_attack)
} else {
    console.log('Противник начинает первый')

    for (let i = 1; i < 7; i++) {
        let player_card = document.querySelector(`img.player_card_${i}`);
        let field_card = document.querySelector(`img.field_card_${i}`);
        player_card.addEventListener('click', select_current_card);
        field_card.addEventListener('click', move_player_current_card);
    }

    let button = document.querySelector("button.button");
    button.addEventListener('click', end_turn_defense);

    enemy_move();
}