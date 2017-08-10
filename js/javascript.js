function checkTopPos(){
  var ActPos = window.pageYOffset;
  // var topBar = document.getElementsByClassName("top-bar");
  var topBarLeft = document.getElementsByClassName("top-bar-left");
  var navBg = document.getElementsByClassName("navBg");
  var imgW = document.getElementById("img-w");
  var imgB = document.getElementById("img-b");

  if(ActPos > 0){
    if(navBg[0].classList.contains("bg-white") == false){
      // topBar[0].classList.add("bg-white");
      navBg[0].classList.add("bg-white");
      topBarLeft[0].classList.add("color-black");
      imgW.classList.add("fadeout");
      imgB.classList.add("fadein");
    }
  }else{
    // topBar[0].classList.remove("bg-white");
    navBg[0].classList.remove("bg-white");
    topBarLeft[0].classList.remove("color-black");
    imgW.classList.remove("fadeout");
    imgB.classList.remove("fadein");

  }
}




Math.easeOutQuad = function (t, b, c, d) {
  t = t/d;
  return -c * t*(t-2) + b;
};

function menue_button(){
  var menue_btn = document.getElementsByClassName("menue_button");

  for (var i = 0; i < menue_btn.length; i++) {
    (function (i){
      menue_btn[i].addEventListener("click", function(){scroll_to(i);}, false);
    }(i))
  }
}

function scroll_to(n){
  var aktpos = window.pageYOffset;
  var scroll_point = document.getElementsByClassName("scroll_point");
  var scroll_point_top = scroll_point[n].offsetTop;

  if(scroll_point_top != aktpos){
    smothscroll(aktpos, scroll_point_top);
  }
}





function smothscroll(aktpos, offsetTop){
  var akt_Pos = aktpos;
  var fenster_Pos = offsetTop;
  var distance = (fenster_Pos - akt_Pos);
  var scroll_time = 1000;
  var steps = 60;
  var alpha = 2, r = 0;
  var grain = scroll_time/steps;

  function pos(r) {
    return Math.round(Math.easeOutQuad(r, akt_Pos, distance, steps));
  }

  do_scroll();

  var repeater;
  function do_scroll() {
    window.scrollTo(0, pos(r));
    r = r+1;

    if (r > steps) {
    cancelAnimationFrame(repeater);
    } else {
      repeater = requestAnimationFrame(do_scroll);
    }
  }
}


function check_menue_status(){

    var menue_aktiv = document.getElementsByClassName("menue_button");
    var aktpos = window.pageYOffset+300;
    var scroll_point = document.getElementsByClassName("scroll_point");


    for(i = 0; i < menue_aktiv.length; i++){

      var a = i;


      if(i < menue_aktiv.length-1){
        if(aktpos >= scroll_point[i].offsetTop && aktpos < (scroll_point[i+1].offsetTop)){
          if(menue_aktiv[a].classList.contains("active") == false){
            for (i = 0; i < menue_aktiv.length; i++){
              menue_aktiv[i].classList.remove("active");
            }
            menue_aktiv[a].classList.add("active");
          }
        }
        if(aktpos < scroll_point[0].offsetTop){
          if(menue_aktiv[a].classList.contains("active") == true){
            menue_aktiv[a].classList.remove("active");
          }
        }
      }
      if(i == menue_aktiv.length-1){
        if(aktpos > scroll_point[i].offsetTop){
          if(menue_aktiv[a].classList.contains("active") == false){
            for (i = 0; i < menue_aktiv.length; i++){
              menue_aktiv[i].classList.remove("active");
            }
            menue_aktiv[a].classList.add("active");
          }
        }
    }
  }
}



window.onload = function(){
  menue_button();
  checkTopPos();
}
window.onscroll = function(){
  check_menue_status();
  checkTopPos();
}
