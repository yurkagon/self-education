function add(x: number, y: number): number {
    return x + y;
}

let myAdd = function(x: number, y: number): number { return x + y; };

let myAdd1: (x: number, y: number) => number = function(x: number, y: number): number { return x + y; };


function someFunc (a: number, b?: number): void {
    // ...
}
someFunc(1);
someFunc(1, 2);
// someFunc(1,2,3); // error

function buildName(firstName: string, ...restOfName: string[]): string {
    return firstName + " " + restOfName.join(" ");
}

function f(this: void) {
    // make sure `this` is unusable in this standalone function
}

{
    interface Card {
        suit: string;
        card: number;
    }
    interface Deck {
        suits: string[];
        cards: number[];
        createCardPicker(this: Deck): () => Card;
    }
    let deck: Deck = {
        suits: ["hearts", "spades", "clubs", "diamonds"],
        cards: Array(52),
        // NOTE: The function now explicitly specifies that its callee must be of type Deck
        createCardPicker: function(this: Deck) {
            return () => {
                let pickedCard = Math.floor(Math.random() * 52);
                let pickedSuit = Math.floor(pickedCard / 13);
    
                return {suit: this.suits[pickedSuit], card: pickedCard % 13};
            }
        }
    }
    
    let cardPicker = deck.createCardPicker();
    let pickedCard = cardPicker();
}

// overrides
{
    function pickCard(x: {suit: string; card: number; }[]): number;
    function pickCard(x: number): {suit: string; card: number; };
    function pickCard(x): any {
        // Check to see if we're working with an object/array
        // if so, they gave us the deck and we'll pick the card
        if (typeof x == "object") {
            let pickedCard = Math.floor(Math.random() * x.length);
            return pickedCard;
        }
    }
}