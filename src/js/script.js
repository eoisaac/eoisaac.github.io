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

// CURRENT LINK / CHANGE TAB TITLE ==============================================
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