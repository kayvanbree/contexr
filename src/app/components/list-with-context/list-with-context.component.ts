import {Component, Input, OnInit} from '@angular/core';
import {ContexrService} from 'contexr/lib/providers/contexr.service';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-list-with-context',
  templateUrl: './list-with-context.component.html',
  styleUrls: ['./list-with-context.component.css']
})
export class ListWithContextComponent implements OnInit {

  @Input() elements: any[];

  dataSource: MatTableDataSource<any>;

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
        args.list.onSelectRow(null, args.element);
      }
    },
    {
      text: 'Delete element',
      context: ['element'],
      action: (args: any) => {
        args.list.removeElement(args.element);
      },
      hotkey: 'del'
    }
  ];

  constructor(private contexr: ContexrService) {
    this.contexr.registerContextMenuItems(this.context);
  }

  public ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.elements);
  }

  public onSelectRow(event: MouseEvent, row: any): void {
    if (event && event.ctrlKey) {
      this.selected.push(row);
    } else {
      this.selected = [row];
    }
  }

  private removeElement(element) {
    const index = this.elements.indexOf(element);
    if (index > -1) {
      this.elements.splice(index, 1);
    }
  }

  private addElement() {
    this.elements.push(
      {position: this.elements.length + 1, name: '', weight: 0, symbol: ''}
    );
    this.dataSource = new MatTableDataSource(this.elements);
  }
}
