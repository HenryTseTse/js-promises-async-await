$(function () {
    let URL = 'https://deckofcardsapi.com/api/deck';

    // 1.
    async function drawCard() {
        let res = await axios.get(`${URL}/new/draw`);
        let {suit, value} = res.data.cards[0];
        console.log(`${value} of ${suit}`);
    }
    drawCard();

    // 2.
    async function drawCards() {
        let firstCard = await axios.get(`${URL}/new/draw`);
        let deckId = firstCard.data.deck_id;
        let secondCard = await axios.get(`${URL}/${deckId}/draw/`);
        [firstCard, secondCard].forEach(card => {
            let {suit, value} = card.data.cards[0];
            console.log(`${value} of ${suit}`);
        })
    }
    drawCards();

    // 3.
    async function setUp() {
        let $btn = $('button');
        let $cardArea = $('#cards-container');

        let deckData = await axios.get(`${URL}/new/shuffle/`);
        $btn.show().on('click', async function() {
            let cardData = await axios.get(`${URL}/${deckData.data.deck_id}/draw/`).catch((err) => {console.log("no more cards!")});
            $cardArea.append("<p>" + cardData.data.cards[0].value + " of " + cardData.data.cards[0].suit);
            if (cardData.data.remaining === 0) $btn.remove();
        });
    }
    setUp();
});