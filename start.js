`use strict`

function Item(name, quantity, price) {	//Конструктор для создания объектов товара
    this.name = name;
    this.quantity = quantity;
    this.price = price;
  }

let arrStorage = [				    //Массив с товарами на Складе
    new Item("Яблоки",    10,  80),		
    new Item("Апельсины", 50,  65),
    new Item("Груши",     20, 150),
    new Item("Помидоры",  25, 100),
    new Item("Огурцы",    16,  50),
  ];

let arrBasket = [];		//Товары в Корзине

updateTable($$("table1"), arrStorage);	//Первичное заполнение Склада товарами

function updateTable(table, array) {			//Обновляет Склад или Корзину,
    table.clearAll();                           //для этого полностью стирает все 
    for (let i = 0; i < array.length; i++) {	//строки в таблице, затем заполняет
        table.add(                              //их товарами из массивов
            {                                   //На вход получает таблицу и соответствующий массив
                name:`${array[i].name}`,
                quantity:`${array[i].quantity}`,
                price:`${array[i].price}`,
                addButton:`<input value="+" onclick="add('${array[i].name}')" type="button">`,
                delButton:`<input value="-" onclick="del('${array[i].name}')" type="button">`,
            },
        );
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
    let rowOfItemToAdd = whichRow(arrayToAdd, nameOfItem);	//Вычисляем здесь положение товара в массивах(его индекс),
                                                            //ищем товар по его названию
    if (rowOfItemToDelete > -1 && arrayToDelete[rowOfItemToDelete].quantity >= 0) {	//Проверка на наличие товара на складе

        if (rowOfItemToAdd == -1) {	    //Если в массиве, куда хотим добавить товар,
                                        //товара нет, то добавляем туда новый, 1 шт.
            arrayToAdd.push(new Item(nameOfItem, 1, arrayToDelete[rowOfItemToDelete].price)); 	   
        } else {         		   
        arrayToAdd[rowOfItemToAdd].quantity++;
	    }

        arrayToDelete[rowOfItemToDelete].quantity--; 
    
        if (arrayToDelete[rowOfItemToDelete].quantity == 0) {	//Если после удаления 1 шт. товара его количество = 0,
            arrayToDelete.splice(rowOfItemToDelete,1);          //удаляем этот объект из массива
        }

        updateTable($$("table1"),arrStorage);
        updateTable($$("table2"),arrBasket);
        updateSumm();
    }
}

function whichRow(array, nameOfItem) {		//Вычисляет индекс товара в массиве по имени
    return array.findIndex(                 //товара, если товар не найден возвращает -1
        (element, index, array) => {return element.name == nameOfItem});
}

function updateSumm() {		//Обновляет сумму
	let summ = 0;	
	for (let i = 0; i < arrBasket.length; i++) {
		summ += arrBasket[i].quantity * arrBasket[i].price;	
	}
    $$("summIndicator").define("template", "Сумма: " + summ);
    $$("summIndicator").refresh();
}