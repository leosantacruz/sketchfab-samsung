$(function () {
  function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  }

  function resize() {
    setTimeout(function () {
      let screen_width = localStorage.getItem("screen_width");

      if (screen_width < 565 && isMobile()) {
        $("head").append(
          '<link rel="stylesheet" href="../../css/mobile.css" type="text/css" />'
        );
      }
      if (!isMobile() || (screen_width > 565 && isMobile())) {
        $('link[href="../../css/mobile.css"]').remove();
      }
    });
  }

  window.onresize = function (event) {
    resize();
  };

  resize();
});
