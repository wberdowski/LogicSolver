window.addEventListener('load', function () {
	let category = document.querySelector(".page-header > .category");
	let title = document.querySelector(".page-header > .title");
	let navItems = document.querySelectorAll(".nav .item");
	
	for(let i = 0; i < navItems.length; i++){
		let item = navItems[i];
		let target = item.getAttribute("data");
		let url = target.substr(6);
		
		if(location.hash == "#" + url){
			setSelected(item);
		} else {
			setSelected(navItems[0]);
		}
		
		item.addEventListener("click", function(){
			setSelected(item);
		});
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
				document.querySelector(".page-content").innerHTML = text;
				
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
});