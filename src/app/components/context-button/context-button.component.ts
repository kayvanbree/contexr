import {Component, Input, OnInit} from '@angular/core';
import {ContexrService} from 'contexr/lib/providers/contexr.service';
import {ContextMenuItem} from 'contexr/lib/types/context-menu-item';

@Component({
  selector: 'app-context-button',
  templateUrl: './context-button.component.html',
  styleUrls: ['./context-button.component.css']
})
export class ContextButtonComponent implements OnInit {
  @Input() contextItem: ContextMenuItem;

  constructor(private contexr: ContexrService) {}

  public ngOnInit(): void {}
}
