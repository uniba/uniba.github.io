if(!navigator.userAgent.match(/(iPhone|iPad|Android)/)) {
	$(function(){
		// アンカーリンク時は動作させない
		var hashName = location.hash;
		if(!hashName)
		{
			// スクロールに従って表示
			viewScroll();
		}
	});

	// スクロールに従って表示
	function viewScroll()
	{
		// 初期設定
		var name	= '.screenshots';	// 対象のクラス名
		var MSIE	= /*@cc_on!@*/false;
		var objFlg	= new Array();
		var objH	= new Array();
		var lastFlg	= false;
		
		$(name).each(function(i){
			// 表示判定用
			objFlg[i]	= false;
			
			// 高さ取得
			objH[i]	= $(this).offset().top;
		});
		// 消去
		$(name).hide();
		
		// スクロール前チェック
		viewCheck(name, MSIE, objFlg, objH);
		
		// スクロール毎チェック
		$(window).scroll(function()
		{
			// 表示判定
			if(!lastFlg)
			{
				viewCheck(name, MSIE, objFlg, objH);
			}
		});
		
		// アンカーリンク時
		if(!lastFlg)
		{
			$("a[href*=#]").click(function() {
				// 全て表示
				$(name).show();
				lastFlg = true;
			});
		}
	}

	//grobal method
	 var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
	 window.requestAnimationFrame = requestAnimationFrame;

	// 表示判定
	function viewCheck(name, MSIE, objFlg, objH)
	{
		var winH;
		
		// スクロール量 取得
		if(MSIE)
		{
			winH = document.documentElement.clientHeight;
		}
		else
		{
			winH = innerHeight;
		}
		var scrTop = $(window).scrollTop() + winH;
		
		$(name).each(function(i){
			if ( scrTop >= objH[i] && !objFlg[i] )
			{
				objFlg[i] = true;
				// 最後まで表示されたか
				if( objFlg[objFlg.length-1] )
				{
					lastFlg = true;
				}
				$(this).fadeIn(300);
			}
		});
	}

	window.visibleW = $('#container').width(); 
	$(function(){
		var animationID;
		var $target;
		var end;
		//init...
		$('.screenshots ul').each(function(index, el) {
			var end = $(this).innerWidth();
			$(this).data("pos",0).data('end',end);
		});
		$('.screenshots ul').on({
			'mouseenter':function(){
				$target = $(this);
				end = $(this).data('end');
				animationID = setInterval(function(){slideFilms($target,end)},1000/24);
			},
			'mouseleave':function(){
				clearInterval(animationID);
				if ($(this).hasClass('END')) {
					$(this).animate({
						'margin-left': 0},
						300, function(){
							$(this).removeClass('END');
							$(this).data('pos', 0);
					});
				}
			}
		});
		$(window).resize(function(event) {
			window.visibleW = $('#container').width(); 
		});
	});
	//hover でスライド
	function slideFilms($el,end){
		var pos = $el.data('pos');
		var w = $(container)
		//check now position...
		if(window.visibleW - end > pos){
			console.log(window.visibleW*2 - end , pos);
			$el.addClass('END');
			return;
		}
		console.log(window.visibleW - end , pos);
		$el.css('margin-left',pos-10);
		$el.data('pos',pos-10);
	}
}