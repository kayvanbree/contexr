import {Component, Input, OnInit} from '@angular/core';
import {ContexrService} from 'contexr/lib/providers/contexr.service';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-list-with-context',
  templateUrl: './list-with-context.component.html',
  styleUrls: ['./list-with-context.component.css']
})
export class ListWithContextComponent implements OnInit {

  @Input() elements: any;

  dataSource: any;

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  selected;

  context = [
    {
      text: 'Add element',
      context: ['element-list'],
      action: (args: any) => {
        args.list.addElement();
      },
      hotkey: 'a'
    },
    {
      text: 'Select element',
      context: ['element'],
      action: (args: any) => {
        args.list.selected = args.element;
      }
    }
  ];

  constructor(private contexr: ContexrService) {
    this.contexr.registerContextMenuItems(this.context);
  }

  public ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.elements);
  }

  private addElement() {
    this.elements.push(
      {position: this.elements.length + 1, name: '', weight: 0, symbol: ''}
    );
    this.dataSource = new MatTableDataSource(this.elements);
  }
}
