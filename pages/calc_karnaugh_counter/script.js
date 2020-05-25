let table = document.querySelector("#tabInput");
let inputs = table.querySelectorAll("input");

let data = [
	["0","0","0"],
	["0","0","0"],
	["0","0","0"],
	["0","0","0"],
	["0","0","0"],
	["0","0","0"],
	["0","0","0"],
	["0","0","0"],
];

// let data = [
	// ["0","0","1"],
	// ["1","1","1"],
	// ["1","0","1"],
	// ["0","1","0"],
	// ["1","1","0"],
	// ["0","0","0"],
	// ["1","0","0"],
	// ["0","1","1"],
// ];

for(let i = 0; i < inputs.length; i++){
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

		if(input.value.length == 1){
			let idx = input.getAttribute("idx");
			data[parseInt(idx / 3)][idx % 3] = input.value;
			update();
		}
	});
	
	input.placeholder = "0";
	input.maxLength = "4";
}

let jc = createTable(document.querySelector("#tabjc"));
let kc = createTable(document.querySelector("#tabkc"));

let jb = createTable(document.querySelector("#tabjb"));
let kb = createTable(document.querySelector("#tabkb"));

let ja = createTable(document.querySelector("#tabja"));
let ka = createTable(document.querySelector("#tabka"));

update();

function update(){
	setTableData(jc, "j", 0);
	setTableData(kc, "k", 0);
	
	setTableData(jb, "j", 1);
	setTableData(kb, "k", 1);
	
	setTableData(ja, "j", 2);
	setTableData(ka, "k", 2);
}

function getHeaderIndex(qb, qa){
	if(qb == "0"){
		if(qa == "0"){
			return 0;
		} else if(qa == "1"){
			return 1;
		}
	} else if (qb == "1"){
		if(qa == "0"){
			return 3;
		} else if(qa == "1"){
			return 2;
		}
	}
}

function createTable(tabEle){
	// Add column header
	let headerTr = document.createElement("tr");
	headerTr.innerHTML = "<th>Q<sub>C</sub>\\Q<sub>B</sub>Q<sub>A</sub></th><th>00</th><th>01</th><th>11</th><th>10</th>";
	tabEle.appendChild(headerTr);
	let tdArr = [];

	for(let y = 0; y < 2; y++){
		let tr = document.createElement("tr");

		// Add row header
		let headerTh = document.createElement("th");
		headerTh.textContent = y;//headers[4 + y].textContent;
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

function setTableData(tdArr, key, colIndex){
	let tab = [
			["0","0","0","0"],
			["0","0","0","0"]	
	];
	
	for(let i = 0; i < 8; i++){
		let q = data[i];
		
		let next = data[(i+1)%8][colIndex];
		
		let row = i;
		let val = jkTransform(q[colIndex], next);
			
		tab[q[0]][getHeaderIndex(q[1], q[2])] = val[key];
		
		console.log();
	}
	
	for(let i = 0; i < tab.length*4; i++){
		let y = parseInt(i / 4);
		let x = i % 4;
		let val = tab[y][x];
		//let qn = headers[5 + y].textContent[colIdx];
		tdArr[i].textContent = val;
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