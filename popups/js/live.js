$(document).ready(function() {
	// $('body').click(function() {
	// 	$(location).attr('href','index04.html');
	// });

    $('.live05 video').on('timeupdate', function () {
        var ctime = parseInt(this.currentTime);
        ctime = ('0' + ctime).slice(-2);
        $('#ctime').text('00:00:' + ctime);
    });

    $('.live06 video').on('timeupdate', function () {
        var ctime = parseInt(this.currentTime);
        ctime = ('0' + ctime).slice(-2);
        $('#ctime').text('00:00:' + ctime);
    });

    $('.live07 video').on('timeupdate', function () {
        var ctime = parseInt(this.currentTime);
        ctime = ('0' + ctime).slice(-2);
        $('#ctime').text('00:00:' + ctime);
    });

    $('.live08 video').on('timeupdate', function () {
        var ctime = parseInt(this.currentTime);
        ctime = ('0' + ctime).slice(-2);
        $('#ctime').text('00:00:' + ctime);
    });

    $('.live08 video').on('ended', function () {
        $(location).attr('href', '../1/index.html');
    });

    $('.super04 video').on('timeupdate', function () {
        var ctime = parseInt(this.currentTime);
        ctime = ('0' + ctime).slice(-2);
        $('#ctime').text('00:00:' + ctime);
    });

    $('.super04 video').on('ended', function () {
        $(location).attr('href', '../5/index.html');
    });

});