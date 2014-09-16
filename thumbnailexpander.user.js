// ==UserScript==
// @name                Thumbnailexpander
// @version             1.5
// @namespace           http://www.drossy.net
// @grant               none
// @updateURL           https://github.com/drossy/Thumbnailexpander/raw/master/thumbnailexpander.user.js
// @description         Expands a thumbnail image to a link to the image
// ==/UserScript==


var Results = document.evaluate("//img", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

var imagebam_regexp=/http:\/\/[a-z0-9]+\.imagebam\.com\/[0-9]+\/(.*)/;
var turboimage_regexp=/http:\/\/[a-z0-9]+\.turboimagehost\.com\/t[0-9]*\/([^_]+)_(.*)/;
var imagehavennet_regexp=/http:\/\/([a-z0-9]+)\.imagehaven\.net\/img\/thumbs\/(.*)/;
var imagevenuecom_regexp=/http:\/\/([a-z0-9]+)\.imagevenue\.com\/loc[0-9]+\/th_(.*)/;
var imgbox_regexp=/http:\/\/([0-9]\.)?t\.imgbox.com\/(.*)/;

for (var i = Results.snapshotLength - 1; i >= 0; i--) {
		var elmImage = Results.snapshotItem(i);
		var urlSrc   = elmImage.src;
		var replstr  = "";
		
		if ( matches = urlSrc.match(imagebam_regexp) ) {
			replstr= "http://www.imagebam.com/image/"+matches[1];
			
		} else if (matches = urlSrc.match(turboimage_regexp) ) {
			replstr = "http://www.turboimagehost.com/p/"+matches[1]+"/"+matches[2]+".html";
			
		} else if (matches = urlSrc.match(imagehavennet_regexp) ) {
			replstr = "http://"+matches[1]+".imagehaven.net/img.php?id="+matches[2];

		} else if (matches = urlSrc.match(imagevenuecom_regexp) ) {
			replstr = "http://"+matches[1]+".imagevenue.com/img.php?image="+matches[2];

		} else if (matches = urlSrc.match(imgbox_regexp) ) {
				replstr = "http://imgbox.com/"+matches[2];
		
		} else {
			// No match so move onto the next image
			continue;
		}
		
		var elmNewContent = document.createElement('a');
		elmNewContent.href = replstr;
		elmImage.parentNode.replaceChild(elmNewContent,elmImage);
		elmNewContent.appendChild(elmImage);
		
}
