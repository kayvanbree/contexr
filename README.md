# Contexr

Stop redundantly defining your shortcuts in your shortcut library and your context menu. Start using Contexr!

Contexr is a context menu integrated with a shortcut module for Angular. Provide the module with
different contexts and actions and they will appear in the context menu when you add `ctx="context-name"`
to your HTML element. You can add a shortcut for every context menu person there is, which will be 
the same all throughout your application. 

## Links

- [Demo page](https://kayvanbree.github.io/contexr/)
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

## Using Contexr

After installation, you can add context to any component! For example, if you want to
increase the number displayed in a div using a context menu item, start by creating a
field for our count and create a field for the context.

```javascript
count = 0;
context = [
  {
    text: 'Increase',
    context: ['increase-count'],
    action: () => {
      this.count++;
    },
    hotkey: 'i'
  }
];
```

Next, inject the ContexrService and register the context within the constructor.

```javascript
constructor(private contexr: ContexrService) {
  this.contexr.registerContextMenuItems(this.context);
}
```

This method will register your context menu item and configure the hotkey given. Now add an 
HTML element to your page. Use the [ctx] attribute to add a context.

```html
<div
  [ctx]="'increase-count'"
  style="background: lightblue; padding: 20px;"
>
  Use the context menu to increase the count.
  <br />
  Count: {{count}}
</div>
```

Check out the [demo site](https://kayvanbree.github.io/contexr/) to see this working!

## Adding arguments to your context

Adding arguments can be done using two simple steps. First, create a context item in your component.
Add args: any to the method signature of the action method.

```javascript
const context: any = [
  // Your other context items
  {
    text: 'Say my name',
    context: ['say-my-name'],
    action: (args: any) => {
      console.log('My name is ' + args.name);
    }
  }
];
```

Of course, you need to do something in your action method. We added a log statement that call out a name.

The second step is to add the context to your HTML elements. This time, we will add [ctxArgs]="some object" to
the element to pass our argument. Let's add context to some rows of a table.

```html
<table style="background: grey;">
  <tr>
    <td>Name</td>
    <td>City</td>
    <td>Country</td>
  </tr>
  <tr style="background: #b0b0b0;" [ctx]="'say-my-name'" [ctxArgs]="{name: 'Heisenberg'}">
    <td>Heisenberg</td>
    <td>Albuquerque</td>
    <td>Henk</td>
  </tr>
  <tr style="background: #b0b0b0;" [ctx]="'say-my-name'" [ctxArgs]="{name: 'Jesse'}">
    <td>Jesse</td>
    <td>Albuquerque</td>
    <td>Peter</td>
  </tr>
</table>
```
