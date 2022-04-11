import { TodoService } from './../../services/todo.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import Group from 'src/app/models/groups';
import ToDo from 'src/app/models/todos';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-todo-view',
  templateUrl: './todo-view.component.html',
  styleUrls: ['./todo-view.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class TodoViewComponent implements OnInit {
  groups: Group[] = [];
  todos: ToDo[] = [];
  groupId: string;
  userId: string;
  Completed: string = 'Completed';
  error: boolean = false;
  errorMessage: string = '';

  constructor(
    private authService: AuthServiceService,
    private todoService: TodoService,
    private route: ActivatedRoute,
    private router: Router,
    ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.groupId = params['groupId'];
      this.userId = params['userId'];

      this.todoService.getGroups(this.userId)
          .subscribe((groups: any) => {
            this.groups = groups});

      this.todoService.getTodos(this.groupId, this.userId)
          .subscribe((todos: any) => {
            this.todos = todos})
    })
  }

  onTodoClick(todo: ToDo) {
    if(!this.groupId) {
      this.error = true;
      this.errorMessage = 'please select a group first to show its todos info';
      setTimeout(() => {
        this.error = false;
        this.errorMessage = '';
      }, 3000);
      return;
    }

    this.router.navigate(['./todo-info', todo._id], { relativeTo: this.route });
  }

  deleteTodo(todo: ToDo, event: Event) {
    event.stopPropagation();
    this.todoService.deleteTodo(todo._groupId, this.userId, todo._id)
        .subscribe((todo: any) => {
          this.todos = this.todos.filter(td => td._id != todo._id)
        })
  }

  deleteGroup(group: Group) {
    this.todoService.deleteGroup(group._id, this.userId)
        .subscribe(() => {
          this.groups = this.groups.filter(gp => gp._id != group._id)
        })
  }

  addTodo() {
    if(!this.groupId) {
      this.error = true;
      this.errorMessage = 'please select a group first to add todo to it';
      setTimeout(() => {
        this.error = false;
        this.errorMessage = '';
      }, 3000);
      return;
    }

    this.router.navigate(['./new-todo'], { relativeTo: this.route });
  }

  editTodo(todo: ToDo, event: Event) {
    event.stopPropagation();
    if(!this.groupId) {
      this.error = true;
      this.errorMessage = 'please select a group first to edit its todos';
      setTimeout(() => {
        this.error = false;
        this.errorMessage = '';
      }, 3000);
      return;
    }

    this.router.navigate(['./edit-todo', todo._id], { relativeTo: this.route });
  }

  completeTodo(todo: ToDo, event: Event) {
    event.stopPropagation();
    this.Completed = todo.Completed? 'Completed' : 'Not Completed';
    this.todoService.setComplete(this.groupId, this.userId, todo)
        .subscribe(() => {todo.Completed = !todo.Completed})
  }

  logout() {
    this.authService.logout();
  }

}
