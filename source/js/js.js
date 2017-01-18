var this_url = location.href;

//表示するサイトのURL
this_url = "/";


var ua = navigator.userAgent;
var device;
if(ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0){
	device = "sp";
}else if(ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0){
	device = "tab";
}else{
	device = "pc";
}


var camera, scene, renderer;
var scene2, renderer2;
var controls;

var loader = new THREE.ColladaLoader();
var loader2 = new THREE.ColladaLoader();

var camx,camy,camz;
var tar_camx,tar_camy,tar_camz;
camx = 0;
camy = 0;
camz = 1000;

tar_camx = 0;
tar_camy = 0;
tar_camz = 1000;

loader.options.convertUpAxis = true;
loader2.options.convertUpAxis = true;

var bg_sp;
var bg_rot = 0;

var dae,dae2;

var cam_angle1 = 0;
var cam_angle2 = 0;
var cam_distance = 0;
var cam_distance_norm = 0;
//
var _random = 0;

var p1 = 0;
var p2 = 0;
var onProgress1 = function ( callback ) {
	var percent = Math.floor((callback.loaded / callback.total) * 100.);
	p1 = percent;
	setTotalProgress();
};

var onProgress2 = function ( callback ) {
	var percent = Math.floor((callback.loaded / callback.total) * 100.);
	p2 = percent;
	setTotalProgress();
};

function setTotalProgress(){
	var totalProgress = Math.floor((p1+p2)/2);
	$("#progress .progress_inner").html(totalProgress+"% loaded");
}

$(function(){
	getpos();
	$("body").append("<div id='loading'>↻</div>");
	$("body").append("<div id='progress'><div class='progress_inner'></div></div>");

	_random = Math.floor(Math.random()*(23-1)+1);
	if(_random < 10){
		_random = "0"+_random;
	}
	if(device == "pc"){
		var _audio = '<audio preload="auto" autoplay loop>';
		_audio += '<source src = "sound/'+_random+'.mp3">';
		_audio += '<source src = "sound/'+_random+'.ogg">';
		_audio += '</audio>';

		$("body").append(_audio);

	}

	if(device == "sp" || device == "tab"){
		ion.sound({
			sounds: [
			{
				name: _random
			}],
			volume: 0.5,
			path: "sound/",
			preload: true
		});

		$("body").on("touchstart",function(){
			ion.sound.play(_random, {
				loop: true
			});
		})
	}
})

function kick(){

	if(device == "pc" || device == "tab"){
		loader.load( 'model/macbook.dae', function ( collada ) {
			dae = collada.scene;
			dae.scale.x = dae.scale.y = dae.scale.z = 100;
			dae.updateMatrix();
			dae.rotation.x = 15 * (Math.PI/180);
			dae.position.y = 0;
			dae.position.z = 0;
			dae.position.x = 0;

			loader2.load( 'model/arm1.dae', function ( collada ) {
				dae2 = collada.scene;
				dae2.scale.x = dae2.scale.y = dae2.scale.z = 40;
				dae2.updateMatrix();
				dae2.rotation.x = 15 * (Math.PI/180);

				dae2.position.y = -650;
				dae2.position.z = 900;
				dae2.position.x = 0;

				init();
				animate();
			},onProgress2);

		},onProgress1);
	}else if(device == "sp"){
		$("body").addClass("sp");
		loader.load( 'model/iphone.dae', function ( collada ) {
			dae = collada.scene;
			dae.scale.x = dae.scale.y = dae.scale.z = 162;
			dae.updateMatrix();
			dae.rotation.y = 180 * (Math.PI/180);
			dae.position.y = 0;
			dae.position.z = 0;
			dae.position.x = 0;

			loader2.load( 'model/arm2.dae', function ( collada ) {
				dae2 = collada.scene;
				dae2.scale.x = dae2.scale.y = dae2.scale.z = 300;
				dae2.updateMatrix();
				dae2.rotation.x = 80 * (Math.PI/180);

				dae2.position.y = 10;
				dae2.position.z = 80;
				dae2.position.x = 0;

				init();
				animate();
			});

		});
	}
}

