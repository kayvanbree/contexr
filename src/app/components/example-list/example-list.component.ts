import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-example-list',
  templateUrl: './example-list.component.html',
  styleUrls: ['./example-list.component.scss']
})
export class ExampleListComponent implements OnInit {

  public people = [
    {
      id: 1,
      name: 'Henk',
      message: 'Hello'
    },
    {
      id: 2,
      name: 'Piet',
      message: 'I am the second people person'
    },
    {
      id: 3,
      name: 'Klaas',
      message: 'I am ALSO HERE CAAAAAAAAAAAPS'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
