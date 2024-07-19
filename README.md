# Contexr

Contexr is a context menu integrated with a hotkey library for Angular. Define context menus in the components
where you need them, provide them with arguments, and set up hotkeys in the same place. Submenus will be merged,
so you don't have to worry about adding the same submenu in different components.

## Links

- [Demo page](https://kayvanbree.github.io/contexr)
- [Github](https://github.com/kayvanbree/contexr)
- [npmjs](https://www.npmjs.com/package/contexr)

## Installation

Start by installing Contexr using npm:

```
npm install contexr
```

Now the only thing remaining to do is to add the ctx-context-menu tag to app.component.html.

```html
<!-- Your application code -->
<ctx-context-menu></ctx-context-menu>`
```

## Creating menus

After installing Contexr, you can start adding context menus to your components.
For example, if you need to increase and decrease a number displayed in your component,
start by creating the field `menu: MenuItem[]` and add the options that increase and decrease
the `count` field. In this example hotkeys are also defined for these options:

```javascript
count: number = 0;

menu: MenuItem[] = [
  {
    label: "Increase",
    action: () => { this.count++; },
    hotkey: 'plus'
  },
  {
    label: "Console message",
    action: () => { this.count-- },
    hotkey: '-'
  }
]
```

Next, pass the `menu` field to the `[ctx]` attribute and your counter is done!

```html
<div [ctx]="menu">
  Use the context menu to increase the count.
  <br />
  Count: {{count}}
</div>
```

To see this in action and to learn more, check out the [demo site](https://kayvanbree.github.io/contexr/)!
