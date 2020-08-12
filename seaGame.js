let view = {
    displayMessage: function (msg) {
        let messageArea = document.querySelector('#messageArea');
        messageArea.innerHTML = msg;
    },
    displayHit: function (locations) {
        let cell = document.getElementById(locations);
        cell.setAttribute('class', 'hit');
    },
    displayMiss: function (locations) {
        let cell = document.getElementById(locations);
        cell.setAttribute('class', 'miss');
    }
};


let model = {
    boardSize: 7,  //размер игрового поля
    numShips: 3,   //кол-во кораблей
    shipLength: 3, //длинна корабля
    shipsSunk: 0,  //потопленные корабли
    ships: [
        ship1 = { locations: ['', '', ''], hits: ['', '', ''] },
        ship2 = { locations: ['', '', ''], hits: ['', '', ''] },
        ship3 = { locations: ['', '', ''], hits: ['', '', ''] }
    ],

    fire: function (guess) {  //получаем и обрабатываем координаты выстрела
        for (let i = 0; i < this.numShips; i++) {
            let ship = this.ships[i];
            let index = ship.locations.indexOf(guess);
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
        // проверка корабля на потопление 
        for (let i = 0; i < this.shipLength; i++) {
            if (ship.hits[i] !== 'hit') {
                return false;
            }
        }
        return true;
    },

    generateShipLocations: function () {
        // генерация коорбинат корабля
        let locations;
        for (let i = 0; i < this.numShips; i++) {
            do {
                locations = this.generateShip();
            } while (this.colision(locations));
            this.ships[i].locations = locations;
        }
        console.log('Координаты:');
        console.log(this.ships);
    },

    generateShip: function () {
        let direction = Math.floor(Math.random() * 2);
        let row, col;
        if (direction === 1) {
            //начальная позиция для горизонтального корабля
            row = Math.floor(Math.random() * this.boardSize);
            col = Math.floor(Math.random() * (this.boardSize - this.shipLength));
        } else {
            // начальная позиция для вертикального корабля
            col = Math.floor(Math.random() * this.boardSize);
            row = Math.floor(Math.random() * (this.boardSize - this.shipLength));
        }

        let newShipLocation = [];

        for (let i = 0; i < this.shipLength; i++) {
            if (direction === 1) {
                //горизонтальный массив 
                newShipLocation.push(row + '' + (col + i));
            } else {
                //вертикальный массив
                newShipLocation.push((row + i) + '' + col);
            }
        }
        return newShipLocation;
    },

    colision: function (locations) {
        //проверка на пересечение 
        for (let i = 0; i < this.numShips; i++) {
            let ship = this.ships[i];
            for (let j = 0; j < locations.length; j++) {
                if (ship.locations.indexOf(locations[j]) > 0) {
                    return true;
                }
            }
        }
        return false;
    }

};


let controller = {
    guesses: 0,

    processGuess: function (guess) {
        let locations = rightGuesses(guess);
        if (locations) {
            this.guesses++;
            let hit = model.fire(locations);
            if (hit && model.shipsSunk === model.numShips) {
                view.displayMessage('Победа! Вы потопили ' + model.numShips + ' кораблей за ' + this.guesses + ' выстрелов.');
            }
        }
    }
}


function rightGuesses(guess) {
    // проверка введенных данных
    let alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

    if (guess === null || guess.length !== 2) {
        alert('Вы ввели неверные координаты!');
    } else {
        let firstChar = guess.charAt(0).toUpperCase();
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


function init() {
    // активация кнопки и поля ввода (через enter)
    let fireButton = document.getElementById('fireButton');
    fireButton.onclick = handleFireButton;
    let guessInput = document.getElementById('guessInput');
    guessInput.onkeypress = handleKeyPress;
    model.generateShipLocations();
}


function handleFireButton() {
    let guessInput = document.getElementById('guessInput');
    let guess = guessInput.value;
    controller.processGuess(guess);
    guessInput.value = '';
}


function handleKeyPress(e) {
    let fireButton = document.getElementById('fireButton');
    if (e.keyCode === 13) {
        fireButton.click();
        return false;
    }
}

window.onload = init();









