$(document).ready(function() {
	// $('body').click(function() {
	// 	$(location).attr('href','index04.html');
	// });

    $('.live06 video').on('timeupdate', function () {
        var ctime = parseInt(this.currentTime);
        ctime = ('0' + ctime).slice(-2);
        $('#ctime').text('00:00:' + ctime);
    });

	$('.live06 video').on('ended', function () {
        $(location).attr('href', 'live07.html');
    });

});