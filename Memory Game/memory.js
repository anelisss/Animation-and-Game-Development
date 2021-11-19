class Card {
    image
    hasFaceUp = false

    constructor(image) {
        this.image = image
    }
    turnFaceUp() {
        this.hasFaceUp = true
    }
    turnFaceDown() {
        this.hasFaceUp = false
    }
}

class Game {
    cards = []

    constructor(cards) {
        //am pus de doua ori array-ul de 12 carti. pt a fi 24 (cu pereche)
        this.cards = cards
    }

    shuffle() {
        this.cards.sort(
            () => Math.random() - 0.5
        )
    }

    isOver() {
        return this.cards.every(
            (card) => card.hasFaceUp
        )
    }
}

class Dealer {
    game
    //ultima sau ultimele 2 carti care sunt active in joc (cu fata in sus).
    activeCards = []

    constructor(game) {
        this.game = game
        game.shuffle()

    }

    turnCard(card) {
        // daca sunt deja 2 active
        // sau jocul s-a terminat
        // sau cartea este deja pe fata 
        // atunci nu mai intoarce nimic
        if(this.activeCards.length == 2 
            || this.game.isOver()
            || card.hasFaceUp
        ) {
            return
        }
        card.turnFaceUp()
        // tin minte cartea pe care am deschis-o
        this.activeCards.push(card)
        // daca sunt doua carti active
        if (this.activeCards.length == 2) {
            // daca au aceeasi imag
            if (this.activeCards[0].image == this.activeCards[1].image) {
                this.activeCards = []
                return
            }
            // daca nu au aceeasi imag, le ascund dupa 1 sec
            setTimeout(this.hideCards, 1000)
        }
    }

    // definesc ca arrow function ca sa pot folosi functia
    // direct in setTimeout
    // (functiile arrow sunt bind-uite la this)
    hideCards = () => {
        this.activeCards.forEach(
            (card) => card.turnFaceDown()
        )
        // resetez lista de carti active. e goala
        this.activeCards = []
    }
}

new Vue({
    el: '#app',
    data() {
        return {
            dealer: new Dealer(
                new Game(
                    [
                        new Card('bear.png'),
                        new Card('corgi.png'),
                        new Card('crab.png'),
                        new Card('fish.png'),
                        new Card('panda.png'),
                        new Card('parrot.png'),
                        new Card('pig.png'),
                        new Card('rabbit.png'),
                        new Card('rhinoceros.png'),
                        new Card('shark.png'),
                        new Card('snail.png'),
                        new Card('turtle.png'),
                        new Card('bear.png'),
                        new Card('corgi.png'),
                        new Card('crab.png'),
                        new Card('fish.png'),
                        new Card('panda.png'),
                        new Card('parrot.png'),
                        new Card('pig.png'),
                        new Card('rabbit.png'),
                        new Card('rhinoceros.png'),
                        new Card('shark.png'),
                        new Card('snail.png'),
                        new Card('turtle.png'),
                    ]
                )
            )
        }
    },
    template: `
    <div class='game'>
        <div 
            v-for="card in dealer.game.cards"
            :class="{card, faceUp: card.hasFaceUp}"
            @click="click(card)"
        >
        <img :src="'img/icons8-' + card.image">
        </div>
    </div>
    `,
    methods: {
        click(card) {
            this.dealer.turnCard(card)
        }
    },
})