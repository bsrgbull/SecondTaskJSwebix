let arr = [
    ["Яблоки", 10, 80, 0],
    ["Апельсины", 50, 65, 0],
    ["Груши", 20, 150, 0],
    ["Помидоры", 25, 100, 0],
    ["Огурцы", 16, 50, 0]
  ];

let table1 = document.getElementById("HTMLtable1");
let table2 = document.getElementById("HTMLtable2");

for (let i = 0; i<arr.length; i++) {
    let tr = document.createElement('tr');
    tr.innerHTML = `<td>${arr[i][0]}</td><td>${arr[i][1]}</td><td>${arr[i][2]}</td>
    <input value="+" onclick="add('${arr[i][0]}',${arr[i][2]},${i})" type="button">
    <input value="-" onclick="del('${arr[i][0]}',${i})" type="button">`;
    table1.append(tr);
}

let summIndicator = document.getElementById("totalPrice");


function add(nameOfItem, price, index){
    if (arr[index][3] == 0){
        let tr = document.createElement('tr');
        tr.innerHTML = `<td>${nameOfItem}</td><td id=${nameOfItem}>1</td><td>${price}</td>`;
        table2.append(tr);

	    let trLeft = table1.rows[index+1].cells[1];
	    trLeft.innerHTML = `${--arr[index][1]}`;
	    arr[index][3]++;
      
    } else if (arr[index][1] > 0){
        let tr = document.getElementById(nameOfItem);
	    tr.innerHTML = `<td id=${nameOfItem}>${++arr[index][3]}</td>`;

	    let trLeft = table1.rows[index+1].cells[1];
	    trLeft.innerHTML = `${--arr[index][1]}`;
    }
	
    updateSumm();
}

function del(nameOfItem, index){
    if (arr[index][3] == 1){
        table2.deleteRow(whichRow(nameOfItem));

	    let trLeft = table1.rows[index+1].cells[1];
	    trLeft.innerHTML = `${++arr[index][1]}`;
	    arr[index][3]--;

    } else if (arr[index][3] > 1){
        let tr = document.getElementById(nameOfItem);
	    tr.innerHTML = `<td id=${nameOfItem}>${--arr[index][3]}</td>`;

	    let trLeft = table1.rows[index+1].cells[1];
	    trLeft.innerHTML = `${++arr[index][1]}`;
    }
	
    updateSumm();
}

function updateSumm(){
	let summ = 0;	
	for (let i = 0; i<arr.length; i++){
		summ += arr[i][3] * arr[i][2];	
	}
	summIndicator.innerHTML = `<h3>${summ}</h3>`;
}

function whichRow(nameOfItem){
	for (let i = 1; i<=table2.rows.length; i++){
		if (table2.rows[i].cells[0].innerHTML == nameOfItem) return i;
	}
	return -1;
}
