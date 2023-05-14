export function focusTrap(elem
    , escapeKey = null
    , selectors = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
) {
    let focusedElementBeforeTrap;

    const getAllChildElementsRecursive = (element) => {
        const childElements = Array.from(element.children);
        if (childElements.length === 0) {
            return [];
        } else {
            const childElementsRecursive = childElements.flatMap(
                getAllChildElementsRecursive
            );
            return [...childElements, ...childElementsRecursive];
        }
    }

    const focusableElements = getAllChildElementsRecursive(
        elem
    ).filter((el) =>
        el.matches(
            selectors
        )
    );
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement =
        focusableElements[focusableElements.length - 1];

    function trapTabKey(e) {
        if (escapeKey && e.key === escapeKey) {
            removeFocusTrap();
            return;
        }

        if (e.key !== "Tab") {
            return;
        }

        if (e.shiftKey) {
            if (document.activeElement === firstFocusableElement) {
                e.preventDefault();
                lastFocusableElement.focus();
            }
        } else {
            if (document.activeElement === lastFocusableElement) {
                e.preventDefault();
                firstFocusableElement.focus();
            }
        }
    }

    function triggerFocusTrap() {
        focusedElementBeforeTrap = document.activeElement;
        firstFocusableElement.focus();
        elem.addEventListener("keydown", trapTabKey);
    }

    function removeFocusTrap() {
        elem.removeEventListener("keydown", trapTabKey);
        focusedElementBeforeTrap.focus();
    }

    // Automatically trigger the focus trap when the first or last child element is focused
    const childElements = elem.children;
    if (childElements.length > 0) {
        const firstChildElement = childElements[0];
        const lastChildElement = childElements[childElements.length - 1];

        function triggerOnFirstChildFocus() {
            triggerFocusTrap();
            firstChildElement.removeEventListener(
                "focus",
                triggerOnFirstChildFocus
            );
        }

        function triggerOnLastChildFocus() {
            triggerFocusTrap();
            lastChildElement.removeEventListener(
                "focus",
                triggerOnLastChildFocus
            );
        }

        firstChildElement.addEventListener("focus", triggerOnFirstChildFocus);
        lastChildElement.addEventListener("focus", triggerOnLastChildFocus);
    } else {
        triggerFocusTrap();
    }

    return removeFocusTrap;
}
