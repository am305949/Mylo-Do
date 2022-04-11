import { AuthComponent } from './pages/auth/auth.component';
import { WebService } from './services/web.service';
import { TodoService } from './services/todo.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoViewComponent } from './pages/todo-view/todo-view.component';
import { NewGroupComponent } from './pages/new-group/new-group.component';
import { NewTodoComponent } from './pages/new-todo/new-todo.component';
import { EditTodoComponent } from './pages/edit-todo/edit-todo.component';
import { EditGroupComponent } from './pages/edit-group/edit-group.component';
import { TodoInfoComponent } from './pages/todo-info/todo-info.component';
import { AuthInterceptor } from './services/Interceptors/auth.interceptor';
import { APP_BASE_HREF } from '@angular/common';
import { AuthServiceService } from './services/auth.service';
import { FormatDateService } from './services/format-date.service';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    TodoViewComponent,
    NewGroupComponent,
    NewTodoComponent,
    EditTodoComponent,
    EditGroupComponent,
    TodoInfoComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    TodoService,
    FormatDateService,
    AuthServiceService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    { provide: APP_BASE_HREF, useValue: '/'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
