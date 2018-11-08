# Contexr
[![CircleCI](https://circleci.com/gh/kayvanbree/contexr.svg?style=svg&circle-token=66e7379fa4a7d7da91bc35180f43b639a6847106)](https://circleci.com/gh/kayvanbree/contexr)

Stop redundantly defining your shortcuts in your shortcut library and your context menu. Start using Contexr!

Contexr is a context menu integrated with a shortcut module for Angular. Provide the module with
different contexts and actions and they will appear in the context menu when you add `ctx="context-name`
to your HTML element. You can add a shortcut for every context menu person there is, which will be 
the same all throughout your application. 

## Demo page

[Demo page](https://kayvanbree.github.io/contexr/)

## Installation

### Adding the Contexr module

Start by installing Contexr using npm:

```
npm install contexr
```

## Using the Contexr library

### Add the context menu data structure

Start by defining a constant called `context` in your `app.module.ts` containing an array 
of `ContextMenuEntry` objects. You can read more about creating this datastructure in the next 
chapter called `Creating the context menu data structure`.

```javascript
const context: any = [
  {
    text: 'Say my name',
    context: ['say-my-name'],
    action: (args: any) => {
      console.log('My name is ' + args.name);
    },
    hotkey: 'y'
  }
];
```

### Create an app initializer method

After you create the `context` constant, copy the following method to the same file:

```javascript
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
```

### Provide the app initializer

Import `ContexrModule` and provide the method as an app initializer to the `ContexrService`:

```javascript
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

### Add the context menu to your HTML

Finally, add `<ctx-context-menu></ctx-context-menu>` to your `app.component.html`:

```html
<!-- Your application code -->
<ctx-context-menu id="ctx"></ctx-context-menu>
```

## Creating the context menu data structure

The context menu datastructure consists of an array of `ContextMenuEntry` objects:

```javascript
export class ContextMenuEntry {
  text: string;
}
```

A `ContextMenuEntry` can either be of type `ContextMenuItem` or `Submenu`.

### The ContextMenuItem

```javascript
export class ContextMenuItem extends ContextMenuEntry {
  context: string[];
  action: (args: any) => void;
  hotkey?: string | string[];
  args?: any;
}
```

The `ContextMenuItem` contains:
 
- Text: This is the text that will appear in your context person.
- context: An array of strings that indicates where you want 
to see your context menu person. See chapter `Adding context to an HTML element`.
- action: A function that does what you want the context menu person and 
shortcut to do. Always add `args: any` to the function signature.
- hotkey: The hotkey you want to assign to your context menu person.

## Adding context to an HTML element

To add context to an HTML element simply define the `[ctx]` attribute. An element that has a `[ctx]` 
attribute will check with the `ContexrService` to see what context menu items should be shown. 
The ContexrService will compare the `[ctx]` attribute with all `ContextMenuItems`' context array to
determine which items to show. Every `ContextMenuItem` that has at least one context that matches
the `[ctx[` attribute will show up in the context menu:

```html
<table class="table" [ctx]="'people-list'">
```

To add backward compatibility you can also leave out the `[]`, but when you do you also need to 
remove the comma's:

```html
<table class="table" ctx="people-list">
```

### Passing arguments to your context menu item

To pass an argument to your context menu item, add the attribute `[ctxArgs]` to your HTML element
and pass an object containing everything you need in the action:

```html
<tr [ctx]="'person'" [ctxArgs]="{id: person.id, name: person.name, message: person.message}">
```

Arguments are not mandatory, but you will need to pass everything you need in your action. There 
are no checks for this, so be careful and don't forget any!

## The context item array

The context person array you pass in `app.module.ts` consists of `ContextMenuItem`s and `Submenu`s.

### Example of menu without submenus

```javascript
const context = [
  { text: 'Yellow square', context: ['yellow-square'], action: () => { console.log('Yellow square'); }, hotkey: 'y' },
  { text: 'Appears on all', context: ['all'], action: () => { console.log('Appears on all'); }, hotkey: 'a' },
  { text: 'Blue square', context: ['blue-square'], action: () => { console.log('Blue square'); }, hotkey: 'b' },
  { text: 'Also blue square', context: ['blue-square'], action: () => { console.log('Also blue square'); }, hotkey: 'ctrl+b' },
  { text: 'One item with a very long name, like really really long', context: ['blue-square'], action: () => { console.log('One item with a very long name'); }, hotkey: 'ctrl+l' },
  { text: 'Inner context menu item', context: ['green-square', 'orange-square'], action: () => { console.log('Inner context'); }, hotkey: 'ctrl+l' }
];
```

### Example of a menu with submenus

```javascript
const context = [
  { text: 'Normal menu item', context: ['yellow-square'], action: () => { console.log('Yellow square'); }, hotkey: 'y' },
  { text: 'Submenu', children: [
    { text: 'SubmenuItem 1', context: ['yellow-square'], action: () => { console.log('Yellow square'); }, hotkey: 'y' },
    { text: 'SubmenuItem 2', context: ['yellow-square'], action: () => { console.log('Yellow square'); }, hotkey: 'y' },
  ]
];
```

If you use submenus, the submenu will only be shown if one of the subitems has the correct context.

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

## Running the demo app

To run the demo app, clone this repository, the run the following commands in the folder:

```
npm install
```

```
ng serve
```
