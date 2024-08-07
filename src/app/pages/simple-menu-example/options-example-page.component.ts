import { Component } from '@angular/core';
import { OptionsExampleComponent } from "./options-example/options-example.component";
import { HttpClient } from '@angular/common/http';
import { HighlightAuto } from 'ngx-highlightjs';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  standalone: true,
  templateUrl: './options-example-page.component.html',
  styleUrl: './options-example-page.component.css',
  imports: [
    OptionsExampleComponent,
    HighlightAuto,
    MatCardModule,
    MatTabsModule
  ]
})
export class SimpleMenuExampleComponent {
  exampleUrl = "https://raw.githubusercontent.com/kayvanbree/contexr/master/src/app/pages/simple-menu-example/options-example/options-example.component.ts";
  exampleCode = "";

  constructor(private http: HttpClient) {
    this.http.get(this.exampleUrl, {responseType: "text"}).subscribe(data => {
      this.exampleCode = data;
    });
  }
}
