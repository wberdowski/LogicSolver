let table = document.querySelector("#tabInput");
let inputs = table.querySelectorAll("input");

for(let i = 0; i < inputs.length; i++){
	let input = inputs[i];
	
	input.placeholder = "0";
	input.maxLength = "4";
}