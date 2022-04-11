import { AuthComponent } from './pages/auth/auth.component';
import { TodoInfoComponent } from './pages/todo-info/todo-info.component';
import { EditTodoComponent } from './pages/edit-todo/edit-todo.component';
import { EditGroupComponent } from './pages/edit-group/edit-group.component';
import { NewTodoComponent } from './pages/new-todo/new-todo.component';
import { NewGroupComponent } from './pages/new-group/new-group.component';
import { TodoViewComponent } from './pages/todo-view/todo-view.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/Guards/auth.guard';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', pathMatch: 'full' , redirectTo: 'users'},
  { path: 'users', pathMatch: 'full', component: AuthComponent },
  { path: ':userId/groups', pathMatch: 'full', component: TodoViewComponent, canActivate: [AuthGuard] },
  { path: ':userId/groups/:groupId', pathMatch: 'full', component: TodoViewComponent, canActivate: [AuthGuard] },
  { path: ':userId/new-group', pathMatch: 'full', component: NewGroupComponent, canActivate: [AuthGuard] },
  { path: ':userId/edit-group/:groupId', pathMatch: 'full', component: EditGroupComponent, canActivate: [AuthGuard] },
  { path: ':userId/groups/:groupId/new-todo', pathMatch: 'full', component: NewTodoComponent, canActivate: [AuthGuard] },
  { path: ':userId/groups/:groupId/edit-todo/:todoId', pathMatch: 'full', component: EditTodoComponent, canActivate: [AuthGuard] },
  { path: ':userId/groups/:groupId/todo-info/:todoId', pathMatch: 'full', component: TodoInfoComponent, canActivate: [AuthGuard] },
  { path: '**', component: AuthComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabledNonBlocking' }),],
  exports: [RouterModule, FormsModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
