// LOCAL STORAGE ===============================================================
const setItemOnLocalStorage = (key, value) => {
  if (key && value) localStorage.setItem(key, value);
  return;
};

const getItemOfLocalStorage = (key) => {
  if (key) return localStorage.getItem(key);
};

const removeItemOfLocalStorage = (key) => {
  if (key) localStorage.removeItem(key);
  return;
};

// CREATE DOM ELEMENTS =========================================================
const createDOMElement = (elementTag, attributes) => {
  const element = document.createElement(elementTag);
  const attributesArray = Object.entries(attributes);

  attributesArray.forEach(([key, value]) => {
    element.setAttribute(key, value);
  });

  return element;
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
const age = document.querySelector('[data-js="my-current-age"]');

const updateMyAge = () => {
  const month = getCurrentDate().getMonth();
  const day = getCurrentDate().getDate();
  const year = getCurrentDate().getFullYear();

  let myCurrentAge = 20;

    if (month === 2 && day >= 21) {
      myCurrentAge = year - 2001;

      if (
        getItemOfLocalStorage('currentAge') &&
        getItemOfLocalStorage('currentAge') === myCurrentAge
      ) {
        age.innerText = getItemOfLocalStorage('currentAge');
      } else {
        setItemOnLocalStorage('currentAge', myCurrentAge);
        age.innerText = getItemOfLocalStorage('currentAge');
      }
    }
};

updateMyAge();

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

// TOGGLE LANG =================================================================
const toggleLangBtn = document.querySelector('[data-js="toggle-lang-btn"]');

const togglePageLang = () => {

};

toggleLangBtn.addEventListener('click', togglePageLang);

// PROJECTS CARDS  =============================================================
const mainProjectsGrid = document.querySelector(
  '[data-js="main-projects-grid"]'
);
const moreProjectsGrid = document.querySelector(
  '[data-js="more-projects-grid"]'
);
const displayProjectsBtn = document.querySelector(
  '[data-js="display-projects-btn"]'
);

let projectsCounter = 0;

const API = {
  user: 'eoisaac',
  url: 'https://api.github.com/users',
};

const createProjectsCards = () => {
  const projects = JSON.parse(getItemOfLocalStorage('projectsData'));

  projects.forEach(({ name, html_url, homepage, description, topics }) => {
    ++projectsCounter;

    const projectCard = createDOMElement('article', {
      class: 'project-card',
    });

    const projectName = name.replace(/_/g, ' ');
    const projectDescription = description ? description : '';
    const homepageLink = homepage
      ? `<a href="${homepage}" target="_blank" class="icon-btn card__link">
          <i class="uil uil-external-link-alt"></i>
         </a>`
      : '';
    const tags = topics ? topics.join(' ') : '';

    projectCard.innerHTML = `
      <header class="card__header">
        <div class="card__top">
          <img
            src="src/img/folder.svg"
            alt="Folder icon"
            class="card__image"
          />
          <div class="card__links">
            <a href="${html_url}" target="_blank" class="icon-btn card__link">
              <i class="uil uil-github-alt"></i>
            </a>
            ${homepageLink}
          </div>
        </div>
        <div class="card__content">
          <h3 class="card__title">${projectName}</h3>
          <p class="card__description">
            ${projectDescription}
          </p>
        </div>
      </header>
      <footer class="card__tag">
        ${tags}
      </footer>`;

    projectsCounter <= 6
      ? mainProjectsGrid.appendChild(projectCard)
      : moreProjectsGrid.appendChild(projectCard);
  });
};

const displayHideMoreProjects = () => {
  moreProjectsGrid.classList.toggle('projects__grid--display');

  if (moreProjectsGrid.classList.contains('projects__grid--display')) {
    displayProjectsBtn.innerHTML = 'Ver menos <i class="uil uil-angle-up"></i>';
  } else {
    displayProjectsBtn.innerHTML =
      'Ver mais <i class="uil uil-angle-down"></i>';
    window.location.href = '#projects';
  }
};

displayProjectsBtn.addEventListener('click', displayHideMoreProjects);

const getGitHubReposData = async () => {
  try {
    const response = await fetch(`${API.url}/${API.user}/repos`);
    const reposData = await response.json();

    setItemOnLocalStorage('projectsData', JSON.stringify(reposData));
  } catch (error) {
    console.error(`ERROR => ${error}`);
  } finally {
    createProjectsCards();
  }
};

getGitHubReposData();
