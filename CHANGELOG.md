# Changelog

## v2.0.0

- Context now shows correctly everywhere
- It is now possible to add arguments to your HTML elements. To do this, add args to your 
action like this `action: (args: any) => { console.log('Deleting ' + args.name); }` and
add the arguments to your HTML element like this
`[ctxArgs]="{id: person.id, name: person.name, message: person.message}"`.
- Slight improvement on the demo app

### BREAKING CHANGES

- The way to add context to an HTML element has changed. From now on you need to use
`[ctx]="'context-name'"`. This change is to fix a bug where not all menu items would show.

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


