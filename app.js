let tab = [
	["0111", "0001", "0001", "0111"],
	["0111", "1000", "1110", "1000"],
	["1110", "0001", "1110", "1000"],
	["1000", "1000", "1110", "1000"]
];

let table = document.querySelector("#tab1");
let inputs = table.querySelectorAll("input");
let headers = table.querySelectorAll("th");

for(let i = 0; i < inputs.length; i++){
	let value = tab[parseInt(i / 4)][i % 4];
	let input = inputs[i];
	input.value = value;
	input.placeholder = "0000";
	input.maxLength = "4";
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

function createTableR1(tabEle, colIdx){
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
			td.textContent = srTransform(qn, q).r;

			tr.appendChild(td);
		}
		tabEle.appendChild(tr);
	}
}

function srTransform(q1, q2){
	if(q1 == "0" && q2 == "0"){
		return {s: "0", r: "---"};
	} else if(q1 == "0" && q2 == "1"){
		return {s: "1", r: "0"};
	} else if(q1 == "1" && q2 == "0"){
		return {s: "0", r: "1"};
	} else if(q1 == "1" && q2 == "1"){
		return {s: "---", r: "0"};
	}
}