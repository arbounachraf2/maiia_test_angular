import {Injectable, PipeTransform} from '@angular/core';
import {MessageModule} from "../model/message/message.module";
import {SortColumn, SortDirection} from "../components/message/sortable.directive";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {DecimalPipe} from "@angular/common";
import {of} from "rxjs/internal/observable/of";
import {tap} from "rxjs/internal/operators/tap";
import {debounceTime, delay} from "rxjs/operators";
import {switchMap} from "rxjs/internal/operators/switchMap";
import {HttpClient} from "@angular/common/http";
import {NavigationEnd, Router} from "@angular/router";

interface SearchResult {
  messages: MessageModule[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}

const compare = (v1: string, v2: string) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(message: MessageModule[], column: SortColumn, direction: string): MessageModule[] {
  if (direction === '' || column === '') {
    return message;
  } else {
    return [...message].sort((a, b) => {
      const res = compare(`${a[column]}`, `${b[column]}`);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(message: MessageModule, term: string, pipe: PipeTransform) {
  return message.userId.toLowerCase().includes(term.toLowerCase())
      || message.title.includes(term)
      || message.body.includes(term);
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  baseUrl = 'http://localhost:8080/api/';

  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _messages$ = new BehaviorSubject<MessageModule[]>([]);
  private _total$ = new BehaviorSubject<number>(0);
  private messages: MessageModule[];
  private _state: State = {
    page: 1,
    pageSize: 4,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  private crorwlingInfo: boolean;
  mySubscription: any;

  constructor(private pipe: DecimalPipe, private http: HttpClient, private router: Router) {

    this.crorwlingInfo = false;

    this.getAllMessages();


  }

  get messages$() { return this._messages$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set sortColumn(sortColumn: SortColumn) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

    console.log(this.messages);
    // 1. sort
    let messages = sort(this.messages, sortColumn, sortDirection);

    // 2. filter
    messages = messages.filter(country => matches(country, searchTerm, this.pipe));
    const total = messages.length;

    // 3. paginate
    messages = messages.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({messages, total});
  }

  getAllMessages() {
    return this.http.get<MessageModule[]>(this.baseUrl+"message/").subscribe(data => {
      this.messages = data;
      this._search$.pipe(
          tap(() => this._loading$.next(true)),
          debounceTime(200),
          switchMap(() => this._search()),
          delay(200),
          tap(() => this._loading$.next(false))
      ).subscribe(result => {
        console.log(result);
        this._messages$.next(result.messages);
        this._total$.next(result.total);
      });

      this._search$.next();
    });
  }

   addMessages() {
    this.http.get(this.baseUrl+"addmessages/").subscribe(data=> {
      this.getAllMessages();
    }, (error) => {
      }, () => {
    });
  }
}
