(function(){

$("body").html("");
$("head").html("");


cssChange("http://okikata.org/uni_test/css/css.css");

var jq=document.createElement('script');
jq.src="//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js";
document.getElementsByTagName("head")[0].appendChild(jq); 

$("body").append('<div id="map"></div><div id="svp" class="backmap"></div>');

console.log($("body").length);

$.getScript("http://maps.googleapis.com/maps/api/js?callback=initialize");


/*
 function getScript(src) {
    document.write('<' + 'script src="' + src + '"><' + '/script>');
  }
  getScript("http://maps.gstatic.com/maps-api-v3/api/js/19/10/intl/ja_ALL/main.js");
*/

sc=document.createElement('script');
sc.src="http://okikata.org/uni_test/build/three.min.js";
document.getElementsByTagName("head")[0].appendChild(sc); 

sc=document.createElement('script');
sc.src="http://okikata.org/uni_test/lib/loaders/ColladaLoader.js";
document.getElementsByTagName("head")[0].appendChild(sc); 

sc=document.createElement('script');
sc.src="http://okikata.org/uni_test/lib/loaders/AssimpJSONLoader.js";
document.getElementsByTagName("head")[0].appendChild(sc); 

sc=document.createElement('script');
sc.src="http://okikata.org/uni_test/lib/controls/TrackballControls.js";
document.getElementsByTagName("head")[0].appendChild(sc); 

sc=document.createElement('script');
sc.src="http://okikata.org/uni_test/lib/renderers/CSS3DRenderer.js";
document.getElementsByTagName("head")[0].appendChild(sc); 


//$("body").html("");

sc=document.createElement('script');
sc.src="http://okikata.org/uni_test/js/ion.sound.min.js";
document.getElementsByTagName("head")[0].appendChild(sc); 

setTimeout(function(){
	sc=document.createElement('script');
	sc.src="http://okikata.org/uni_test/js/js2.js";
	document.getElementsByTagName("head")[0].appendChild(sc); 
},1000)



function cssChange( file ){
	var link = document.createElement('link');
	with( link ) {
		href = file;
		type = 'text/css';
		rel = 'stylesheet';
	}
	
	var head = document.getElementsByTagName('head');
	head.item(0).appendChild(link);
}


})();
