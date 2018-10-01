/**
 * @source https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/timeout
 */
function loadFonts(sUrl, timeout, width) {

	if (width < (window.innerWidth || document.documentElement.clientWidth || document.getElementBbyTagName("body").clientWidth)) {

		if (typeof console!='undefined') console.time("Process");

		var args = Array.prototype.slice.call(arguments, 3),
	    	    xhr = new XMLHttpRequest();
		xhr.ontimeout = function () {
			console.error("The request for " + sUrl + " timed out.");
		};
		xhr.onload = function () {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					inject.apply(xhr, args);
					console.log("Fonts Loaded!");
				} else {
					console.error(xhr.statusText);
				}
			}
			if (typeof console!='undefined') console.timeEnd("Process");
		};
		xhr.open("GET", sUrl, true);
		xhr.timeout = timeout;
		xhr.send(null);
	}
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
loadFonts('https://fonts.googleapis.com/css?family=Open+Sans%7CNoto+Sans', 1500, 680);
