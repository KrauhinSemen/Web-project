// function grouping_cards() {
//     console.log("group");
//     let count_cards = 0;
//     let i = 1;
//     while (true) {  // Считаем кол-во карт
//         let card = document.querySelector(`img.player_card_${i}`);
//         if (card === '') break;
//         if (card.style.opacity === "1") count_cards += 1;
//     }

//     let step = 50 / count_cards;
//     let current_stage = 70;

//     while (true) {
//         let card = document.querySelector(`img.player_card_${i}`);
//         if (card === '') break;
//         if (card.style.opacity === "1") {

//             card.style.right = `${current_stage}%`;
//             current_stage -= step;
//         }
//     }
// }