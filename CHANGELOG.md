# Changelog

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


