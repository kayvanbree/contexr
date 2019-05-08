import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ContexrService} from 'contexr/lib/providers/contexr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'app';

  public currentContext = [];
  private sub;

  constructor(private contexr: ContexrService, private changeDetector: ChangeDetectorRef) {}

  ngOnInit() {
    this.sub = this.contexr.getContext().subscribe(value => {
      this.currentContext = value;
      this.changeDetector.detectChanges();
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.changeDetector.detach();
  }
}
