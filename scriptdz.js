'use strict'

let money = +prompt('Ваш бюджет на месяц', '');
let time = prompt('Введите дату в формате YYYY-MM-DD', '');

let appData = {
    budget : money,
    timeData : time,
    expenses : {},
    optionalExpenses : {},
    income : [],
    savings : false
}

let nameCosts = prompt('Введите обязательную статью расходов в этом месяце', '');
let cost = +prompt('Во сколько обойдется?', '');

appData.expenses.nameCosts = cost;

let budgetDay = appData.budget / 30;
alert( budgetDay );

//console.log(appData.expenses.nameCosts);