let table = document.querySelector("#tabInput");
let inputs = table.querySelectorAll("input");

let data = [
	[1,0,0],
	[0,1,0],
	[0,0,1],
	[0,0,0],
	[0,0,0],
	[0,0,0],
	[0,0,0],
	[0,0,0]
];

for(let i = 0; i < inputs.length; i++){
	let input = inputs[i];
	
	input.placeholder = "0";
	input.maxLength = "4";
}

let jc = createTable(document.querySelector("#tabjc"));

update();

function update(){
	setTableData(jc, data);

}

function createTable(tabEle){
	// Add column header
	let headerTr = document.createElement("tr");
	headerTr.innerHTML = "<th>Stan</th><th>Q<sub>C</sub></th><th>Q<sub>B</sub></th><th>Q<sub>A</sub></th>";
	tabEle.appendChild(headerTr);
	let tdArr = [];

	for(let y = 0; y < 8; y++){
		let tr = document.createElement("tr");

		// Add row header
		let headerTh = document.createElement("th");
		headerTh.textContent = y;//headers[4 + y].textContent;
		tr.appendChild(headerTh);

		for(let x = 0; x < 3; x++){
			let td = document.createElement("td");		
			td.textContent = "-";
			tr.appendChild(td);
			tdArr.push(td);
		}
		tabEle.appendChild(tr);
	}

	return tdArr;
}

function setTableData(tdArr, tab){
	for(let i = 0; i < tab.length*3; i++){
		let y = parseInt(i / 3);
		let x = i % 3;
		let val = tab[y][x];
		//let qn = headers[5 + y].textContent[colIdx];
		tdArr[i].textContent = val;
	}
}