$(document).ready(function () {
    // $('.index9 video:visible')[0].playbackRate = 0.25;
	

	$('.index9 .content img').on('click',function(){
		if($(this).attr('src') == '../../images/speed4.png'){
			$(this).attr('src','../../images/speed1.png');
			// $('.index9 video.ds_pc.slow_on').hide();
			// $('.index9 video.ds_pc.slow_off').show();
			// $('.index9 video.ds_mb.slow_off').hide();
			// $('.index9 video.ds_mb.slow_on').hide();
			// $('.index9 video:visible')[0].playbackRate = 1;
		}else if($(this).attr('src') == '../../images/speed1.png') {
			$(this).attr('src','../../images/speed4.png');
			// $('.index9 video.ds_pc.slow_off').hide();
			// $('.index9 video.ds_pc.slow_on').show();
			// $('.index9 video.ds_mb.slow_off').hide();
			// $('.index9 video.ds_mb.slow_on').hide();
			// $('.index9 video:visible')[0].playbackRate = 0.25;
		} else if($(this).attr('src') == '../../images/speed4m.png') {
			$(this).attr('src', '../../images/speed1m.png');
			$('.index9 video.ds_mb.slow_on').hide();
			$('.index9 video.ds_mb.slow_off').show();
			// $('.index9 video.ds_pc.slow_on').hide();
			// $('.index9 video.ds_pc.slow_off').hide();
			// $('.index9 video:visible')[0].playbackRate = 1;
		} else if($(this).attr('src') == '../../images/speed1m.png') {
			$(this).attr('src', '../../images/speed4m.png');
			// $('.index9 video.ds_mb.slow_off').hide();
			// $('.index9 video.ds_mb.slow_on').show();
			// $('.index9 video.ds_pc.slow_on').hide();
			// $('.index9 video.ds_pc.slow_off').hide();
			// $('.index9 video:visible')[0].playbackRate = 0.25;
		}
	})
});