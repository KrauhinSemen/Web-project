let deck_info = document.querySelector("p.deck_info").textContent.split(' ');

let enemy_info = document.querySelector("p.enemy_info");
let enemy_info_split = [];

let player_info = document.querySelector("p.enemy_info");
let player_info_split = [];

let player_card;
let enemy_card;

let index_deck = 0;

function card_distribution() {
    for (let i = 1; i < 7; i++) {

        player_card = document.querySelector(`img.player_card_${i}`);
        enemy_card = document.querySelector(`img.enemy_card_${i}`);

        if (player_card.style.opacity === '0' || player_card.style.opacity === '') {
            player_card.src = `images/${deck_info[index_deck]}.png`;
            player_info_split.push(deck_info[index_deck]);
            player_card.style.opacity = '1';
            player_card.id = deck_info[index_deck];
            index_deck++;
        }

        if (enemy_card.style.opacity === '0' || enemy_card.style.opacity === '') {
            enemy_card.src = `images/card_reverse.png`;
            enemy_info_split.push(deck_info[index_deck]);
            enemy_card.style.opacity = '1';
            enemy_card.id = deck_info[index_deck];
            index_deck++;
        }
    }
}

// Начало
card_distribution()

enemy_info.textContent = enemy_info_split.join(' ');
player_info.textContent = enemy_info_split.join(' ');

console.log(`Карты противника: |${enemy_info.textContent}|`)