function init() {


	camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000000 );
	camera.position.set( 0, 0, 1000 );
	var look = new THREE.Vector3( 0, 0, 0 );

	//controls = new THREE.TrackballControls( camera );

	scene = new THREE.Scene();
	scene2 = new THREE.Scene();

	var material = new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true, wireframeLinewidth: 1, side: THREE.DoubleSide } );
	var element = document.createElement( 'div' );
	element.setAttribute("class","p_0");
	element.style.width = '1024px';
	element.style.height = '600px';
	if(device == "sp"){
		element.style.width = '375px';
		element.style.height = '667px';
	}

	element.style.opacity = 1;
	element.style.background = new THREE.Color( 0xffffff ).getStyle();

	var object = new THREE.CSS3DObject( element );
	object.position.y = 50;
	if(device == "sp"){
		object.position.y = 10;
	}

	scene2.add( object );
	var geometry = new THREE.PlaneGeometry( 100, 100 );
	var mesh = new THREE.Mesh( geometry, material );
	mesh.position.copy( object.position );
	mesh.rotation.copy( object.rotation );
	mesh.scale.copy( object.scale );
	scene.add( dae );
	scene.add( dae2 );
	//scene.add( mesh );


	scene.add( new THREE.AmbientLight( 0x000000 ) );

	var directionalLight = new THREE.DirectionalLight(/*Math.random() * 0xffffff*/0xffffff );
	directionalLight.position.x = 0;
	directionalLight.position.y = 1000;
	directionalLight.position.z = 1000;
	directionalLight.position.normalize();
	scene.add( directionalLight );


	renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
	renderer.setClearColor( 0x000000,0 );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	renderer2 = new THREE.CSS3DRenderer();
	renderer2.setSize( window.innerWidth, window.innerHeight );
	renderer2.domElement.style.position = 'absolute';
	renderer2.domElement.style.top = 0;
	document.body.appendChild( renderer2.domElement );



	setTimeout( function(){
		if(device == "pc" || device == "tab"){
			$("div.p_0").append("<div class ='iframe_wrap'><iframe src='/inbrowser/' style='width:1024px;height:600px; border:0;'></iframe></div>");
		}else if(device == "sp"){
			$("div.p_0").append("<div class ='iframe_wrap'><iframe src='/inbrowser/' style='width:375px;height:627px; border:0;'></iframe></div>");
		}
		setcursor();
	},0);

	review();

	setInterval(function(){

		if(device == "sp"){
			tar_camx = (Math.random()-0.5)*5000;
			tar_camy = (Math.random()-0.2)*3000;
			tar_camz = 900 + Math.random()*2500;
		}else{
			tar_camx = (Math.random()-0.5)*5000;
			tar_camy = (Math.random()-0.2)*3000;
			tar_camz = 900 + Math.random()*5000;
		}

	},3000)

	$("#loading").remove();
	$("#progress").remove();

}

function animate() {
	review();
	requestAnimationFrame( animate );
	camx += (tar_camx-camx)/100.;
	camy += (tar_camy-camy)/100.;
	camz += (tar_camz-camz)/100.;
	bg_rot += 0.2;

	cam_angle1 = (Math.atan2(0 - camx, 0 - camz))*(180/Math.PI) - bg_rot;
	cam_angle2 = (Math.atan2(0 - camz, 0 - camy))*(180/Math.PI);

	cam_distance = Math.sqrt(Math.pow(0-camx,2)+Math.pow(0-camy,2)+Math.pow(0-camz,2));

	cam_distance_norm = 1.0-(cam_distance-1000)/6000;
	//controls.update();
	camera.position.set( camx, camy, camz );
	camera.lookAt({x:0,y:0,z:0});

	renderer.render( scene, camera );
	renderer2.render( scene2, camera );

}
function setcursor(){

	$("iframe").on("load", function () {
		$("iframe").contents().find("html,body").on("mousemove",function(e){
			var ox=e.clientX - (1024/2);
			var oy=e.clientY - (600/2);
			dae2.position.set( ox/2, -650 , 800 + oy/2 );
		});
	})



}
//




//google.maps.event.addDomListener(window, 'load', setmap);
var panorama;
var sightseeing;

function setmap(_lat, _lang){

	//35.715274,139.776022
	var latlang;
	if(_lat){
		latlang = new google.maps.LatLng(_lat, _lang);
	}else{
		latlang = new google.maps.LatLng(36.732633,138.462177);
	}
	//var latlang = new google.maps.LatLng(36.732633,138.462177);

	panorama = new google.maps.StreetViewPanorama(document.getElementById('svp'), {
		position : latlang,
		streetViewControl : false,
		panControl : false,
		zoomControl : false,
		addressControl : false,
		linksControl : false,
		enableCloseButton : false,
		motionTracking: false,
		motionTrackingControl: false
	});
	//map.setStreetView(panorama);
	panorama.setPov({heading:0, pitch:90, zoom:1.8});
	if(device == "sp"){
		panorama.setPov({heading:0, pitch:90, zoom:2.8});
	}

	//
	kick();

}

function review(){
	//chromeだとzoomしても重くないよ！
	//if(device != "sp"){
		panorama.setPov({heading:-cam_angle1, pitch:90+cam_angle2/*, zoom:cam_distance_norm*2*/});
	//}
}

//getpos();
function getpos(){
	if(navigator.geolocation){
		//現在地を取得
		navigator.geolocation.getCurrentPosition(

			//[第1引数] 取得に成功した場合の関数
			function(position){

				//取得したデータの整理
				var data = position.coords;
				//データの整理
				var lat = data.latitude;
				var lng = data.longitude;
				var alt = data.altitude;
				var accLatlng = data.accuracy;
				var accAlt = data.altitudeAccuracy;
				var heading = data.heading;			//0=北,90=東,180=南,270=西
				var speed = data.speed;
				setmap(lat, lng)

			},
			function(error){
				//UNKNOWN_ERROR
				//PERMISSION_DENIED
				//POSITION_UNAVAILABLE
				//TIMEOUT
				var errorInfo = [
				"原因不明のエラーが発生しました…。",
				"位置情報の取得が許可されませんでした…。",
				"電波状況などで位置情報が取得できませんでした…。",
				"位置情報の取得に時間がかかり過ぎてタイムアウトしました…。"
				];

				var errorNo = error.code;
				setmap();
			},
			{
				"enableHighAccuracy": false,
				"timeout": 8000,
				"maximumAge": 4000,
			}

			);

	//対応していない場合
} else {
		//エラーメッセージ
		var errorMessage = "";

	}
}
