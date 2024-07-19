import { Component } from '@angular/core';
import { HotkeysExampleComponent } from './hotkeys-example/hotkeys-example.component';
import { HttpClient } from '@angular/common/http';
import { HighlightAuto } from 'ngx-highlightjs';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-hotkeys-example-page',
  standalone: true,
  templateUrl: './hotkeys-example-page.component.html',
  styleUrl: './hotkeys-example-page.component.css',
  imports: [
    HotkeysExampleComponent,
    HighlightAuto,
    MatCardModule,
    MatTabsModule
  ]
})
export class HotkeysExamplePageComponent {
  exampleUrl = "https://raw.githubusercontent.com/kayvanbree/contexr/master/src/app/pages/hotkeys-example-page/hotkeys-example/hotkeys-example.component.ts";
  exampleCode = "";

  constructor(private http: HttpClient) {
    this.http.get(this.exampleUrl, {responseType: "text"}).subscribe(data => {
      this.exampleCode = data;
    });
  }
}
