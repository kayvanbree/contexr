import { Component } from '@angular/core';

@Component({
  selector: 'ctx-context-menu',
  templateUrl: './context-menu-deprecated.component.html',
  styleUrls: ['./context-menu-deprecated.component.css']
})
export class ContextMenuDeprecatedComponent {
  constructor() {
    console.warn('[Contexr] Adding <ctx-context-menu> to your page is deprecated! From version' +
      ' 3.0.0 this will break your context menu!');
  }
}
