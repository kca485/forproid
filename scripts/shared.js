(function() {

  const mainnav = document.querySelector('.mainnav');
  const stringTarget = ' mainnav-small'

  function handleMenu() {
    let currentClasses = mainnav.className;
    let isVisibleMenu = currentClasses.includes(stringTarget);
    if (isVisibleMenu) {
      mainnav.className = currentClasses.replace(stringTarget, '');
    } else {
      mainnav.className = currentClasses + stringTarget;
    }
  }

  const menuButton = document.querySelector('.menu-button');
  menuButton.addEventListener('click', handleMenu);
})();