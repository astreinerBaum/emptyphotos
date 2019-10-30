const floater = document.getElementById("floatText");
const srcinfo = document.getElementById("srcinfo");
const container = document.getElementById("container");
container.addEventListener('mousemove', moveText)
let containerHeight, containerWidth;
let data;
let updateTextPos;

window.onload = async () => {
  await fetch("data/missing071019.json")
    .then(response => response.json())
    .then(json => (data = json));

  containerWidth = container.clientWidth;
  containerHeight = container.clientHeight;
  data = shuffle(data);
  createRandomImages(1000);
  window.scrollTo(
    containerWidth / 2 - window.innerWidth / 2,
    containerHeight / 2 - window.innerHeight / 2
  );
};

/*
document.onclick = () => {
  let images = document.getElementsByTagName('img');
  while(images.length > 0) {
    images[0].parentNode.removeChild(images[0]);
  }

  createRandomImages(8);
}
*/

async function createRandomImages(num) {
  let w = containerWidth;
  let h = containerHeight;
  let picNum = num; //1 + Math.floor( Math.random() * num );

  const maxWidth = window.innerWidth / 2;
  const maxHeight = window.innerHeight / 2;
  const minSize = 20;

  // TODO Start at random number
  // const startAt = Math.floor(Math.random() * (data.length-1))

  for (let i = 0; i < picNum; i++) {
    let _w = Math.floor(minSize + Math.random() * maxWidth);
    let _h = Math.floor(minSize + Math.random() * maxHeight);
    let _x = Math.floor(Math.random() * (w - _w));
    let _y = Math.floor(Math.random() * (h - _h));
    createImage(i, _w, _h, _x, _y);
  }
}

function createImage(i, w, h, x, y) {
  const randomIndex = Math.floor(Math.random() * data.length);
  let img = document.createElement("img");
  img.onmouseenter = function() {
    hoverImage(this.src);
  };
  img.onmouseover = function() {
    if(this.dataset.text){
        updateTextPos = true;
        showText(this.dataset.text);
    }
  };
  img.onmouseout = function() {
    srcinfo.style.visibility = "hidden";
    floater.style.visibility = "hidden";
    updateTextPos = false;
  };
  img.mouse
  img.onerror = function() { 
    this.setAttribute("style", 
    "display: block;"
    )
    this.style.left = x + "px";
    this.style.top = y + "px";
  }
  img.setAttribute("src", data[i].src);
  if(data[i].width !== 0){
    img.setAttribute("width", data[i].width);
  }else{
    img.setAttribute("width", w);
  }
  if(data[i].height !== 0){
    img.setAttribute("height", data[i].height);
  }else{
    img.setAttribute("height", h);
  }
  if(data[i].alt){
    img.setAttribute('data-text', data[i].alt) //title functions as alt: in chrome and destroys border...
  }

  container.appendChild(img);
}

function hoverImage(src) {
  let srcinfo = document.getElementById("srcinfo");
  srcinfo.innerHTML = src;
  srcinfo.style.visibility = 'visible';
}

function showText(text){
  floater.style.visibility = 'visible';
  floater.innerHTML = text;
}

function moveText(e){
  if(updateTextPos){
    const x = e.clientX;
    const y = e.clientY;
    floater.style.left = x + 15 + "px";
    floater.style.top = y + 15 + "px";
  }
}

function shuffle(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}