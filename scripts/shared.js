const mainnav = document.querySelector('.mainnav');
const stringTarget = ' mainnav-small'
let isSmallNav = false;

function handleMenu() {
  const menuButton = document.querySelector('.menu-button');
  const currentClasses = mainnav.className;
  let isVisibleMenu = currentClasses.includes(stringTarget);
  if (isVisibleMenu) {
    menuButton.style.zIndex = '';
    mainnav.className = currentClasses.replace(stringTarget, '');
    isSmallNav = false;

    document.body.style.overflow = '';
  } else {
    menuButton.style.zIndex = '3';
    mainnav.className = currentClasses + stringTarget;
    isSmallNav = true;

    document.body.style.overflow = 'hidden';
  }
}

const menuButton = document.querySelector('.menu-button');
menuButton.addEventListener('click', handleMenu);

window.onresize = function() {
  if (window.innerWidth > 1279) {
    if (document.body.style.overflow === 'hidden') document.body.style.overflow = '';
  } else if (isSmallNav) {
    if (document.body.style.overflow === '') document.body.style.overflow = 'hidden';
  }
}

const currentPath = window.location.pathname;
const currentPageLink = document.querySelector('.mainnav a[href="' + currentPath + '"]');
if (currentPageLink) currentPageLink.style.color = '#b85e39';

// wait screen

const waitScreen = document.querySelector('.wait-screen');
window.onload = function(e) {
  waitScreen.style.opacity = 0;
  waitScreen.style.transition = 'opacity 1.5s'
  setTimeout(() => {
    waitScreen.style.display = 'none';
  }, 1500);
};
