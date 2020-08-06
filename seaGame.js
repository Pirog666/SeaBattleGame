let view = {
    displayMessage: function (msg) {
        let messageArea = document.querySelector('#messageArea');
        messageArea.innerHTML = msg;
    },
    displayHit: function (location) {
        let cell = document.getElementById(location);
        cell.setAttribute('class', 'hit');
    },
    displayMiss: function (location) {
        let cell = document.getElementById(location);
        cell.setAttribute('class', 'miss');
    }
};


let model = {
    boardSize: 7,  //размер игрового поля
    numShips: 3,   //кол-во кораблей
    shipLength: 3, //длинна корабля
    shipsSunk: 0,  //потопленные корабли
    ships: [
        ship1 = { location: ['10', '20', '30'], hits: ['', '', ''] },
        ship2 = { location: ['32', '33', '34'], hits: ['', '', ''] },
        ship3 = { location: ['63', '64', '65'], hits: ['', '', ''] }
    ],

    fire: function (guess) {  //получаем координаты выстрела
        for (let i = 0; i < this.numShips; i++) {
            let ship = this.ships[i];
            let index = ship.location.indexOf(guess);
            if (index >= 0) {
                ship.hits[index] = 'hit';
                view.displayHit(guess);
                view.displayMessage('Вы попали!');
                if (this.isSunk(ship)) {
                    view.displayMessage('Корабль потоплен!');
                    this.shipsSunk++;
                }
                return true;
            }
        }
        view.displayMiss(guess);
        view.displayMessage('Вы промазали!');
        return false;
    },

    isSunk: function (ship) {
        for (let i = 0; i < this.shipLength; i++) {
            if (ship.hits[i] !== 'hit') {
                return false;
            }
        }
        return true;
    }

};


let controller = {
    guesses: 0,

    processGuess: function (guess) {
        let location = rightGuesses(guess);
        if (location) {
            this.guesses++;
            let hit = model.fire(location);
            if (hit && model.shipsSunk === model.numShips) {
                view.displayMessage('Победа! Вы потопили ' + model.numShips + ' кораблей за ' + this.guesses + ' выстрелов.');
            }
        }
    }
}

function rightGuesses(guess) {
    let alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

    if (guess === null || guess.length !== 2) {
        alert('Вы ввели неверные координаты!');
    } else {
        let firstChar = guess.charAt(0);
        let row = alphabet.indexOf(firstChar);
        let column = guess.charAt(1);
        if (isNaN(row) || isNaN(column)) {
            alert('Вы ввели неверные координаты!');
        } else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
            alert('Вы ввели неверные координаты!');
        } else {
            return row + column;
        }
    }
    return null;
}

/*let location1 = Math.floor(Math.random() * 5);
let location2 = location1 + 1;messageArea
let location3 = location2 + 1;*/








