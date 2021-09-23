(function() {

  const mainnav = document.querySelector('.mainnav');
  const stringTarget = ' mainnav-small'

  function handleMenu() {
    const menuButton = document.querySelector('.menu-button');
    let currentClasses = mainnav.className;
    let isVisibleMenu = currentClasses.includes(stringTarget);
    if (isVisibleMenu) {
      menuButton.style.position = 'static';
      menuButton.style.zIndex = '';
      mainnav.className = currentClasses.replace(stringTarget, '');
    } else {
      menuButton.style.position = 'fixed';
      menuButton.style.zIndex = '2';
      mainnav.className = currentClasses + stringTarget;
    }
  }

  const menuButton = document.querySelector('.menu-button');
  menuButton.addEventListener('click', handleMenu);
})();