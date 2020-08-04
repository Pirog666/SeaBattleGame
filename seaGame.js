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
    shipsSome: 0,  //потопленные корабли
    ships: [
        ship1 = { location: ['10', '20', '30'], hits: ['','',''] },
        ship2 = { location: ['32', '33', '34'], hits: ['','',''] },
        ship3 = { location: ['63', '64', '65'], hits: ['','',''] }
    ],

    fire: function (guess) {  //получаем координаты выстрела
        for (let i = 0; i < this.numShips; i++) {
            let ship = this.ships[i];
            location = ship.location;
            let index = location.indexOf(guess);
            if (index >= 0) {
                ship.hits[index] = 'hit';
                return true;
            }
        }
        return false;
    }
    
};



/*let location1 = Math.floor(Math.random() * 5);
let location2 = location1 + 1;messageArea
let location3 = location2 + 1;

let guess;
let hits = 0;
let guesses = 0;

let isSunk = false;

while (isSunk == false) {
    guess = prompt('Готов выстрелить? (введи цифру 0-6):');
    if (guess < 0 || guess > 6) {
        alert('Число от 0 до 6!!!');
    }
    else {
        guesses = guesses + 1;
        if (guess == location1 || guess == location2 || guess == location3) {
            hits = hits + 1;
            if (hits == 3) {
                isSunk = true;
                alert('Ты победил!');

            }
        }
        else {
            alert('Мимо!');
        }
    }
}
alert('Вы выстрелили ' + guesses + ' раз!');*/






