import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'management';


  getLogin() {
    if(JSON.parse(localStorage.getItem('user')) == null){
      return null;
    }else{
      return JSON.parse(localStorage.getItem('user')).login.username;
    }
  }

  logout() {
    localStorage.setItem('user', JSON.stringify(null));
  }
}
