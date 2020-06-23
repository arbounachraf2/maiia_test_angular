import {Directive, EventEmitter, Input, Output} from '@angular/core';
import {MessageModule} from "../../model/message/message.module";

export type SortColumn = keyof MessageModule | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };
export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}

@Directive({
  selector: '[appSortable]'
})
export class SortableDirective {

  constructor() { }


  @Input() sortable: SortColumn = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortable, direction: this.direction});
  }

}
