// utils
function throttle(func, delay) {
    let lastCall = 0;
    return function (...args) {
        const now = new Date().getTime();
        if (now - lastCall < delay) {
            return;
        }
        lastCall = now;
        return func(...args);
    };
}

//scrollToTopBtn
function scrollToTopBtn() {
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    function handleScroll() {

        if (window.scrollY > 300) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    }

    window.addEventListener('scroll', throttle(handleScroll, 200));

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// accordion
function accordion() {
    const accordions = document.querySelectorAll('.tariff__accordion');
    accordions.forEach((acco) => {
        const head = acco.querySelector('.accordion__head');
        const body = acco.querySelector('.accordion__body');

        let isOpen = acco.classList.contains('open')

        head.addEventListener('click', () => {
            if (isOpen) {
                acco.classList.remove('open');
                body.style.maxHeight = 0 + "px";

                isOpen = !isOpen;
            } else {
                acco.classList.add('open');
                body.style.maxHeight = body.scrollHeight + "px";
                isOpen = !isOpen;
            }
        })

    })
}

function getLinksByDevice(breakpoint) {
    const isMobile = window.innerWidth <= breakpoint;
    const DOMEN = isMobile ? "https://test.mono.re/" : "http://dev.mono.re:81/";

    return {
        auth: DOMEN + (isMobile ? "Account/Login" : "login"),
        reg: DOMEN + (isMobile ? "Account/Register" : "register"),
    };
}

function setLinks() {
    const links = getLinksByDevice(768);
    const updateHref = (selector, url) => {
        document.querySelectorAll(selector).forEach(anc => anc.href = url);
    };

    updateHref('[data-link="reg"]', links.reg);
    updateHref('[data-link="auth"]', links.auth);
}

setLinks();
scrollToTopBtn();
accordion();