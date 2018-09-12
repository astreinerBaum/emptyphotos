window.onload = () => {
  createRandomImages(8);
}

document.onclick = () => {
  let images = document.getElementsByTagName('img');
  while(images.length > 0) {
    images[0].parentNode.removeChild(images[0]);
  }

  createRandomImages(8);
}

function createRandomImages(num){
  let w = window.innerWidth;
  let h = window.innerHeight;
  let picNum = 1 + Math.floor( Math.random() * num );

  picW  = w / 2;
  picH = h / 2;

  minSize = 20;

  for(let i = 0; i < picNum; i++){ 
    let _w = Math.floor( minSize + Math.random() * picW );
    let _h = Math.floor( minSize + Math.random() * picH );
    let _x = Math.floor( Math.random() * (w - _w) );
    let _y = Math.floor( Math.random() * (h - _h) );
    createImage(_w, _h, _x, _y);
  }
}

// Future:
//   -add real image description and sizes from imageNet Database
function createImage(w, h, x, y){
  let img = document.createElement('img');
  img.setAttribute('src', ''); 
  img.setAttribute('width', w );
  img.setAttribute('height', h );
  //img.setAttribute('title', 'Image may contain: ') //title functions as alt: in chrome and destroys border...
  img.style.left = '' + x + 'px';
  img.style.top = '' + y + 'px';
  document.body.appendChild(img);
}