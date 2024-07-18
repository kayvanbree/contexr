import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MarkdownComponent } from 'ngx-markdown';
import { ParentComponent } from './parent/parent.component';
import { HighlightModule } from 'ngx-highlightjs';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-nested-components-example',
  standalone: true,
  templateUrl: './nested-components-example.component.html',
  styleUrl: './nested-components-example.component.css',
  imports: [
    MatCardModule,
    MatTabsModule,
    MarkdownComponent,
    ParentComponent,
    HighlightModule,
    CommonModule
  ],
})
export class NestedComponentsExampleComponent {
  constructor(private http: HttpClient) {
        this.http.get(this.parentUrl, {responseType: "text"}).subscribe(data => {
          this.parentCode = data;
        });
        this.http.get(this.childUrl, {responseType: "text"}).subscribe(data => {
          this.childCode = data;
        });
  }
  parentUrl = "https://raw.githubusercontent.com/kayvanbree/contexr/master/src/app/pages/nested-components-example/parent/parent.component.ts";
  parentCode = "";
  childUrl = "https://raw.githubusercontent.com/kayvanbree/contexr/master/src/app/pages/nested-components-example/child/child.component.ts";
  childCode = "";
}


