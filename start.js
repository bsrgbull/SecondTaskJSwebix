`use strict`

import * as webix from "@xbs/webix-pro";
 
const t = webix.uid(); // покажет сигнатуры и типы методов Webix

function Item(name, quantity, price) {	//Конструктор для создания объектов товара
    this.name = name;
    this.quantity = quantity;
    this.price = price;
  }

let arrStorage = [				//Массив с товарами на Складе
    new Item("Яблоки",    10,  80),		
    new Item("Апельсины", 50,  65),
    new Item("Груши",     20, 150),
    new Item("Помидоры",  25, 100),
    new Item("Огурцы",    16,  50),
  ];

let arrBasket = [];		//Товары в Корзине

let table1 = document.getElementById("HTMLtable1");
let table2 = document.getElementById("HTMLtable2");
let summIndicator = document.getElementById("totalPrice");

updateTable(table1, arrStorage);	//Первичное заполнение Склада товарами

function updateTable(table, array) {			//Обновляет Склад или Корзину,
    while(table.rows.length > 1) table.deleteRow(1);    //для этого полностью стирает все
    for (let i = 0; i < array.length; i++) {		//строки в таблице, затем заполняет
        let tr = document.createElement('tr');		//их товарами из массивов
        tr.innerHTML = 					//На вход получает таблицу и соответствующий массив
	`<td>${array[i].name}</td><td>${array[i].quantity}</td><td>${array[i].price}</td>
        <input value="+" onclick="add('${array[i].name}')" type="button">
        <input value="-" onclick="del('${array[i].name}')" type="button">`;
        table.append(tr);
    }
}

function add(nameOfItem) {
    moveItem(nameOfItem, arrStorage, arrBasket);
}

function del(nameOfItem) {
    moveItem(nameOfItem, arrBasket, arrStorage);
}

function moveItem(nameOfItem, arrayToDelete, arrayToAdd) {	//Перемещает товар со склада в корзину и наоборот
								//Получает на вход Имя товара, массив из которого надо удалить товар, и массив в который надо добавить
    let rowOfItemToDelete = whichRow(arrayToDelete, nameOfItem);
    let rowOfItemToAdd = whichRow(arrayToAdd, nameOfItem);	//Вычисляем здесь положение товара в массивах(его индекс), ищем товар по его названию

    if (rowOfItemToDelete > -1 && arrayToDelete[rowOfItemToDelete].quantity >= 0) {	//Проверка на наличие товара на складе

        if (rowOfItemToAdd == -1) {	//Если товара нет в массиве, добавляет туда новый, 1 шт.
            arrayToAdd.push(new Item(nameOfItem, 1, arrayToDelete[rowOfItemToDelete].price)); 	   
        } else {         		   
        arrayToAdd[rowOfItemToAdd].quantity++;
	}

        arrayToDelete[rowOfItemToDelete].quantity--; 
    
        if (arrayToDelete[rowOfItemToDelete].quantity == 0) {	//Если после удаления 1 шт. товара его количество = 0, удаляем этот объект из массива
            arrayToDelete.splice(rowOfItemToDelete,1);
        }

        updateTable(table1,arrStorage);
        updateTable(table2,arrBasket);
        updateSumm();
    }
}

function whichRow(array, nameOfItem) {		//Вычисляет индекс товара в массиве по имени товара, если товар не найден возвращает -1
    return array.findIndex(
        (element, index, array) => {return element.name == nameOfItem});
}

function updateSumm() {		//Обновляет сумму
	let summ = 0;	
	for (let i = 0; i < arrBasket.length; i++) {
		summ += arrBasket[i].quantity * arrBasket[i].price;	
	}
	summIndicator.innerHTML = `<h3>${summ}</h3>`;
}


webix.ui({
    rows:[
        { view:"template", type:"header", template:"Задание№2" },
        { view:"datatable", autoConfig:true, data:[
            ["Яблоки",    10, 80, 0],
            ["Апельсины", 50, 65, 0],
            ["Груши",    20, 150, 0],
            ["Помидоры", 25, 100, 0],
            ["Огурцы",    16, 50, 0]] }
        ]
});

