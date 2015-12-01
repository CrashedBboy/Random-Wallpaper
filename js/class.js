'use strict';

function update(){
	showStatus("Loading...");
	loading();
	retrieveList();
};

/** share this image as blob (to wallpaper manager) */
function setWallpaper(){
	// check https://github.com/robnyman/Firefox-OS-Boilerplate-App/blob/gh-pages/js/webapp.js
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
	document.body.style.backgroundImage = "url('" + image_url + "')";
};

/** show loading icon on button */
function loading(){
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
	$("#new_btn_loader").hide();
	$("#new_btn_wrapper").show();
};

/** 'Get New' on main button */
function showUpdateBtn(){
	$("#status").hide();
	$("#apply_btn").show();
};
