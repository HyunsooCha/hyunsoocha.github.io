window.HELP_IMPROVE_VIDEOJS = false;

// SHOULD CHECK KEYS FOR NUM_INTERP_FRAMES, INTERP_BASES, interp_images
var NUM_INTERP_FRAMES = {
  beard: 20,
  hair: 20,
  hat: 20,
  eyebrows: 40,
  mouth: 40,
  transfer: 30,
};

var INTERP_BASES = {
  beard: "./static/images/interpolation/beard/stacked",
  hair: "./static/images/interpolation/hair/stacked",
  hat: "./static/images/interpolation/hat/stacked",
  eyebrows: "./static/images/interpolation/eyebrows/stacked",
  mouth: "./static/images/interpolation/mouth/stacked",
  transfer: "./static/images/interpolation/transfer1/stacked",
};

var interp_images = {
  beard: [],
  hair: [],
  hat: [],
  eyebrows: [],
  mouth: [],
  transfer: [],
};

// 이미지 프리로드 함수
function preloadInterpolationImages(attribute) {
  for (var i = 0; i < NUM_INTERP_FRAMES[attribute]; i++) {
    var path =
      INTERP_BASES[attribute] + "/" + String(i).padStart(4, "0") + ".jpg";
    interp_images[attribute][i] = new Image();
    interp_images[attribute][i].src = path;
  }
}

// 이미지 설정 함수
function setInterpolationImage(attribute, i) {
  var image = interp_images[attribute][i];
  image.ondragstart = function () {
    return false;
  };
  image.oncontextmenu = function () {
    return false;
  };
  $("#" + attribute + "-image-wrapper")
    .empty()
    .append(image);
}

// var interp_images = [];
// function preloadInterpolationImages() {
//   for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
//     var path = INTERP_BASE + '/' + String(i).padStart(6, '0') + '.jpg';
//     interp_images[i] = new Image();
//     interp_images[i].src = path;
//   }
// }

// function setInterpolationImage(i) {
//   var image = interp_images[i];
//   image.ondragstart = function() { return false; };
//   image.oncontextmenu = function() { return false; };
//   $('#interpolation-image-wrapper').empty().append(image);
// }

$(document).ready(function () {
  // Check for click events on the navbar burger icon

  var options = {
    slidesToScroll: 1,
    slidesToShow: 1,
    loop: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 10000,
  };

  // Initialize all div with carousel class
  var carousels = bulmaCarousel.attach(".carousel", options);

  // 속성별 이미지 프리로드
  Object.keys(INTERP_BASES).forEach(function (attribute) {
    preloadInterpolationImages(attribute);
    setInterpolationImage(attribute, 0);

    $("#" + attribute + "-slider").on("input", function (event) {
      setInterpolationImage(attribute, this.value);
    });
    $("#" + attribute + "-slider").prop("max", NUM_INTERP_FRAMES[attribute] - 1);
  });

  // preloadInterpolationImages();

  // $('#interpolation-slider').on('input', function(event) {
  //   setInterpolationImage(this.value);
  // });
  // setInterpolationImage(0);
  // $('#interpolation-slider').prop('max', NUM_INTERP_FRAMES - 1);

  // bulmaSlider.attach();
});
