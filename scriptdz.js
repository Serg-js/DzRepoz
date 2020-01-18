'use strict';

let startCalc = document.getElementById('start'),
    budgetValue = document.getElementsByClassName('budget-value')[0],
    daybudgetValue = document.getElementsByClassName('daybudget-value')[0],
    levelValue = document.getElementsByClassName('level-value')[0],
    expensesValue = document.getElementsByClassName('expenses-value')[0],
    optionalexpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
    incomeValue = document.getElementsByClassName('income-value')[0],
    monthsavingsValue = document.getElementsByClassName('monthsavings-value')[0],
    yearsavingsValue = document.getElementsByClassName('yearsavings-value')[0],

    expensesItem = document.getElementsByClassName('expenses-item'),
    expensesItemBtn = document.getElementsByTagName('button')[0],
    ptionalexpensesBtn = document.getElementsByTagName('button')[1],
    countBudgetBtn = document.getElementsByTagName('button')[2],
    optionalexpensesItem = document.querySelectorAll('.optionalexpenses-item'),
    chooseIncome = document.querySelector('.choose-income'),
    checkSavings = document.querySelector('#savings'),
    chooseSum = document.querySelector('.choose-sum'),
    choosePercent = document.querySelector('.choose-percent'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value');



console.log(optionalexpensesItem);

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
    savings : true,
    chooseExpenses: function(){
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
    },
    detectDayBudget: function(){
        appData.moneyPerDay = (appData.budget / 30).toFixed(); //Запишем в объект значение дневного бюджета
        alert('Ужедневный бюджет: ' + appData.moneyPerDay + ' грн.');
    },
    detectLevel: function() {
        if(appData.moneyPerDay < 100) {
            console.log('Минимальный уровень достатка');
        } else if(appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
            console.log('Средний уровень достатка');
        } else if(appData.moneyPerDay > 2000) {
            console.log('Высокий уровень достатка');
        } else {
            console.log('Произогла ошибка');
        }
    },
    checkSeivings: function() {
        if(appData.savings == true) {
            let save = +prompt('Какова сумма нокпления?'),
                percent = +prompt('Под какой процент?');
            
            appData.monthIncome = save / 100 / 12 * percent;
            alert('Доход в месяц с вашего депозита: ' + appData.monthIncome);
        }
    },
    shooseOptExpenses: function() {
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
    },
    chooseIncome: function() {
        for(let i = 0; i < 1; i++) {
            let items = prompt('Что принесет ополнитиельный доход? Перечислите через запятую!', '');

            if(typeof(items) === 'string' && typeof(items) != null && items != '') {
                console.log('done');
                appData.income = items.split(', ');
                appData.income.push(prompt('Может что-то еще?', ''));
                appData.income.sort();

                appData.income.forEach(function(item, i, arr) {
                    alert('Способы доп. зароботка: ' + (i + 1) + ' - ' + item + ';');
                });
            } else {
                console.log('bad result');
                i--;
            }
        }  
    }
}

for(let key in appData) {
    console.log('Наша программа включает в себя данные: ' + key);
}