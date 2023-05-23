const screen = document.querySelector('.scrn');

if (document.cookie.indexOf("visited") >= 0) {
    screen.remove();
} else {
    document.cookie = "visited";
    document.addEventListener('DOMContentLoaded', (e) => {
        setTimeout(() => {
            screen.classList.add('fadeout');
        }, 2000);
    });
}


