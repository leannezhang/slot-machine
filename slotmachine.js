/**
 * Created by liyangzhang on 2016-11-15.
 */
    // change to capitalized
const firstItems = ['Coffee Maker', 'Teapot', 'Espresso Machine'];
const secondItems = ['Coffee Filter', 'Tea Strainer', 'Espresso Tamper'];
const thirdItems = ['Coffee Grounds', 'Loose Tea', 'Espresso Beans'];
const prizeList = ['coffee', 'tea', 'espresso'];
const slotHeight = 64;
let results = [];

/** animation properties */
let reelMaxSpinTime = 1920; //predefined time for each reel
let count = 0;
let pos = 0;
let delay = 0;
let intervalId;
let intervalId2;

function Reel(items, time) {
    this.items = items;
};

Reel.prototype.randomSelect = function() {
    return Math.floor(Math.random() * this.items.length);
};

function SlotMachine(firstItems, secondItems, thirdItems) {
    this.firstReel = new Reel(firstItems);
    this.secondReel = new Reel(secondItems);
    this.thirdReel = new Reel(thirdItems);
};

SlotMachine.prototype.start = function() {
    results.push(this.firstReel.randomSelect());
    results.push(this.secondReel.randomSelect());
    results.push(this.thirdReel.randomSelect());
    console.log(results);
};

SlotMachine.prototype.reset = function() {
    results.length = 0;
    console.log(results);
};

SlotMachine.prototype.declareWinner = function() {
    let resultDiv = document.querySelector('.result');

    if (sameValues(results)) {
        let luckyIndex = results[0];
        let congrats = 'Congratulations! You won a cup of';
        resultDiv.textContent = congrats + prizeList[luckyIndex] + '.';
    } else {
        resultDiv.textContent = 'Busted! Please try again!';
    }
};

let slotMachine = new SlotMachine(firstItems, secondItems, thirdItems);

function handleClick() {
    slotMachine.reset();
    slotMachine.start();

    spinReel();
    slotMachine.declareWinner();
    //
    //spinReel(reel1, firstReelMaxTime, reel1_selectedIndex);
    //setTimeout(function(){  spinReel(reel2, firstReelMaxTime, reel2_selectedIndex);
    //}, 1500);

    //spinReel(reel3, firstReelMaxTime, reel3_selectedIndex);


}


let spinReel = function() {
    pos = 0;
    count = 0;
    spinning = false;

    let reel1 = document.querySelector('.reel-1');
    let reel1_selectedIndex = results[0];

    let reel2 = document.querySelector('.reel-2');
    let reel2_selectedIndex = results[1];

    let reel3 = document.querySelector('.reel-3');
    let reel3_selectedIndex = results[2];

    let intervalId = setInterval((function() {scroll(reel1,1920,reel1_selectedIndex)}), delay);
    let intervalId2 = setInterval((function() {scroll(reel2,2112,reel2_selectedIndex)}), delay);
    let intervalId3 = setInterval((function() {scroll(reel3,2304,reel3_selectedIndex)}), delay);

    console.log('start');
    console.log(intervalId);
    console.log(intervalId2);
    console.log(intervalId3);

    reels = 0;

    function scroll(reel, maxSpinTime, selectedIndex) {
        if ((pos * -1) >= maxSpinTime && intervalId3 !== null) {
            console.log('stop');
            let stopPosition = (maxSpinTime + (selectedIndex * slotHeight)) * -1;
            reel.style.backgroundPositionY = stopPosition + 'px';
            console.log(reel.style.backgroundPositionY );
            console.log(reel);
            console.log(stopPosition);

            if (reels === 1) {
                clearInterval(intervalId);
                console.log('stop interval 1: ' + intervalId);
                intervalId = null;
            };

            if (intervalId === null && reels === 2) {
                clearInterval(intervalId2);
                console.log('stop interval 2: ' + intervalId2);
                intervalId2 = null;
            }

            if (intervalId2 === null && reels === 3) {
                console.log('stop interval 3: ' + intervalId3);
                clearInterval(intervalId3);
                intervalId3 = null;
                return false;
            }
            reels++;
        } else {
            count++;
            pos = count * -10;
            reel.style.backgroundPositionY = pos + 'px';
            spinning = true;
        }
    };
};



// Helper function
function sameValues(array) {
    return (new Set(array)).size === 1;
}

