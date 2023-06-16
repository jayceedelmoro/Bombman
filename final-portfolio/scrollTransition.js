

const scroll = (x, y) => {
    window.scrollTo(x, y);
}

scroll(0,0);

const section = document.querySelectorAll('section');
const logo = document.querySelector('.logo');
const home = document.querySelector('.nav-menu-item.home');
const about = document.querySelector('.nav-menu-item.about');
const skills = document.querySelector('.nav-menu-item.skills');
const projects = document.querySelector('.nav-menu-item.projects');
const contact = document.querySelector('.nav-menu-item.contact');
const scrollToTop = document.getElementById('scroll-to-top');

const clientHeight = document.documentElement.clientHeight;

logo.onclick = function() {scroll( 0,0 )};
home.onclick = function() {scroll( 0,0 )};
about.onclick = function() {scroll( 0, clientHeight )};
skills.onclick = function() {scroll( 0, clientHeight * 2 )};
projects.onclick = function() {scroll( 0, clientHeight * 3 )};
contact.onclick = function() {scroll( 0, clientHeight * 4 )};
scrollToTop.onclick = function() {scroll(0,0)};

section[0].classList.add('sectionTranstion');

document.addEventListener('scroll', () => {

    section.forEach((s, index) => {
        let elemY = s.getBoundingClientRect().y;
        let elemHeight = s.getBoundingClientRect().height;

        if (clientHeight > elemY + elemHeight * 2/3) {
            s.classList.add('sectionTranstion');
        }

            let nextElemY = section[ index + 1 ].getBoundingClientRect().y;
            let nextElemHeight = section[ index + 1 ].getBoundingClientRect().height;
            if(nextElemY + nextElemHeight * 1/5 < clientHeight ) {
                s.classList.remove('sectionTranstion');
            }
    });
}, false);