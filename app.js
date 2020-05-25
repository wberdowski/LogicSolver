window.addEventListener('load', function () {
	category = document.querySelector(".page-header > .category");
	title = document.querySelector(".page-header > .title");
	navItems = document.querySelectorAll(".nav .item");
	
	for(let i = 0; i < navItems.length; i++){
		let item = navItems[i];
		let target = item.getAttribute("data");
		let url = target.substr(6);
		
		item.addEventListener("click", function(){
			setUrl(item);
		});
	}
	
	if(location.hash != ""){
		let item = document.querySelector(".nav .item[data=\"pages/" + location.hash.substr(1) + "\"]");
		setSelected(item);
	} else {
		setUrl(navItems[0]);
	}
});

function setUrl(item){
	let target = item.getAttribute("data");
	location.hash = target.substr(6);
}

function setSelected(item){
	let target = item.getAttribute("data");
	location.hash = target.substr(6);
	loadSubpage(target);
	uncheckAllItems(navItems);
	item.setAttribute("selected", "");
}

function uncheckAllItems(items){
	for(let i = 0; i < items.length; i++){
		items[i].removeAttribute("selected");
	}
}

function loadSubpage(url){
	loadMeta(url, function(meta){
		title.textContent = meta.title;
		// Load body
		sendGetReq(url + "/body.html",function(req){
			let text = req.responseText;
			let container = document.querySelector(".page-content");
			container.innerHTML = text;
			
			// Load script
			loadScripts(url, meta);
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

function loadMeta(url, callback){
	sendGetReq(url + "/page-meta.json", function(req){
		callback(JSON.parse(req.responseText));
	});
}

function loadScripts(url, meta){
	let scripts = meta.path.scripts;
	for(let i = 0; i < scripts.length; i++){
		sendGetReq(url + "/" + scripts[i], function(req2){
			let text = req2.responseText;
			eval(text);
		});
	}
}

window.addEventListener('popstate', function (e) {
	let item = document.querySelector(".nav .item[data=\"pages/" + location.hash.substr(1) + "\"]");
	setSelected(item);
});