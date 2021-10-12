const radios = document.querySelectorAll('input[type="radio"]');
radios.forEach((radio) => {
  radio.addEventListener('change', (e) => {
    highlight(e.target.id);
    showProduct(e.target.id);
  });
});

let current;
function highlight(productId) {
  const imageId = 'image-' + productId;
  const imageEl = document.getElementById(imageId);
  const originalClasses = imageEl.className;
  if (current) current.className = originalClasses;
  imageEl.className = originalClasses + 'current';
  current = imageEl;
}

let infoShown;
function showProduct(productId) {
  const imageId = 'image-' + productId;
  const imagePath = document.getElementById(imageId).src;
  const imageDiv = document.getElementById('image-chosen');
  imageDiv.style.backgroundImage = 'url(' + imagePath + ')';

  if (infoShown) infoShown.style.display = 'none';
  const infoId = 'info-' + productId;
  const infoDiv = document.getElementById(infoId);
  infoDiv.style.display = 'block';
  infoShown = infoDiv;
}

const startingId= 'produk01';
highlight(startingId);
showProduct(startingId);