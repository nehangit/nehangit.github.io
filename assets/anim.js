const screen = document.querySelector('.scrn');

if (document.cookie.indexOf("visited") >= 0) {
    screen.remove();
} else {
    var dd = new Date();
    var expireTime = dd.getTime() + 3600000;
    dd.setTime(expireTime);
    document.cookie = "visited=true; expires=" + dd.toUTCString() +"; path=/;";
    document.addEventListener('DOMContentLoaded', (e) => {
        setTimeout(() => {
            screen.classList.add('fadeout');
        }, 2000);
    });
}


