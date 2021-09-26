const imageList = document.getElementById('image-list');
imageList.addEventListener('click', () => {
  const radios = document.querySelectorAll('input[type="radio"]');
  const chosen = radios.find(radio => radio.checked);
});