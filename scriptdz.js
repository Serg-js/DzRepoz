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
    optionalexpensesBtn = document.getElementsByTagName('button')[1],
    countBudgetBtn = document.getElementsByTagName('button')[2],
    optionalexpensesItem = document.querySelectorAll('.optionalexpenses-item'),
    chooseIncome = document.querySelector('.choose-income'),
    checkSavings = document.querySelector('#savings'),
    chooseSum = document.querySelector('.choose-sum'),
    choosePercent = document.querySelector('.choose-percent'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value');

let money, time;

expensesItemBtn.disabled = true;
optionalexpensesBtn.disebled = true;
countBudgetBtn.disabled = true;

// Программа начинает работу с клика по кнопке "Начать расчет"

startCalc.addEventListener('click', function() {                    // Отслеживаем событие клика по кнопке "Начать расчет"
    time = prompt('Введите дату в формате YYYY-MM-DD', '');         // Принимем дату от пользователя
    money = +prompt('Ваш бюджет на месяц', '');                     // Принимаем цифру бюджета от пользователя

    while(isNaN(money) || money == '' || money == null) {           // Проверка является ли введенные данные цифрой / введено 
                                                                    //ли значение / и не нажата ли кнопка отмены
        money = +prompt('Ваш бюджет на месяц', '');
    }

    appData.budget = money;                                         // Записываем ввеенный бюджет в объект appData
    appData.timeData = time;                                        // Записываем введенную дату в объект appData
    budgetValue.textContent = money.toFixed();                      // Записываем в блок с классом budget-value, введенный 
                                                                    // пользователем бюджет и округляем его
    yearValue.value = new Date(Date.parse(time)).getFullYear();     // Запишем в инпут с классом year-value год, введенный 
                                                                    // пользователем. Но для инпутов используется не textContent, 
                                                                    // а value
                                                                    // Полученную от пользователя дату и передаем методу
                                                                    // Date.parse() разбирает строковое представление даты и 
                                                                    // возвращает количество миллисекунд, прошедших с 
                                                                    // 1 января 1970 года 00:00:00 по UTC
                                                                    // Это значение в милисекундах передается в объект Date
                                                                    // При помощи метода getFullYear() возвращаем
                                                                    // год указанной даты по местному времени
    monthValue.value = new Date(Date.parse(time)).getMonth() + 1;   // То же что и для года только используем метод getMonth()
                                                                    // т.к. метод возвращает значения от 0 до 11, т.е. январь это 0,
                                                                    // фераль - 1 и т.д.
    dayValue.value = new Date(Date.parse(time)).getDate();          // То же что и для года только используем метод getDate()

    expensesItemBtn.disabled = false;
    optionalexpensesBtn.disebled = false;
    countBudgetBtn.disabled = false;
});

// Блок обязательных расходов
expensesItemBtn.addEventListener('click', function() {
    // Нам нужно суммировать поля с суммами в обязательніх расходах. При єтом полей может біть сколько угодно
    let sum = 0; // В эту переменную суммируем все обязательные затраты

    for(let i = 0; i < expensesItem.length; i++) { // Количестов инпутов определяем автоматически expensesItem.length
        let a = expensesItem[i].value, // Поочерено в цикле выбираем сначала поле с названием статиь затрат и записываем в него данне
            b = expensesItem[++i].value; // А затем выбираем следующее поле (для этого нужно ++i) с ценой и записываем в него
        
        if(typeof(a) === 'string' && typeof(a) != null && typeof(b) != null && a != '' && b != '' && a.length < 50) {
            console.log('done');
            appData.expenses[a] = b;
            sum += +b;
        } else {
            console.log('bad result');
            i--;
        }
    }

    expensesValue.textContent = sum;
});

// блок необязательных расходов
optionalexpensesBtn.addEventListener('click', function() {
    for(let i = 0; i < optionalexpensesItem.length; i++) {
        let q = optionalexpensesItem[i].value;
        appData.optionalExpenses[i] = q;
        optionalexpensesValue.textContent += appData.optionalExpenses[i] + ' ';
    }
});

countBudgetBtn.addEventListener('click', function() {
    
    // если не задать бюджет на месяц, а сразу кликнуть по кнопке "countBudgetBtn", то в првой части в блоке "Бюджет на 1 день"
    // выведется NaN, а в блок "Уровень дохода:" попадет значение "Произогла ошибка"
    // Так происходит потому, что в объекте appData в свойстве budget хранится изначально undefined
    // undefined там находится потому как в самом верху мы создали переменную money но ничего ей не присваивали
    // а пустая переменная отдает всегда undefined
    // Чтобы этого избежать, создадим условие, в котором будем проверять свойство budget на неравентство undefined

    if(appData.budget != undefined) {
        appData.moneyPerDay = ((appData.budget - +expensesValue.textContent) / 30).toFixed(); //Определяем и записываем в объект значение дневного бюджета
        daybudgetValue.textContent = appData.moneyPerDay; // Запишем в блок справа в "Бюджет на 1 день:" значение дневного бюджета

        // Определяем уровень дохода
        if(appData.moneyPerDay < 100) {
            levelValue.textContent = 'Минимальный уровень достатка';
        } else if(appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
            levelValue.textContent = 'Средний уровень достатка';
        } else if(appData.moneyPerDay > 2000) {
            levelValue.textContent = 'Высокий уровень достатка';
        } else {
            levelValue.textContent = 'Произогла ошибка';
        }
    }else {
        daybudgetValue.textContent = 'Произогла ошибка';
    }
    
});

// Вводя данные в поле возможный доход, нам нужно чтобы эти данные отображались и в правой части в блоке "дополнительный доход"
// и для этого используем событие "input"
chooseIncome.addEventListener('input', function() {
    let items = chooseIncome.value; // Берем данные, введенные пользователем и присваиваем их в items
    appData.income = items.split(', '); // Разбиваем строку на элементы
    incomeValue.textContent = appData.income;
});

// Работаем с чекбоксом
checkSavings.addEventListener('click', function() {
    if(appData.savings == true) {
        appData.savings = false;
    } else {
        appData.savings = true;
    }
});

// 
chooseSum.addEventListener('input', function() {
    if(appData.savings == true) {
        let sum = +chooseSum.value, // Запишем в переменную sum значение введенное пользователем
            percent = +choosePercent.value;
        
        appData.monthIncome = sum / 100 / 12 * percent; // Накопления на меяц
        appData.yearIncome = sum / 100 * percent; // Накопления на год

        // Записываем в правый блок в "Накопления за 1 месяц:" рассчитанное значение и округляем его до одного знака полсе запятой
        monthsavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearsavingsValue.textContent =  appData.yearIncome.toFixed(1); // То же что и для 1 месяца
    }
});

choosePercent.addEventListener('input', function() {
    if(appData.savings == true) {
        let sum = +chooseSum.value, // Запишем в переменную sum значение введенное пользователем
            percent = +choosePercent.value;
        
        appData.monthIncome = sum / 100 / 12 * percent; // Накопления на меяц
        appData.yearIncome = sum / 100 * percent; // Накопления на год

        // Записываем в правый блок в "Накопления за 1 месяц:" рассчитанное значение и округляем его до одного знака полсе запятой
        monthsavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearsavingsValue.textContent =  appData.yearIncome.toFixed(1); // То же что и для 1 месяца
    }
});

let appData = {
    budget : money,
    timeData : time,
    expenses : {},
    optionalExpenses : {},
    income : [],
    savings : false,
};