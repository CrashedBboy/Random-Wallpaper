'use strict';

function update(){
	showStatus("Loading...");
	loading();
	retrieveList();
};

/** share this image as blob (to wallpaper manager) */
function setWallpaper(){
	// check https://github.com/robnyman/Firefox-OS-Boilerplate-App/blob/gh-pages/js/webapp.js
	var img = document.getElementById("preview");
	console.log(img);
	if(img.naturalWidth > 0 && img.naturalHeight > 0) {
		var blobCanvas = document.createElement("canvas");
		blobCanvas.width = img.naturalWidth;
		blobCanvas.height = img.naturalHeight;
		var blobCanvasContext = blobCanvas.getContext("2d");
		blobCanvasContext.drawImage(img, 0, 0);

		blobCanvas.toBlob(function(blob) {
			new MozActivity({
				name: "share",
				data: {
					type: "image/*",
					number: 1,
					blobs: [blob]
				}
			});
		});
	}else {
		alert("None image for setting!");
	}
};

/** get daily list of wallpapers */
function retrieveList(){
	return new Promise(function(resolve, reject) {
		var req = new XMLHttpRequest({ mozSystem: true });
		req.open('GET', 'http://wall.alphacoders.com/api1.0/get.php?auth=a610819e90c0a65ae7dfd7f7c56dd976', true);
		req.responseType = 'json';
		req.onload = function() {
			if(req.status === 200) {
				resolve(req.response);
			}
		};
		req.onerror = function() {
			console.log("error");
			reject(new Error(req.statusText));
		};
		req.send();
		loading();
	});
};

/** append one of wallpapers on app body */
function preview(list){
	showUpdateBtn();
	var len = list.wallpapers.length;
	var image_url = list.wallpapers[Math.floor(Math.random() * len)].url;
	document.getElementById("preview").src = image_url;
};

/** show loading icon on button */
function loading(){
	$("#new_btn").css("background-color", "black");
	$("#new_btn_wrapper").hide();
	$("#new_btn_loader").show();
};

/** show status bar and essage */
function showStatus(msg){
	$("#apply_btn").hide();
	$("#status").text(msg).show();
};

/** hide status bar and show apply button */
function showApplyBtn(){
	$("#status").hide();
	$("#apply_btn").show();
};

/** 'Get New' on main button */
function showUpdateBtn(){
	$("#new_btn").css("background-color", "#FFA500");
	$("#status").hide();
	$("#new_btn_loader").hide();
	$("#new_btn_wrapper").show();
};
