/**
 * @source https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/timeout
 */
"use strict";

function loadFonts(sUrl, timeout, callback) {

  var args = Array.prototype.slice.call(arguments, 3),
      xhr = new XMLHttpRequest();
  xhr.ontimeout = function () {
    console.error("The request for " + sUrl + " timed out.");
	};
	xhr.onload = function () {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				callback.apply(xhr, args);
				console.log("Fonts Loaded!");
			} else {
				console.error(xhr.statusText);
			}
		}
	};
	xhr.open("GET", sUrl, true);
	xhr.timeout = timeout;
	xhr.send(null);
}

function inject(m) {
	var e = this.responseText,
		a = document.getElementsByTagName( "script" )[0],
		s = document.createElement("style");
	s.media = "only screen";
	s.innerHTML = e;
	if ("undefined" != typeof s) {
		document.getElementsByTagName("head")[0].appendChild(s);
	}
}

// Loads fonts
loadFonts('https://fonts.googleapis.com/css?family=Open+Sans|Noto+Sans', 1500, inject);
