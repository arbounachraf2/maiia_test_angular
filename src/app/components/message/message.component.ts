import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {MessageModule} from "../../model/message/message.module";
import {SortableDirective, SortEvent} from "./sortable.directive";
import {MessageService} from "../../service/message.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  messages$: Observable<MessageModule[]>;
  total$: Observable<number>;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  @ViewChildren(SortableDirective) headers: QueryList<SortableDirective>;
  private data: boolean;
  private mySubscription: Subscription;
  private clicked: boolean = false;


  constructor(public service: MessageService, private route: ActivatedRoute, private router: Router, public snackBar: MatSnackBar) {
    this.messages$ = service.messages$;
    console.log(this.messages$);
    this.total$ = service.total$;
  }

  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  ngOnInit(): void {
  }

  crowlingDataClick($event: MouseEvent, total$: Observable<number>) {
    total$.subscribe(tot =>{
      console.log(tot);
      if(tot != 0 || this.clicked){
        this.snackBar.open("we can not load the gives another time", null, {duration:5000});
      } else {
        this.clicked = true;
        this.service.addMessages();
        this.snackBar.open('the data is loaded !!', null, {
          duration: 5000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
    })


  }
}
