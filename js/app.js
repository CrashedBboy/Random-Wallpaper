'use strict';
loading();
$(document).ready(function(){
	showUpdateBtn();
	showStatus("<< Click to update");
	$("#new_btn_wrapper").click(update);
	$("#apply_btn").click(setWallpaper);
});
