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

let table = document.querySelector("#tabInput");
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

		let idx = input.getAttribute("idx");

		if(input.value.length == 4){
			tab[parseInt(idx / 4)][idx % 4] = input.value;
			update();
		} else {
			tab[parseInt(idx / 4)][idx % 4] = "0000";
			update();
		}
		
		if(input.value.length == 0 || input.value.length == 4){
			input.removeAttribute("error");
			input.title = "";
		} else {
			input.setAttribute("error","");
			input.title = "Błąd: Wartość jest zbyt krótka. Wymagana długość to 4 znaki.";
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

let j1 = createTable(document.querySelector("#tabj1"));
let k1 = createTable(document.querySelector("#tabk1"));
let j2 = createTable(document.querySelector("#tabj2"));
let k2 = createTable(document.querySelector("#tabk2"));

update();

window.onbeforeunload = function() {
   return "Czy na pewno chcesz zamknąć aplikację?";
};

function update(){
	setTableData(s1, tab,"sr","s", 0);
	setTableData(r1, tab,"sr","r", 0);
	setTableData(s2, tab,"sr","s", 1);
	setTableData(r2, tab,"sr","r", 1);

	setTableData(j1, tab,"jk","j", 0);
	setTableData(k1, tab,"jk","k", 0);
	setTableData(j2, tab,"jk","j", 1);
	setTableData(k2, tab,"jk","k", 1);
}

function createTable(tabEle){
	// Add column header
	let headerTr = document.createElement("tr");
	headerTr.innerHTML = "<th><div class=\"diagonal-split\"><div class=\"top\">Q<sub>1</sub>Q<sub>2</sub></div><div class=\"bottom\">X<sub>1</sub>X<sub>2</sub></div></div></th><th>00</th><th>01</th><th>11</th><th>10</th>";
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

function setTableData(tdArr, tab, transform, key, colIdx){
	for(let i = 0; i < 16; i++){
		let y = parseInt(i / 4);
		let x = i % 4;
		let val = tab[y][x];
		let qn = headers[5 + y].textContent[colIdx];
		let q = val[colIdx]; // First digit
		if(transform == "sr"){
			if(key == "s"){
				tdArr[i].textContent = srTransform(qn, q).s;
			} else if(key == "r"){
				tdArr[i].textContent = srTransform(qn, q).r;
			}
		} else if(transform == "jk"){
			if(key == "j"){
				tdArr[i].textContent = jkTransform(qn, q).j;
			} else if(key == "k"){
				tdArr[i].textContent = jkTransform(qn, q).k;
			}
		}
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

function jkTransform(q1, q2){
	if(q1 == "0" && q2 == "0"){
		return {j: "0", k: "-"};
	} else if(q1 == "0" && q2 == "1"){
		return {j: "1", k: "-"};
	} else if(q1 == "1" && q2 == "0"){
		return {j: "-", k: "1"};
	} else if(q1 == "1" && q2 == "1"){
		return {j: "-", k: "0"};
	}
}