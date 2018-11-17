# Changelog

## v1.3.0

NEW FEATURES

- Add optional hideMenu to ContextMenuItem. Now you can set it to false to use hotkeys
only.

CHANGES

- Update demo page

## v1.2.0

- Update readme
- Add demo page
- Add easier way to add context from components
- Update readme to reflect easier way for adding context
- Set up CircleCI

## v1.1.1

- Fixes a bug where the context menu would show in incorrect positions when scrolled.

## v1.1.0

- Context now shows correctly everywhere
- It is now possible to add arguments to your HTML elements. To do this, add args to your 
action like this `action: (args: any) => { console.log('Deleting ' + args.name); }` and
add the arguments to your HTML element like this
`[ctxArgs]="{id: person.id, name: person.name, message: person.message}"`.
- Slight improvement on the demo app

## v1.0.0

- Add better styling
- Add support for submenus
- Add styling for context menu
- Add styling guide to readme
- Breaks backward compatibility by changing the way how you 
can register a context menu person. This change will allow you
to use Contexr both in a library and in your main application
at the same time. First we used forRoot, but context menu items
from the library would not show up in the context menu. From now 
on we use APP_INITIALIZER. Check the readme for more information.


