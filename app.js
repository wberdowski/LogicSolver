/*
let tab = [
	["0111", "0001", "0001", "0111"],
	["0111", "1000", "1110", "1000"],
	["1110", "0001", "1110", "1000"],
	["1000", "1000", "1110", "1000"]
];
*/

let tab = [
	["0000","0000","0000","0000"],
	["0000","0000","0000","0000"],
	["0000","0000","0000","0000"],
	["0000","0000","0000","0000"]
];

let table = document.querySelector("#tab1");
let inputs = table.querySelectorAll("input");
let headers = table.querySelectorAll("th");

for(let i = 0; i < inputs.length; i++){
	let value = tab[parseInt(i / 4)][i % 4];
	let input = inputs[i];

	input.setAttribute("idx", i);
	input.addEventListener("input", function(e){
		if(e.inputType=="insertText"){
			if(e.data != "1" && e.data != "0"){
				var str = "";
				for(let i = 0; i < input.value.length; i++){
					if(input.value[i] == "1" || input.value[i] == "0"){
						str += input.value[i];
					}
				}
				input.value = str;
			}
		}

		if(input.value.length == 4){
			let idx = input.getAttribute("idx");
			tab[parseInt(idx / 4)][idx % 4] = input.value;
			update();
		}
	});

	input.placeholder = "0000";
	input.maxLength = "4";
}

// MAIN

let s1 = createTable(document.querySelector("#tabs1"));
let r1 = createTable(document.querySelector("#tabr1"));
let s2 = createTable(document.querySelector("#tabs2"));
let r2 = createTable(document.querySelector("#tabr2"));

update();

function update(){
	setTableData(s1, tab,"s", 0);
	setTableData(r1, tab,"r", 0);
	setTableData(s2, tab,"s", 1);
	setTableData(r2, tab,"r", 1);
}

function createTable(tabEle){
	// Add column header
	let headerTr = document.createElement("tr");
	headerTr.innerHTML = "<th>Q<sub>1</sub>Q<sub>2</sub>\\X<sub>1</sub>X<sub>2</sub></th><th>00</th><th>01</th><th>11</th><th>10</th>";
	tabEle.appendChild(headerTr);
	let tdArr = [];

	for(let y = 0; y < 4; y++){
		let tr = document.createElement("tr");

		// Add row header
		let headerTh = document.createElement("th");
		headerTh.textContent = headers[5 + y].textContent;
		tr.appendChild(headerTh);

		for(let x = 0; x < 4; x++){
			let td = document.createElement("td");		
			td.textContent = "-";
			tr.appendChild(td);
			tdArr.push(td);
		}
		tabEle.appendChild(tr);
	}

	return tdArr;
}

function setTableData(tdArr, tab, key, colIdx){
	for(let i = 0; i < 16; i++){
		let y = parseInt(i / 4);
		let x = i % 4;
		let val = tab[y][x];
		let qn = headers[5 + y].textContent[colIdx];
		let q = val[colIdx]; // First digit
		if(key == "s"){
			tdArr[i].textContent = srTransform(qn, q).s;
		} else if(key == "r"){
			tdArr[i].textContent = srTransform(qn, q).r;
		}
	}
}

function createTableS1(tabEle, colIdx){
	// Add column header
	let headerTr = document.createElement("tr");
	headerTr.innerHTML = "<th>Q<sub>1</sub>Q<sub>2</sub>\\X<sub>1</sub>X<sub>2</sub></th><th>00</th><th>01</th><th>11</th><th>10</th>";
	tabEle.appendChild(headerTr);

	for(let y = 0; y < 4; y++){
		let tr = document.createElement("tr");

		// Add row header
		let headerTh = document.createElement("th");
		headerTh.textContent = headers[5 + y].textContent;
		tr.appendChild(headerTh);

		for(let x = 0; x < 4; x++){
			let td = document.createElement("td");		
			let qn = headers[5 + y].textContent[colIdx];
			let q = tab[y][x][colIdx]; // First digit
			td.textContent = srTransform(qn, q).s;

			tr.appendChild(td);
		}
		tabEle.appendChild(tr);
	}
}

function srTransform(q1, q2){
	if(q1 == "0" && q2 == "0"){
		return {s: "0", r: "-"};
	} else if(q1 == "0" && q2 == "1"){
		return {s: "1", r: "0"};
	} else if(q1 == "1" && q2 == "0"){
		return {s: "0", r: "1"};
	} else if(q1 == "1" && q2 == "1"){
		return {s: "-", r: "0"};
	}
}
