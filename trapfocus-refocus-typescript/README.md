trapfocus-refocus-typescript
---------------

What is it for?
---------------

This library is composed of a single Typescript function that creates a "focus trap" for a given element. By 'focus trap' we mean that it limits keyboard focus to a specific set of elements within that element. Once the focus trap is removed, the user will be 'refocussed' back to the element that acts as the trigger for the focus trap. It is the Typescript version of another package: <https://www.npmjs.com/package/trapfocus-refocus?activeTab=readme>

Why?
----

A lot of focus-trap libraries are either UI-framework specific or have a huge bundle size. This library hopes to provide a smaller alternative.It also aims to improve user experience by taking users back to the place 'where they started' before entering and exiting the focus trap. This is a slightly more complex (but still hopefully very simple) flavour of another package: <https://www.npmjs.com/package/magicthecat-trapfocus>.

Function Parameters
-------------------

The function takes three parameters:

1.  elem: The element within which the focus trap is created. This is typically a container or modal dialog that restricts focus.

2.  triggerElementId: The ID of an element that triggers the focus trap. When the focus trap is removed, the focus is returned to this element.

3.  selectors (optional): A string that specifies the types of elements within elem that can receive focus. By default, it includes anchor links (a[href]), buttons, input fields, select dropdowns, text areas, and any element with a tabindex.

How it works
------------

Inside the function, the focusable elements within elem are obtained using the specified selectors. The first and last focusable elements are determined using the querySelectorAll method.

The function sets up event listeners for the keydown event on the first and last focusable elements. If the Tab key is pressed while the first element has focus and the Shift key is also pressed, focus is moved to the last focusable element. Similarly, if the Tab key is pressed while the last element has focus and Shift key is not pressed, focus is moved to the first focusable element. This creates a circular focus navigation within the defined focus trap.

Additionally, the function sets up a keydown event listener on elem to handle the Tab key. If the Tab key is pressed while focus is within elem and not on the first or last focusable element, the function checks the Shift key state and moves focus accordingly.

The initTrap function is provided as part of the returned object. When called, it sets focus on the first focusable element within elem, initiating the focus trap.

The removeTrap function is also returned. When called, it removes the event listener for keydown on elem and moves focus back to the element with the specified ID triggerElementId. This function is used to release the focus trap and return the user to the element that has the id passed in as the 'triggerElementId' parameter.


Compatibility
-------------

Compatible with:

-   React (tested on v18.2.0)

-   Vue (tested on v3.3.2)

-   Vanilla Javascript

Examples
--------

Code Sandbox Examples can be found here:

-   Vanilla JS: <https://codesandbox.io/s/trapfocus-refocus-typescript-library-vanilla-js-example-yqsheb>

-   Vue 3: <https://codesandbox.io/s/trapfocus-refocus-typescript-library-vue-3-example-k5ccwj?file=/src/App.vue>

-   React: <https://codesandbox.io/s/trapfocus-refocus-library-typescript-react-example-d7qhbd>