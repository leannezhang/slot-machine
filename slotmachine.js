const FIRST_ITEMS = ['Coffee Maker', 'Teapot', 'Espresso Machine'];
const SECOND_ITEMS = ['Coffee Filter', 'Tea Strainer', 'Espresso Tamper'];
const THIRD_ITEMS = ['Coffee Grounds', 'Loose Tea', 'Espresso Beans'];
const PRIZES = ['coffee', 'tea', 'espresso'];
const REEL_HEIGHT = 64;
const TEXT_CONGRATS = 'Congratulations! You won a cup of ';
const TEXT_TRY_AGAIN = 'Busted! Please try again!';

// animation properties
const FIRST_MAXSPIN_POS = 1920; //predefined spin pos for first reel
const SECOND_MAXSPIN_POS = 2112; //predefined spin pos for 2nd reel
const THIRD_MAXSPIN_POS = 2304; //predefined spin pos for third reel

// Reel has 3 items
function Reel(items, time) {
    this.items = items;
};

Reel.prototype.randomSelect = function() {
    return Math.floor(Math.random() * this.items.length);
};

// Slot machine contains 3 slots
function SlotMachine(firstItems, secondItems, thirdItems) {
    this.firstReel = new Reel(firstItems);
    this.secondReel = new Reel(secondItems);
    this.thirdReel = new Reel(thirdItems);
    this.results = [];
};

// Randomly select the item and save the item index
SlotMachine.prototype.start = function() {
    this.results.push(this.firstReel.randomSelect());
    this.results.push(this.secondReel.randomSelect());
    this.results.push(this.thirdReel.randomSelect());
    console.log('Your result is ' + FIRST_ITEMS[this.results[0]] + ', ' +
        SECOND_ITEMS[this.results[1]] + ', ' +
        THIRD_ITEMS[this.results[1]]);
};

SlotMachine.prototype.reset = function() {
    this.results.length = 0;
};

SlotMachine.prototype.declareWinner = function() {
    let resultDiv = document.querySelector('.result');

    if (sameValues(this.results)) {
        let luckyIndex = this.results[0];
        resultDiv.textContent = TEXT_CONGRATS + PRIZES[luckyIndex] + '.';
    } else {
        resultDiv.textContent = TEXT_TRY_AGAIN;
    }
};

SlotMachine.prototype.spinReels = function() {
    let pos = 0;
    let count = 0;
    let delay = 0;

    let reel1 = document.querySelector('.reel-1');
    let reel1_selectedIndex = this.results[0];

    let reel2 = document.querySelector('.reel-2');
    let reel2_selectedIndex = this.results[1];

    let reel3 = document.querySelector('.reel-3');
    let reel3_selectedIndex = this.results[2];

    let intervalId = setInterval((function() {spinMe(reel1,FIRST_MAXSPIN_POS,reel1_selectedIndex)}), delay);
    let intervalId2 = setInterval((function() {spinMe(reel2,SECOND_MAXSPIN_POS,reel2_selectedIndex)}), delay);
    let intervalId3 = setInterval((function() {spinMe(reel3,THIRD_MAXSPIN_POS,reel3_selectedIndex)}), delay);

    console.log('start');
    console.log(intervalId);
    console.log(intervalId2);
    console.log(intervalId3);

    let reels = 0;
    let that = this;

    function spinMe(reel, maxSpinTime, selectedIndex) {
        if ((pos * -1) >= maxSpinTime) {
            console.log('stop');
            let stopPosition = (maxSpinTime + (selectedIndex * REEL_HEIGHT)) * -1;
            reel.style.backgroundPositionY = stopPosition + 'px';
            console.log(reel);
            console.log(stopPosition);

            // stop the first reel
            if (reels === 1) {
                clearInterval(intervalId);
                console.log('stop interval 1: ' + intervalId);
                intervalId = null;
            };

            // next, stop the second reel
            if (intervalId === null && reels === 2) {
                clearInterval(intervalId2);
                console.log('stop interval 2: ' + intervalId2);
                intervalId2 = null;
            };

            // lastly, stop the 3rd reel
            // declare winner
            // enable button
            if (intervalId2 === null && reels === 3) {
                console.log('stop interval 3: ' + intervalId3);
                clearInterval(intervalId3);
                intervalId3 = null;
                that.declareWinner();
                enableButton();
            };

            reels++;
        } else {
            count++;
            pos = count * -10;
            reel.style.backgroundPositionY = pos + 'px';
        }
    };
};

// Main program
let slotMachine = new SlotMachine(FIRST_ITEMS, SECOND_ITEMS, THIRD_ITEMS);

function handleClick() {
    disableButton();
    slotMachine.reset();
    slotMachine.start();
    slotMachine.spinReels();
}

// Helper functions
function sameValues(array) {
    return (new Set(array)).size === 1;
}

function disableButton() {
    document.querySelector(".play-button").disabled = true;
}

function enableButton() {
    document.querySelector(".play-button").disabled = false;
}
