$(document).ready(function() {
	// $('body').click(function() {
	// 	$(location).attr('href','index04.html');
	// });

    $('.index8 video').on('timeupdate', function () {
        var ctime = parseInt(this.currentTime);
        ctime = ('0' + ctime).slice(-2);
        $('#ctime').text('00:00:' + ctime);
    });

	$('.index8 video').on('ended', function () {
        $(location).attr('href', '../9/index.html');
    });

    $('.night1 video').on('ended', function () {
        $('.btn').css('display','block');
    });

});