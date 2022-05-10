var iframe = document.getElementById("api-frame");

var url =
  window.location != window.parent.location
    ? document.referrer
    : document.location.href;

var client = null;
var api;
var currentRoom = 0;
let finishedProcess = 0;
let selectedItem = null;
//LOADING
let countModel = 0;
let countTexture = 0;
let interactions = {
  336: {
    title: "Pro Video",
    url: "popups/pro_video/1/",
  },
  353: {
    title: "Pro Video",
    url: "popups/pro_video/1/",
  },
  266: {
    title: "Night mode",
    url: "popups/night_mode/1/",
  },
  429: {
    title: "Night mode",
    url: "popups/night_mode/1/",
  },
  247: {
    title: "Live focus video",
    url: "popups/live_focus/1/",
  },
  410: {
    title: "Live focus video",
    url: "popups/live_focus/1/",
  },
  283: {
    title: "Space Zoom",
    url: "popups/space_zoom/1/",
  },
  372: {
    title: "Space Zoom",
    url: "popups/space_zoom/1/",
  },
  209: {
    title: "Super steady",
    url: "popups/super_steady/1/",
  },
  391: {
    title: "Super steady",
    url: "popups/super_steady/1/",
  },
};

let rooms = [
  {
    position: [259.2922295280844, -1630.2160284295944, 138.34059994146267],
    target: [294.25007557821067, -1630.157054422879, 137.54378093346944],
    title: "Pro Video",
    description:
      "Set the camera to 120fps to shoot super smooth, detailed video. Keep it in real time or slow it down for slow-motion videos with less warping, less shudder, and way more action. Then when you play it back, the display automatically shifts to 120Hz for the full effect.",
    instanceID: 336,
    hash: "provideo",
    restriction: {
      left: 1.2,
      right: 1.8,
    },
  },
  {
    position: [201.18122974928733, -2274.666289339245, 94.35264640506759],
    target: [294.3042312977306, -2274.509190514826, 92.23002770571225],
    title: "Night mode",
    description:
      "Enlarged pixel size and intelligent nonabinning give Galaxy Note20 and Note20 Ultra the power to shoot incredible color and crisp detailed photos when the lights are low. Switch to Night mode and it instantly turns multiple frames into one well-lit, clear snap.",
    instanceID: 266,
    hash: "nightmode",
    restriction: {
      left: 1.2,
      right: 1.8,
    },
  },
  {
    position: [389.779869755644, -2227.7263840518667, 114.01033735330282],
    target: [296.72432500631777, -2224.4537060297653, 116.53596154242219],
    title: "Live focus video",
    description:
      "Adjust the background depth for DSLR-like focus in your vlogs. Then heighten the magic of the scene choosing from a variety of effects and shifting their intensity: Blur, Big Circle, Color Point, and Glitch.",
    instanceID: 247,
    hash: "livefocus",
    restriction: {
      left: -1.8,
      right: -1.2,
    },
  },

  {
    position: [376.0236775583533, -1628.0147057115805, 119.69025353055736],
    target: [317.90085289473814, -1625.9705793634787, 121.2677673939796],
    title: "Super steady",
    description:
      "Epic adventures deserve to be shared, and with Super steady on Galaxy Note20 and Note20 Ultra, the action footage you shoot comes out steady and clear. Advanced AI stabilization smooths out the shot, and bigger pixels keep movement crisp.",
    instanceID: 209,
    hash: "supersteady",
    restriction: {
      left: -1.8,
      right: -1.2,
    },
  },
  {
    position: [275.76920730288515, -1679.954646348653, 118.3556706851659],
    target: [277.1503045778606, -1621.801241457768, 119.45285768267036],
    title: "Space Zoom",
    description:
      "Two women sitting on a beach. As you zoom in, you see a man doing something in the background. As you zoom in further, you see that he is building a massive sand castle.",
    instanceID: 283,
    hash: "spacezoom",
    restriction: {
      left: 3,
      right: -3,
    },
  },
];
function loadmodel() {
  var client = new Sketchfab(iframe);

  client.init(uid, {
    success: function onSuccess(apiR) {
      api = apiR;
      api.load();
      api.start();
      loading();

      api.addEventListener("viewerready", function () {
        checkFirstTime();
        checkParameter();
        setCameraPosition(0);
        setRoomInfo();
        api.setFov(70);
        // once the viewer is ready, show the iframe
        let $apiFrame = document.getElementById("api-frame");
        $apiFrame.classList.remove("hidden"); // Remove hidden class
        api.setUserInteraction(false);
      });

      api.addEventListener("annotationSelect", function (index) {
        selectAnnotation(index);
      });

      api.addEventListener("click", function (instance) {
        selectItem(instance);
      });

      resizeIframe();
    },
    error: function onError(callback) {},
    ui_stop: 0,
    ui_controls: 0,
    ui_watermark_link: 0,
    ui_watermark: 0,
    ui_infos: 0,
    ui_hint: 0,
    double_click: 0,
    camera: 0,
    scrollwheel: 0,
  });
}
loadmodel();

