// LOCAL STORAGE ===============================================================
const setItemOnLocalStorage = (key, value) => {
  if (key && value) localStorage.setItem(key, value);
  return;
};

const getItemOfLocalStorage = (key) => {
  if (key) return localStorage.getItem(key);
};

const removeItemOfLocalStorage = (key) => {
  if (key)  localStorage.removeItem(key);
  return;
};

// SCROLL ANIMATION ============================================================
// const debounce = function(func, wait, immediate) {
//   let timeout;
//   return function(...args) {
//     const context = this;
//     const later = function () {
//       timeout = null;
//       if (!immediate) func.apply(context, args);
//     };
//     const callNow = immediate && !timeout;
//     clearTimeout(timeout);
//     timeout = setTimeout(later, wait);
//     if (callNow) func.apply(context, args);
//   };
// };

// const animationElements = document.querySelectorAll('[data-animation]');
// const animationClass = 'animate';

// const scrollAnimation = () => {
//   const windowTop = window.pageYOffset + window.innerHeight;
//   animationElements.forEach((element) => {
//     windowTop > element.offsetTop
//     ? element.classList.add(animationClass)
//     : element.classList.remove(animationClass)
//   })
// };

// scrollAnimation();

// if(animationElements.length) {
//   window.addEventListener('scroll', debounce(function() {
//     scrollAnimation();
//   }, 200));
// }

// OPEN / CLOSE MOBILE MENU ====================================================
const navMenu = document.querySelector('[data-js="nav-menu"]');
const navLinksList = document.querySelector('[data-js="nav-links-list"]');
const toggleMobileMenuBtn = document.querySelector(
  '[data-js="toggle-mobile-menu-btn"]'
);

const toggleMobileMenu = () => {
  const mobileMenuIcon = document.querySelector('[data-js="mobile-menu-icon"]');

  navMenu.classList.toggle('nav__menu--display');

  navMenu.classList.contains('nav__menu--display')
    ? (mobileMenuIcon.classList = 'uil uil-multiply')
    : (mobileMenuIcon.classList = 'uil uil-bars');
};

toggleMobileMenuBtn.addEventListener('click', toggleMobileMenu);

const closeMobileMenuOnLinkClick = (event) => {
  const menuElement = event.target;

  if (
    menuElement.classList.contains('nav__link') &&
    navMenu.classList.contains('nav__menu--display')
  )
    toggleMobileMenu();
};

navLinksList.addEventListener('click', closeMobileMenuOnLinkClick);

// CURRENT LINK / CHANGE TAB TITLE =============================================
const allSectionsPages = document.querySelectorAll('.section');
const allPageNavLinks = document.querySelectorAll('.nav__link');

const currentNavLink = () => {
  let currentSection = '';

  allSectionsPages.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    const thirdPartOfSection = sectionTop - sectionHeight / 3;

    if (scrollY >= thirdPartOfSection) {
      currentSection = section.getAttribute('id');
    }
  });

  allPageNavLinks.forEach((link) => {
    link.classList.remove('nav__link--current');

    if (link.classList.contains(currentSection))
      link.classList.add('nav__link--current');
  });

  // let tabTitle = getSectionsTabTitles(currentSection);
  // updateTabTitle(tabTitle);
};

window.addEventListener('scroll', currentNavLink);

// UPDATE COPYRIGHT YEAR =======================================================
const copyrightYear = document.querySelector('[data-js="copyright-year"]');

const getCurrentDate = () => {
  const currentDate = new Date();

  return currentDate;
};

const updateCopyrightYear = () => {
  const currentYear = getCurrentDate().getFullYear();

  if (
    getItemOfLocalStorage('currentYear') &&
    getItemOfLocalStorage('currentYear') === currentYear
  ) {
    copyrightYear.innerText = getItemOfLocalStorage('currentYear');
  } else {
    setItemOnLocalStorage('currentYear', currentYear);
    copyrightYear.innerText = getItemOfLocalStorage('currentYear');
  }
};

updateCopyrightYear();

// UPDATE MY AGE ===============================================================
const myAge = document.querySelector('[data-js="my-current-age"]');
const myBDay = '21/03/2001'

console.log(getCurrentDate());

// TOGGLE THEME ================================================================
const toggleThemeBtn = document.querySelector('[data-js="toggle-theme-btn"]');
const themeIcon = document.querySelector('[data-js="theme-icon"]');

const lightMode = getItemOfLocalStorage('lightMode');

if (lightMode) {
  document.documentElement.classList.add('light');
  themeIcon.classList = 'uil uil-moon';
}

const toggleSiteTheme = () => {
  const html = document.querySelector('html');
  html.classList.toggle('light');

  if (html.classList.contains('light')) {
    themeIcon.classList = 'uil uil-moon';
    setItemOnLocalStorage('lightMode', true);
    return;
  } else {
    themeIcon.classList = 'uil uil-sun';
    removeItemOfLocalStorage('lightMode');
  }
};

toggleThemeBtn.addEventListener('click', toggleSiteTheme);

// PROJECTS CARDS  =============================================================
