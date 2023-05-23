const screen = document.querySelector('.scrn');

var dd = new Date();
var expireTime = dd.getTime() + 7200000;
dd.setTime(expireTime);

if (document.cookie.indexOf("visited") >= 0) {
    screen.remove();
} else {
    document.cookie = "visited=true;expires="+dd.toUTCString()+';';
    document.addEventListener('DOMContentLoaded', (e) => {
        setTimeout(() => {
            screen.classList.add('fadeout');
        }, 2000);
    });
}


