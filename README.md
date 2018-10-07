# Contexr

Stop redundantly defining your shortcuts in your shortcut library and your context menu. Start using Contexr!

Contexr is a context menu integrated with a shortcut module for Angular. Provide the module with
different contexts and actions and they will appear in the context menu when you add `ctx="context-name`
to your HTML element. You can add a shortcut for every context menu item there is, which will be 
the same all throughout your application. 

## Installation

### Adding the Contexr module

Start by installing Contexr using npm:

```
npm install contexr
```

### Creating context

Create an array of Context objects in `app.module.ts`. A ContextMenuItem object has the following 
interface:

```javascript
export interface ContextMenuItem {
  text: string;
  context: string[];
  action: () => void;
  hotkey?: string | string[];
}
```

The Context object contains:
 
- Text: This is the text that will appear in your context item.
- context: An array of strings that indicates where you want 
to see your context menu item. See chapter `Adding context to an HTML element`.
- action: A function that does what you want the context menu item and 
shortcut to do.
- hotkey: The hotkey you want to assign to your context menu item.

An example of a ContextMenuItem array to pass from your `app.module.ts`:

```javascript
const context: ContextMenuItem[] = [
  { text: 'Yellow square', context: ['yellow-square'], action: () => { console.log('Yellow square'); }, hotkey: 'y' },
  { text: 'Appears on all', context: ['all'], action: () => { console.log('Appears on all'); }, hotkey: 'a' },
  { text: 'Blue square', context: ['blue-square'], action: () => { console.log('Blue square'); }, hotkey: 'b' },
  { text: 'Also blue square', context: ['blue-square'], action: () => { console.log('Also blue square'); }, hotkey: 'ctrl+b' },
  { text: 'One item with a very long name, like really really long', context: ['blue-square'], action: () => { console.log('One item with a very long name'); }, hotkey: 'ctrl+l' },
  { text: 'Inner context menu item', context: ['green-square', 'orange-square'], action: () => { console.log('Inner context'); }, hotkey: 'ctrl+l' }
];
```

### Importing the library

Import the Contexr library in your module and use `APP_INITIALIZER` to add context menu items:

```javascript

const context: ContextMenuItem[] = [
  {
    text: 'Yellow square',
    context: ['yellow-square'],
    action: () => {
      console.log('Yellow');
    },
    hotkey: 'y'
  }
];

export function onInitialize(contexr: ContexrService): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise((resolve, reject) => {
      // You can also register a single context menu item with
      // contexr.registerContextMenuItem(contextItem);
      contexr.registerContextMenuItems(context);
      resolve();
    });
  };
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ContexrModule
  ],
  providers: [
      {
        provide: APP_INITIALIZER,
        useFactory: onInitialize,
        multi: true,
        deps: [ContexrService]
      }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### Include Contexr in your application

For Contexr to work you need to add `<ctx-context-menu></ctx-context-menu>` to your `app.component.ts`.

## Adding context to an HTML element

To add context to an HTML element simply define the `ctx` attribute. An element that has a `ctx` 
attribute will check with the `ContexrService` to see what context menu items should be shown. 
The ContexrService will compare the `ctx` attribute with all `ContextMenuItems`' context array to
determine which items to show. Every `ContextMenuItem` that has at least one context that matches
the `ctx` attribute will show up in the context menu.

## Styling the context menu

The context menu's HTML looks like this:

```html
<divclass="context-menu">
  <ul class="context-list">
    <li class="context-list-item">
      <div class="flex-container">
        <span class="context">{{item.text}}</span>
        <span style="flex: 1 1 auto;"></span>
        <span class="shortcut">{{item.hotkey}}</span>
      </div>
    </li>
  </ul>
</div>
```

Add an id to the context menu element in `app.component.html`. This will make sure your css has
priority over the css used in the library:
```html
<ctx-context-menu id="ctx"></ctx-context-menu>
```

Style the context menu using this knowledge. To make it really ugly, use the following scss:

```scss
::ng-deep #ctx {
  .context-list-item {
    background: orange;
  }

  .context-list-item:hover {
    background: yellow;
  }
}
```
