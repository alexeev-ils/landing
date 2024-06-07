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

accordion();