//LOADING
function loading() {
  api.addEventListener("modelLoadProgress", function (factor) {
    countModel = factor.progress * 100;
    loadingCount();
  });

  api.addEventListener("textureLoadProgress", function (factor) {
    countTexture = factor.progress * 100;
    loadingCount();
  });

  api.setUserInteraction(false);
}

function loadingCount() {
  let count = parseInt((countModel + countTexture) / 2);
  $(".progressLine").css({ width: count + "%" });
  if (countModel + countTexture == 200) {
    $("#loading").addClass("loaded");
    setTimeout(function () {
      $("#loading").remove();
    }, 500);
  }
}
function checkLoadingProcess() {
  finishedProcess++;

  if (finishedProcess == 2) {
    $("#loading").addClass("loaded");
    setTimeout(function () {
      $("#loading").remove();
    }, 500);
  }
}

//CAMERAS
function setCamera() {
  api.setCameraLookAt(
    [0, 13, 10], // eye position
    [0, 10, 0], // target to lookat
    4.3
  );
}

function recenterCamera() {
  api.recenterCamera(function (err) {});
}

function wideAngle() {
  api.setFov(100, function (err, angle) {
    if (!err) {
    }
  });
}

function normalAngle() {
  api.setFov(40, function (err, angle) {
    if (!err) {
    }
  });
}

function getCameraPosition() {
  api.getCameraLookAt(function (err, camera) {
    let ob = {
      position: camera.position,
      target: camera.target,
    };

    return camera;
  });
}

function nextCamera() {
  if (currentRoom == rooms.length - 1) {
    currentRoom = 0;
  } else {
    currentRoom++;
  }
  //IS NIGHT MODE

  if (currentRoom == 2) {
    gotoLiveFocus();
  } else {
    setCameraPosition(4);
  }

  setRoomInfo();
}
function prevCamera() {
  if (currentRoom == 0) {
    currentRoom = rooms.length - 1;
  } else {
    currentRoom--;
  }
  setCameraPosition(4);

  //IS FOCUS LIVE

  if (currentRoom == 1) {
    gotoNightMode();
  } else {
    setCameraPosition(4);
  }

  setRoomInfo();
}

$(document).on("click", "#navMenu .title", function () {
  let id = $(this).attr("data-instanceID");
  selectItem({ instanceID: id });
});

function setRoomInfo() {
  $("#navMenu .title").addClass("fadeOut");

  setTimeout(function () {
    $("#navMenu .title").attr("data-instanceID", rooms[currentRoom].instanceID);
    $("#navMenu .title").html(rooms[currentRoom].title);
    $("#navMenu .title").removeClass("fadeOut");
  }, 500);
}

function disableButtons() {
  $("#navMenu .arrow_right,#navMenu .arrow_left").removeClass("disabled");
  if (currentRoom == rooms.length - 1) {
    $("#navMenu .arrow_right").addClass("disabled");
  }
  if (currentRoom == 0) {
    $("#navMenu .arrow_left").addClass("disabled");
  }
}

function setRestriction() {
  api.getCameraLookAt(function (err, camera) {
    let right = $("#right").val();
    let left = $("#left").val();
    api.setEnableCameraConstraints(true);
    api.setCameraConstraints({
      usePanConstraints: true,
      left: parseFloat(left),
      right: parseFloat(right),
      position: camera.position,
      target: camera.target,
      useYawConstraints: true,
    });
  });
}

