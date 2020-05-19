function loadSubpage(url){
	// Load body
	sendGetReq(url + "/body.html",function(req){
		let text = req.responseText;
		document.querySelector(".page-content").innerHTML = text;
		
		// Load script
		sendGetReq(url + "/script.js", function(req2){
			let text = req2.responseText;
			eval(text);
		});
	});
}

function sendGetReq(url, callback){
	let req = new XMLHttpRequest();
	req.open("GET", url, true); 
	req.onreadystatechange = function(){
		if(req.readyState == XMLHttpRequest.DONE && req.status == 200) {
			callback(req);
		}
	}
	req.send(null);
}