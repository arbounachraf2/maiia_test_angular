import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MessageComponent} from "./components/message/message.component";



let routes: Routes;
routes = [
  {path: '', pathMatch: 'full', redirectTo: 'message'},
  {path: 'message', component: MessageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
