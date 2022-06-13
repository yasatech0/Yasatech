(function (w, doc, scr, nav, key, legacy, urlHit, urlEvt, xhr, axo, img) {
	var k = w[key];

	w[legacy] = w[legacy] || [];
	for (var i = 0; i < w[legacy].length; i++) {
		w[k](w[legacy][i][0], w[legacy][i][1]);
	}

	w[k].p = function (op, tc, data, idx) {
		if (!tc) return;

		var u = w.location.href;
		var p = u.split("/")[0];
		data = data || {};

		try {
			switch (op) {
				case "wait":
				case "pageview_after_render":
					if (doc.body == null) {
						w.setTimeout(function () {
							w[k].c();
						}, 100);
						return;
					}

					w[k].p("pageview", tc, data, idx);
					return;

				case "immediate":
				case "pageview":
					if (idx != null && idx >= 0) w[k].q[idx].sent = true;

					var r = encodeURIComponent(
						doc.referrer.replace(/<\/?[^>]+(>|$)/g, "")
					);
					img = doc.createElement("img");
					img.src =
						p +
						urlHit +
						scr.width +
						"|" +
						scr.height +
						"|" +
						r +
						"|" +
						tc +
						"|" +
						encodeURIComponent(u.replace(/<\/?[^>]+(>|$)/g, "")) +
						"|" +
						nav.userAgent;
					img.style.display = "none";
					doc.body.appendChild(img);
					return;

				case "event":
					if (idx != null && idx >= 0) w[k].q[idx].sent = true;

					img = doc.createElement("img");
					img.src =
						p +
						urlEvt +
						"/event.png?trackingCode=" +
						tc +
						"&eventName=" +
						(data.eventName && encodeURIComponent(data.eventName)) +
						"&userName=" +
						(data.userName && encodeURIComponent(data.userName)) +
						"&userEmail=" +
						(data.userEmail && encodeURIComponent(data.userEmail));
					img.style.display = "none";
					doc.body.appendChild(img);
					return;

				// var req = new (xhr || axo)("MSXML2.XMLHTTP.3.0");
				// req.open("POST", p + urlEvt, 1);
				// req.setRequestHeader("X-Requested-With", "XMLHttpRequest");
				// req.setRequestHeader("Content-type", "application/json");
				// data.trackingCode = tc;
				// req.send(JSON.stringify(data));
				// return;
			}
		} catch (e) {
			w && w.console && w.console.error(e);
		}
	};

	w[k].c = function () {
		for (var i = 0; i < w[k].q.length; i++) {
			if (!w[k].q[i].sent) w[k].p(w[k].q[i][0], w[k].q[i][1], w[k].q[i][2], i);
		}
	};

	w[k].c();
})(
	window,
	document,
	screen,
	navigator,
	"WivObjKey",
	"whoistrack_params",
	"//dashboard.whoisvisiting.com/who.ashx?Type=Hit&Data=",
	"//iptrack.io/api/v1/events",
	this.XMLHttpRequest,
	window.ActiveXObject
);
