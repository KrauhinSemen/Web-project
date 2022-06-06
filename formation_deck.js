function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function delete_rules() {
    document.querySelector('p.text_rules').style.display = 'none'
    let y = 8;
}

function open_rules() {
    document.querySelector('p.text_rules').style.display = 'block';
    let y = 8;
}

function do_reset() {
    location.reload();
}

function do_close() {
    document.location.replace('#');
}

let cards = ["6-k", "7-k", "8-k", "9-k", "10-k", "11-k", "12-k", "13-k", "14-k",
    "6-b", "7-b", "8-b", "9-b", "10-b", "11-b", "12-b", "13-b", "14-b",
    "6-p", "7-p", "8-p", "9-p", "10-p", "11-p", "12-p", "13-p", "14-p",
    "6-c", "7-c", "8-c", "9-c", "10-c", "11-c", "12-c", "13-c", "14-c"];


shuffle(cards);

let trump_card = document.querySelector('img.trump_card');
let trump_fraction = cards[12].split('-')[1]
trump_card.src =`images/${cards[12]}.png`
trump_card = trump_card.style.transform = 'rotate(-90deg)';

[cards[12], cards[35]] = [cards[35], cards[12]];

document.querySelector('p.deck_info').textContent = cards.join(' ');

console.log(`Расположение карт : |${cards.join(' ')}|`);

let rules = document.querySelector('button.button_rules');
let text = document.querySelector('p.text_rules');
let reset = document.querySelector('button.reset');
let close_button = document.querySelector('button.close');
let exit = document.querySelector('button.exit');
document.addEventListener('keydown', function(event) {
    if (event.code == 'Escape') document.location.href = "#zatemnenie";
  });
rules.addEventListener('click', open_rules)
text.addEventListener('click', delete_rules);
reset.addEventListener('click', do_reset)
close_button.addEventListener('click', do_close);