import { Component } from '@angular/core';
import { ContexrModule } from '../../../../projects/contexr/src/public-api';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { HighlightAuto } from 'ngx-highlightjs';
import { HttpClient } from '@angular/common/http';
import { OptionsExampleComponent } from '../simple-menu-example/options-example/options-example.component';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    CommonModule,
    ContexrModule,
    OptionsExampleComponent,
    MatCardModule,
    MatTabsModule,
    HighlightAuto,
    RouterLink
]
})
export class HomeComponent {
  exampleUrl = "https://raw.githubusercontent.com/kayvanbree/contexr/master/src/app/pages/simple-menu-example/options-example/options-example.component.ts";
  exampleCode = "";

  constructor(private http: HttpClient) {
    this.http.get(this.exampleUrl, {responseType: "text"}).subscribe(data => {
      this.exampleCode = data;
    });
  }
}
