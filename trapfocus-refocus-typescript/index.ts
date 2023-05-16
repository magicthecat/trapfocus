export default function focusTrapRefocus(
    elem: HTMLElement,
    triggerElementId: string,
    selectors: string = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
): { initTrap: () => void; removeTrap: () => void } {
    const focusableEls: NodeListOf<HTMLElement> = elem.querySelectorAll(selectors);
    const firstFocusableEl: HTMLElement = focusableEls[0];
    const lastFocusableEl: HTMLElement = focusableEls[focusableEls.length - 1];
    const triggerElement: HTMLElement | null = document.getElementById(triggerElementId);

    function handleKeyDown(e: KeyboardEvent): void {
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

    firstFocusableEl.addEventListener("keydown", function (e: KeyboardEvent) {
        if (e.key === "Tab" && e.shiftKey) {
            e.preventDefault();
            lastFocusableEl.focus();
        }
    });

    lastFocusableEl.addEventListener("keydown", function (e: KeyboardEvent) {
        if (e.key === "Tab" && !e.shiftKey) {
            e.preventDefault();
            firstFocusableEl.focus();
        }
    });

    elem.addEventListener("keydown", handleKeyDown);

    function initTrap(): void {
        firstFocusableEl.focus();
    }

    function removeTrap(): void {
        elem.removeEventListener("keydown", handleKeyDown);
        if (triggerElement) {
            triggerElement.focus();
        }
    }

    return {
        initTrap,
        removeTrap
    };
}