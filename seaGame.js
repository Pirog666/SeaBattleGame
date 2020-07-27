let location1 = Math.floor(Math.random() * 5);
let location2 = location1 + 1;
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
alert('Вы выстрелили ' + guesses + ' раз!');






