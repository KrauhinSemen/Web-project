let deck_info = document.querySelector("p.deck_info").textContent.split(' ');
let enemy_info = document.querySelector("p.enemy_info");
let enemy_info_split = enemy_info.textContent.split(' ');

let player_card;
let enemy_card;

for (let i = 1; i < 7; i++) {
    player_card = document.querySelector(`img.player_card_${i}`);
    enemy_card = document.querySelector(`img.enemy_card_${i}`);

    if (player_card.style.opacity === '0' || player_card.style.opacity === '') {
        player_card.src = `images/${deck_info[(i-1)*2]}.png`;
        player_card.style.opacity = '1';
        player_card.id = deck_info[(i-1)*2]
    }

    if (enemy_card.style.opacity === '0' || enemy_card.style.opacity === '') {

        enemy_card.src = `images/card_reverse.png`;
        enemy_info_split[i-1] = deck_info[(i-1)*2 + 1];
        enemy_card.style.opacity = '1';
        enemy_card.id = deck_info[(i-1)*2 + 1]
    }
}

enemy_info.textContent = enemy_info_split.join(' ');

console.log(enemy_info)