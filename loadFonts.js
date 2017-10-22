/**
 * @source https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/timeout
 */
"use strict";

function loadFonts(sUrl, timeout, callback) {

  console.time("Process");

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
		console.timeEnd("Process");
	};
	xhr.open("GET", sUrl, true);
	xhr.timeout = timeout;
	xhr.send(null);
}

function inject(m) {
	var e = this.responseText,
	        h = document.getElementsByTagName('head')[0],
		a = document.getElementsByTagName('link')[0],
		s = document.createElement("style");
	s.media = "only screen";
	s.innerHTML = e;
	if ("undefined" != typeof s) {
		h.insertBefore(h.appendChild(s), a);
	}
}

// Loads fonts
loadFonts('https://fonts.googleapis.com/css?family=Open+Sans|Noto+Sans', 1500, inject);
