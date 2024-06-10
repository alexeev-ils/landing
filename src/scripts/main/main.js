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

        let isOpen = acco.classList.contains('open');

        head.addEventListener('click', () => {
            if (isOpen) {
                acco.classList.remove('open');
                body.style.maxHeight = 0 + "px";
                body.style.opacity = 0;
                isOpen = !isOpen;
            } else {
                acco.classList.add('open');
                body.style.maxHeight = body.scrollHeight + "px";
                body.style.opacity = 1;
                isOpen = !isOpen;
            }
        });
    });
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

const popupOverlay = document.getElementById('popupOverlay');
const popup = popupOverlay.querySelector('.popup');

function openPopup() {
    document.addEventListener('DOMContentLoaded', function () {
        const openPopupBtns = document.querySelectorAll('[data-link="reg"]');
        const closeBtn = popupOverlay.querySelector('.close');
        openPopupBtns.forEach((btn) => {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                popupOverlay.classList.add('show');
                popup.classList.add('show');
            });
        });

        popupOverlay.addEventListener('click', function (e) {
            if (e.target === popupOverlay || e.target === closeBtn) {
                popupOverlay.classList.remove('show');
                popup.classList.remove('show');
            }
        });
    });

}

function sendEmail() {
    document.addEventListener('DOMContentLoaded', function () {
        const form = document.querySelector('#emailForm');
        const emailInput = form.querySelector('#email');
        const emailError = form.querySelector('#emailError');
        const responseMessage = document.getElementById('responseMessage');
        const btn = form.querySelector('button[type=submit]');

        emailInput.addEventListener('input', () => {
            emailError.textContent = '';
            btn.removeAttribute('disabled')
        })

        form.addEventListener('submit', async function (e) {
            e.preventDefault();

            // Clear previous error message
            emailError.textContent = '';

            // Basic email validation
            const email = emailInput.value;
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {
                emailError.textContent = 'Введите корректный email адрес.';
                btn.setAttribute('disabled', true)
                return;
            }

            if (email.length >= 50) {
                emailError.textContent = 'Введенный email превышает ограничение длины - 50 символов';
                btn.setAttribute('disabled', true)
                return;
            }

            try {
                btn.setAttribute('disabled', true)
                const response = await fetch('https://server-endpoint.com/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email })
                });

                const result = await response.json();

                if (response.ok) {
                    responseMessage.textContent = 'Данные успешно отправлены! Мы сообщим вам о старте проекта';
                    responseMessage.style.color = 'green';
                    email = '';
                    setTimeout(() => {
                        popupOverlay.classList.remove('show');
                        popup.classList.remove('show');
                    }, 2000)
                } else {
                    responseMessage.textContent = `Ошибка: ${result.message}`;
                    responseMessage.style.color = 'red';
                }
                btn.removeAttribute('disabled')
            } catch (error) {
                responseMessage.textContent = 'Произошла ошибка при отправке данных. Попробуйте позже';
                responseMessage.style.color = 'red';
                btn.removeAttribute('disabled')
            }
        });
    });
}

// pred reliz
openPopup();
sendEmail();

// setLinks();

scrollToTopBtn();
accordion();