import { Component } from '@angular/core';
import { ArgumentsExampleComponent } from "./arguments-example/arguments-example.component";
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { HighlightAuto } from 'ngx-highlightjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-arguments-example-page',
  standalone: true,
  imports: [
    ArgumentsExampleComponent,
    MatCardModule,
    MatTabsModule,
    HighlightAuto
  ],
  templateUrl: './arguments-example-page.component.html',
  styleUrl: './arguments-example-page.component.css'
})
export class ArgumentsExamplePageComponent {
  exampleUrl = "https://raw.githubusercontent.com/kayvanbree/contexr/master/src/app/pages/arguments-example-page/arguments-example/arguments-example.component.ts";
  exampleCode = "";

  constructor(private http: HttpClient) {
    this.http.get(this.exampleUrl, {responseType: "text"}).subscribe(data => {
      this.exampleCode = data;
    });
  }
}