function setCameraPosition(speed) {
  api.setUserInteraction(false);
  api.setEnableCameraConstraints(false);
  api.setCameraLookAt(
    rooms[currentRoom].position, // eye position
    rooms[currentRoom].target, // target to lookat
    speed
  );

  api.setCameraLookAtEndAnimationCallback(function () {
    api.setUserInteraction(true);
    api.setEnableCameraConstraints(true);
    api.setCameraConstraints({
      left: rooms[currentRoom].restriction.left,
      right: rooms[currentRoom].restriction.right,
      position: rooms[currentRoom].position,
      target: rooms[currentRoom].target,
      useYawConstraints: true,
    });
  });
}

function gotoLiveFocus() {
  api.setUserInteraction(false);
  api.setEnableCameraConstraints(false);

  api.setCameraLookAt(
    [298.9365222151107, -2131.4102101465687, 116.64494526990582],
    [296.72432500631777, -2224.453706029765, 116.53596154242219],
    3
  );
  setTimeout(function (r) {
    api.setCameraLookAt(
      [389.779869755644, -2227.7263840518667, 114.01033735330282],
      [296.72432500631777, -2224.4537060297653, 116.53596154242219],
      3
    );

    api.setCameraLookAtEndAnimationCallback(function () {
      api.setUserInteraction(true);
      api.setEnableCameraConstraints(true);
      api.setCameraConstraints({
        left: rooms[currentRoom].restriction.left,
        right: rooms[currentRoom].restriction.right,
        position: [389.779869755644, -2227.7263840518667, 114.01033735330282],
        target: [296.72432500631777, -2224.4537060297653, 116.53596154242219],
        useYawConstraints: true,
      });
    });
  }, 1000);
}

function gotoNightMode() {
  api.setCameraLookAt(
    [298.9365222151107, -2131.4102101465687, 116.64494526990582],
    [296.72432500631777, -2224.453706029765, 116.53596154242219],
    3
  );
  setTimeout(function (r) {
    api.setCameraLookAt(
      [201.18122974928733, -2274.666289339245, 94.35264640506759],
      [294.3042312977306, -2274.509190514826, 92.23002770571225],
      3
    );
  }, 1000);
}

function shakingCamera() {
  let currentPosition = getCameraPosition();
}

function selectItem(selectedItem) {
  if (selectedItem.instanceID != 283 && selectedItem.instanceID != 372) {
    popup(selectedItem.instanceID);
  }
  //SPACE ZOOM

  if (
    (selectedItem.instanceID == 283 || selectedItem.instanceID == 372) &&
    currentRoom == 4
  ) {
    $("body").addClass("no-clickeable");
    api.setCameraLookAt(
      [285.9177153349512, -1253.2998083565176, 122.69666496996736],
      [285.9241032068231, -1252.1214295908912, 122.70703509890545],
      4
    );
    setTimeout(function (r) {
      $("body").removeClass("no-clickeable");
      popup(283);
    }, 3000);
  }
}

function popup(id) {
  if (interactions[id]) {
    $(".resp-container").append(
      '<iframe scrolling="no" style="overflow-x: hidden;" src="' +
        interactions[id].url +
        '" frameborder="0"></iframe>'
    );
    resizeIframe();
    $("#popupContainer").addClass("active");
  }
}

function closePopup() {
  $("#popupContainer").removeClass("active");
  setTimeout(function () {
    $(".resp-container iframe").remove();
  }, 500);

  //ZOOM
  if (currentRoom == 4) {
    api.setCameraLookAt(
      [275.76920730288515, -1679.954646348653, 118.3556706851659],
      [277.1503045778606, -1621.801241457768, 119.45285768267036],
      3
    );
  }
}

function closeHintPopup() {
  localStorage.setItem("visited", true);
  $("#hintPopup").addClass("removing");
  setTimeout(function () {
    $("#hintPopup").remove();
  }, 300);
}
function checkFirstTime() {
  if (localStorage.getItem("visited")) {
    $("#hintPopup").remove();
  } else {
    $("#hintPopup").show();
  }
}

//LIGHTS
function getLights() {
  api.getLight(2, function (err, state) {});
}

function setLights(mode) {
  api.setLight(0, {
    intensity: 1,
    enabled: !mode,
  });
  api.setLight(1, {
    intensity: 1,
    enabled: mode,
  });
  api.setLight(2, {
    intensity: 1,
    enabled: mode,
  });
}

