let money, time;

function start() {
    money = +prompt('Ваш бюджет на месяц', '');
    time = prompt('Введите дату в формате YYYY-MM-DD', '');

    while(isNaN(money) || money == '' || money == null) {
        money = +prompt('Ваш бюджет на месяц', '');
    }
}

start();

let appData = {
    budget : money,
    timeData : time,
    expenses : {},
    optionalExpenses : {},
    income : [],
    savings : true
}

function chooseExpenses() {
    for(let i = 0; i < 2; i++) {
        let a = prompt("Введите обязательную статью расходов в этом месяце", ''),
            b = prompt("Во сколько обойдется?", '');
        
        if(typeof(a) === 'string' && typeof(a) != null && typeof(b) != null && a != '' && b != '' && a.length < 50) {
            console.log('done');
            appData.expenses[a] = b;
        } else {
            console.log('bad result');
            i--;
        }
    }
}

chooseExpenses();

function detectDayBudget() {
    appData.moneyPerDay = (appData.budget / 30).toFixed(); //Запишем в объект значение дневного бюджета
    alert('Ужедневный бюджет: ' + appData.moneyPerDay + ' грн.');
}

detectDayBudget();

// В зависимости от ежедневного бюджета выведем уровень достатка человека

function detectLevel() {
    if(appData.moneyPerDay < 100) {
        console.log('Минимальный уровень достатка');
    } else if(appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
        console.log('Средний уровень достатка');
    } else if(appData.moneyPerDay > 2000) {
        console.log('Высокий уровень достатка');
    } else {
        console.log('Произогла ошибка');
    }
}

detectLevel();

//Рассчитаем накопления с депозита если он есть
function checkSeivings() {
    if(appData.savings == true) {
        let save = +prompt('Какова сумма нокпления?'),
            percent = +prompt('Под какой процент?');
        
        appData.monthIncome = save / 100 / 12 * percent;
        alert('Доход в месяц с вашего депозита: ' + appData.monthIncome);
    }
}

checkSeivings();

function shooseOptExpenses() {
    for(let i = 1; i < 4; i++) {
        let q = prompt('Статья необезательных расходов?', '');

        if(typeof(q) === 'string' && typeof(q) != null && q != '') {
            console.log('done');
            appData.optionalExpenses[i] = q;
        } else {
            console.log('bad result');
            i--;
        }
    }
}

shooseOptExpenses();