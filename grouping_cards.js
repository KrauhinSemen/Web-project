function grouping_cards(colode_cards) {
    console.log("group");
    let count_cards = 0;
    let i = 1;
    while (true) {  // Считаем кол-во карт
        let card = document.querySelector(`img.${colode_cards}_${i}`);
        if (card === null) break;
        if (card.style.opacity === "1") count_cards += 1;
        i++;
    }

    let step = (50 - count_cards) / 2;
    let current_stage = 70 - step;
    i = 1

    while (true) { // расстановка карт
        let card = document.querySelector(`img.${colode_cards}_${i}`);
        if (card === null) break;
        if (card.style.opacity === "1") {
            card.style.right = `${current_stage}%`;
            current_stage -= 1;
        }
        i++;
    }
}