function smoothLight() {
  var i = 0.05;

  function myLoop() {
    setTimeout(function () {
      api.setLight(0, {
        intensity: 1 - i,
        enabled: true,
      });

      api.setLight(1, {
        intensity: i,
        enabled: true,
      });

      api.setLight(2, {
        intensity: i,
        enabled: true,
      });

      i = i + 0.01;
      if (i < 1) {
        myLoop();
      }
    }, 20);
  }

  myLoop();
}

function smoothNight() {
  var i = 0.05;

  function myLoop() {
    setTimeout(function () {
      api.setLight(0, {
        intensity: i,
        enabled: true,
      });

      api.setLight(1, {
        intensity: 1 - i,
        enabled: true,
      });

      api.setLight(2, {
        intensity: 1 - i,
        enabled: true,
      });

      i = i + 0.01;
      if (i < 1) {
        myLoop();
      }
    }, 20);
  }

  myLoop();
}

//OBJECTS
function listNodes() {
  api.getNodeMap(function (err, nodes) {
    if (!err) {
    }
  });
}
function showObject(value) {
  if (!value) {
    api.hide(337);
  } else {
    api.show(337);
  }
}

//ANNOTATIONS
let annotations = [
  {
    position: [183.43194491494, -2220.3881082425837, 126.21924241840465],
    target: [170.7143966777083, -2224.5003718505577, 125.58993291290535],
    position: [183.43194491494, -2220.3881082425837, 126.21924241840465],
    target: [170.7143966777083, -2224.5003718505577, 125.58993291290535],
    title: "Picture",
    text: "",
  },
];
function getAnnotationlist() {
  api.getAnnotationList(function (err, annotations) {
    if (!err) {
    }
  });
}

function setCameraAnnotation() {
  api.getCameraLookAt(function (err, camera) {
    api.createAnnotationFromScenePosition(
      camera.target,
      camera.position,
      camera.target,
      "mytitle2",
      "mytext2",
      function (err, index) {
        if (!err) {
        }
      }
    );
  });
}
function addAnnotation() {
  api.createAnnotation(
    annotations[0].position,
    annotations[0].target,
    annotations[0].position,
    annotations[0].target,
    annotations[0].title,
    annotations[0].text
  );
}

function goToAnnotation() {
  api.gotoAnnotation(
    0,
    { preventCameraAnimation: false, preventCameraMove: false },
    function (err, index) {
      if (!err) {
        setTimeout(function () {
          showObject(false);
        }, 2000);
      }
    }
  );
}

function selectAnnotation(index) {
  getCameraPosition();
  if (index == 0) {
    $("#modal-container").removeAttr("class").addClass("six");
    $("body").addClass("modal-active");
  }
}

//SCREENSHOT
function screenshot() {
  api.getScreenShot("image/png", function (err, result) {
    if (!err) {
      var a = document.createElement("a");
      a.href = result;
      a.download = "image.png";

      a.click();
    }
  });
}

//MENU
$("#menu_button").click(function () {
  $("#menu").toggle();
});

$("#six").click(function () {
  var buttonId = "six";
  $("#modal-container").removeAttr("class").addClass("six");
  $("body").addClass("modal-active");
});

$("#modal-container").click(function () {
  $(this).addClass("out");
  $("body").removeClass("modal-active");
});

//RESIZE MOBILE

function resizeIframe() {
  let windows_height = $(window).height();
  $(".resp-container svg").hide().removeClass("limit");
  localStorage.setItem("screen_width", window.innerWidth);
  //VERTICAL
  if (window.innerWidth < 565 && isMobile()) {
    $(".resp-container svg.vertical").show().addClass("limit");
    let img_width = $(".resp-container svg.vertical").width();
    let img_height = $(".resp-container svg.vertical").height();
    $(".resp-container iframe").height(img_height);
    $(".resp-container iframe").width(img_width);
    $(".resp-container").css("margin-top", "50px");
  }
  //HORIZONTAL
  if (!isMobile() || (window.innerWidth > 565 && isMobile())) {
    $(".resp-container svg.horizontal").show();
    let img_height = $(".resp-container svg.horizontal").height();
    let img_width = $(".resp-container svg.horizontal").width();
    $(".resp-container iframe").height(img_height);
    $(".resp-container iframe").width(img_width);
    $(".resp-container").css("margin-top", windows_height / 2 - img_height / 2);
  }
}

function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

function checkParameter() {
  rooms.forEach(function (r, i) {
    if (url.includes(r.hash)) {
      currentRoom = i;
    }
  });
}
window.onresize = function (event) {
  resizeIframe();
};
