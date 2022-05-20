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

function new_cards_enemy_from_table() {

    let new_card;
    let new_cards = card_on_field.concat(card_on_field_2_level);
    let max_cards = enemy_info_split.length + new_cards.length * 2;

    console.log(new_cards)

    new_cards.forEach(function (card_field) {
        enemy_info_split.push(card_field)

        for (let i = 1; i < max_cards; i++) {
            let card = document.querySelector(`img.enemy_card_${i}`);

            if (card === null) {
                new_card = document.createElement("img");
                new_card.className = `enemy_card_${i}`;
                new_card.style.right = '35%';
                new_card.style.position = 'absolute';
                new_card.style.opacity = '1';
                new_card.src = `images/card_reverse.png`;

                document.getElementById("body").appendChild(new_card);

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