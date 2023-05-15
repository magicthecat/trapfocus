export class DomElementStore {
    constructor(elements) {
        this.elements = elements;
        this.trapRemovers = {};
    }

    setElement(key, element) {
        this.elements[key] = element;
    }

    getElement(key) {
        return this.elements[key];
    }

    removeElement(key) {
        delete this.elements[key];
    }

    setFocusTrap(triggerKey, targetKey) {
        const triggerElement = this.getElement(triggerKey);
        const targetElement = this.getElement(targetKey);

        if (!targetElement || !document.body.contains(targetElement)) {
            triggerElement.focus();
            return;
        }

        const selectors = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
        const focusableEls = targetElement.querySelectorAll(selectors);
        const firstFocusableEl = focusableEls[0];
        const lastFocusableEl = focusableEls[focusableEls.length - 1];

        function handleKeyDown(e) {
            if (e.key !== 'Tab') {
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

        targetElement.addEventListener('keydown', handleKeyDown);

        firstFocusableEl.focus();

        this.trapRemovers[targetKey] = function () {
            targetElement.removeEventListener('keydown', handleKeyDown);
        };
    }

    removeFocusTrap(key) {
        const remover = this.trapRemovers[key];
        if (remover) {
            remover();
            delete this.trapRemovers[key];
        }
    }
}
