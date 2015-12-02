'use strict';

function update(){
	showStatus("Loading...");
	loading();
	retrieveList();
};

/** share this image as blob (to wallpaper manager) */
function setWallpaper(){
	var img = new Image();
	img.crossOrigin = "Anonymous";
	var blobCanvas = document.createElement("canvas");
	blobCanvas.width = document.getElementById("preview").naturalWidth;
	blobCanvas.height = document.getElementById("preview").naturalHeight;
	var blobCanvasContext = blobCanvas.getContext("2d");
	img.onload = function() {
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
		console.log("success");
	};
	img.onerror = function(event) {
		console.log(event);
	};
	img.src = document.getElementById("preview").src;

};

/** get daily list of wallpapers */
function retrieveList(){
	return new Promise(function(resolve, reject) {
		var req = new XMLHttpRequest({ mozSystem: true });
		req.open('GET', 'https://api.gettyimages.com/v3/search/images?fields=id,title,thumb,referral_destinations&sort_order=most_popular&phrase=scenery', true);
		req.responseType = 'json';
		req.setRequestHeader("Api-Key", "3bz43wrq8374h6mfn2yr3bre");
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
	console.log(list);
	showUpdateBtn();
	var len = list.images.length;
	var image_url = list.images[Math.floor(Math.random() * len)].display_sizes[0].uri;
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
