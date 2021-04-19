   <script src="https://cpwebassets.codepen.io/assets/common/stopExecutionOnTimeout-157cd5b220a5c80d4ff8e0e70ac069bffd87a61252088146915e8726e5d9f147.js"></script>


      <script id="rendered-js" >
var menu_bar = document.getElementById("toggle-settings");
var settings = document.getElementById("settings");
var sticky_header = document.querySelector(".sticky-header");
var edit_title = document.getElementById("edit-title");
var edit_title_box = document.querySelector(".edit-title-box");
var overlay = document.querySelector(".overlay");
var title = document.getElementById("title");
var new_title = document.getElementById("new-title");
var ok_button = document.getElementById("ok");
var cancel_button = document.getElementById("cancel");
var lock_note_button = document.getElementById("lock-note-button");
var lock_note_icon = document.getElementById("lock-icon");
var textarea = document.querySelector("textarea");
var delete_note = document.getElementById("delete-note");
var delete_box = document.querySelector(".delete-box");
var yes_button = document.getElementById("yes");
var no_button = document.getElementById("no");
var container = document.getElementById("container");
var opacity_content = document.querySelectorAll(".opacity-content>p");
var color_container_colors = document.querySelectorAll(
".color-choice-container a");

var color_container = document.querySelector(".color-choice-container");
var active = document.querySelector(".active");
var notice = document.querySelector(".notice");
var opacityArray = [1, 1];
var colorObject = {
  old: {
    header: "rgb(206, 209, 38)",
    body: "rgb(236, 239, 68)" },

  new: {
    header: "rgb(206, 209, 38)",
    body: "rgb(236, 239, 68)" } };



menu_bar.addEventListener("click", function () {
  var settings_display_prop = window.getComputedStyle(settings).display;
  if (settings_display_prop == "none") {
    settings.style.display = "block";
  } else {
    settings.style.display = "none";
  }
});

edit_title.addEventListener("click", function () {
  overlay.style.transform = "scale(1)";
  edit_title_box.classList.add("show");
  settings.style.display = "none";
});

cancel_button.addEventListener("click", function () {
  overlay.style.transform = "scale(0)";
  edit_title_box.classList.remove("show");
});

ok_button.addEventListener("click", function () {
  overlay.style.transform = "scale(0)";
  if (new_title.value.length > 0) {
    title.innerHTML = new_title.value;
  }
  edit_title_box.classList.remove("show");
});

lock_note_button.addEventListener("click", function () {
  var lock_icon = lock_note_icon.firstElementChild;
  if (lock_icon.classList.contains("fa-lock-open")) {
    lock_icon.classList.remove("fa-lock-open");
    lock_icon.classList.add("fa-lock");
    textarea.disabled = true;
    this.innerHTML = '<i class="fas fa-lock"></i> Unlock note';
  } else {
    lock_icon.classList.remove("fa-lock");
    lock_icon.classList.add("fa-lock-open");
    textarea.disabled = false;
    this.innerHTML = '<i class="fas fa-lock"></i> Lock note';
  }
  settings.style.display = "none";
});

textarea.addEventListener("click", function () {
  settings.style.display = "none";
});

delete_note.addEventListener("click", function () {
  overlay.style.transform = "scale(1)";
  delete_box.classList.add("show");
  settings.style.display = "none";
});

yes_button.addEventListener("click", function () {
  title.innerHTML = "New Note";
  textarea.value = "";
  delete_box.classList.remove("show");
  overlay.style.transform = "scale(0)";
});

no_button.addEventListener("click", function () {
  delete_box.classList.remove("show");
  overlay.style.transform = "scale(0)";
});

var isdown;
var containerOffset = [];
container.addEventListener(
"mousedown",
function (e) {
  isdown = true;
  containerOffset = [e.pageX - this.offsetLeft, e.pageY - this.offsetTop];
  this.style.opacity = opacityArray[1];
},
true);


document.addEventListener(
"mouseup",
function () {
  isdown = false;
},
true);


document.addEventListener(
"mousemove",
function (e) {
  e.preventDefault();
  if (isdown == true) {
    container.style.top = e.clientY - containerOffset[1] + "px";
    container.style.left = e.clientX - containerOffset[0] + "px";
  }
},
true);


opacity_content.forEach(c => {
  c.addEventListener("click", function () {
    opacityArray[0] = this.getAttribute("data-opacity");
    container.style.opacity = opacityArray[0];
    settings.style.display = "none";
  });
});

document.addEventListener("click", function (e) {
  if (!container.contains(e.target)) {
    settings.style.display = "none";
    container.style.opacity = opacityArray[0];
  }
});

color_container_colors.forEach(c => {
  c.addEventListener("mouseover", function () {
    var color = window.getComputedStyle(c).backgroundColor;
    var textareaColor = lighterShade(color);
    colorObject.new.header = color;
    colorObject.new.body = textareaColor;
    sticky_header.style.backgroundColor = color;
    textarea.style.backgroundColor = textareaColor;
  });
  c.addEventListener("mouseout", function () {
    sticky_header.style.backgroundColor = colorObject.old.header;
    textarea.style.backgroundColor = colorObject.old.body;
  });
  c.addEventListener("click", function () {
    colorObject.old.header = colorObject.new.header;
    colorObject.old.body = colorObject.new.body;
    settings.style.display = "none";
    var currActive = document.querySelector(".active");
    currActive.removeChild(currActive.childNodes[0]);
    currActive.classList.remove("active");
    c.classList.add("active");
    c.innerHTML = '<i class="fas fa-check"></i>';
  });
});

function lighterShade(v) {
  var colorValue = v.
  split("").
  filter(c => !isNaN(c)).
  join("").
  split(" ");
  colorValue = colorValue.map(c => {
    var newNumber = parseInt(c) + 30;
    if (newNumber <= 255) return newNumber;else
    return 255;
  });
  return `rgb(${colorValue[0]},${colorValue[1]},${colorValue[2]})`;
}
active.innerHTML = '<i class="fas fa-check"></i>';

setTimeout(function () {
  notice.style.display = 'none';
}, 10000);
//# sourceURL=pen.js
    </script>
