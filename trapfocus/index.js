export function focusTrap(elem, selectors = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])') {
    const focusableEls = elem.querySelectorAll(selectors);
    const firstFocusableEl = focusableEls[0];
    const lastFocusableEl = focusableEls[focusableEls.length - 1];

    function handleKeyDown(e) {
        if (e.key !== "Tab") {
            return;
        }

        if (e.shiftKey && document.activeElement === firstFocusableEl) {
            e.preventDefault();
            lastFocusableEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastFocusableEl) {
            e.preventDefault();
            firstFocusableEl.focus();
        }
    }

    firstFocusableEl.addEventListener('keydown', function (e) {
        if (e.key === 'Tab' && e.shiftKey) {
            e.preventDefault();
            lastFocusableEl.focus();
        }
    });

    lastFocusableEl.addEventListener('keydown', function (e) {
        if (e.key === 'Tab' && !e.shiftKey) {
            e.preventDefault();
            firstFocusableEl.focus();
        }
    });

    elem.addEventListener('keydown', handleKeyDown);

    firstFocusableEl.focus();

    return function removeTrap() {
        elem.removeEventListener('keydown', handleKeyDown);
    };
}