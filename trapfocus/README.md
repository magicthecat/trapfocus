magicthecat-trapfocus

What is it for?
---------------

This library is composed of a single Javascript function that creates a "focus trap" for a given element. By 'focus trap' we mean that it limits keyboard focus to a specific set of elements within that element.

Why?
----

A lot of focus-trap libraries are either UI-framework specific or have a huge bundle size. This library hopes to provide a smaller alternative with a unpacked size of 1.96KB (40 lines of code).

Why the name?
-------------

Magic is the name of my cat.

Function Parameters
-------------------

The function takes in two arguments:

-   `elem`: The element to which the focus trap will be applied.

-   `selectors`: An optional parameter that specifies which elements within `elem` should be focusable. By default, the function includes links, buttons, inputs, selects, textareas, and elements with a `tabindex` attribute that is not set to "-1".

How it works
------------

The function works by first finding all the focusable elements within `elem` using the specified selectors, and then setting up event listeners to handle keyboard events.

The `handleKeyDown` function is called whenever a key is pressed within `elem`. If the key is not the "Tab" key, the function does nothing. If the "Tab" key is pressed and the shift key is also pressed and the currently focused element is the first focusable element, then the last focusable element is focused instead. If the "Tab" key is pressed without the shift key and the currently focused element is the last focusable element, then the first focusable element is focused instead.

Two event listeners are added to the first and last focusable elements to handle keyboard events in a similar way. If the "Tab" key is pressed with the shift key while the first focusable element is in focus, the last focusable element is focused instead. If the "Tab" key is pressed without the shift key while the last focusable element is in focus, the first focusable element is focused instead.

Finally, the first focusable element is focused by default when the function is called.

The function returns another function that can be called to remove the focus trap by removing the event listener from `elem`.

Compatibility
-------------

Compatible with:

-   React (tested on v18.2.0)

-   Vue (tested on v3.3.2)

-   Vanilla Javascript

Examples
--------

See the following repo for vanilla js, react and vue examples: <https://github.com/magicthecat/magicthecat-trapfocus-examples>.