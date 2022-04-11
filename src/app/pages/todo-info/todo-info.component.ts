import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormatDateService } from 'src/app/services/format-date.service';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-info',
  templateUrl: './todo-info.component.html',
  styleUrls: ['./todo-info.component.css']
})
export class TodoInfoComponent implements OnInit {

  groupId: string;
  todoId: string;
  userId: string;
  todo: any;

  constructor(
    private todoService: TodoService,
    private router: Router,
    private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
        this.groupId = params['groupId'];
        this.todoId = params['todoId'];
        this.userId = params['userId'];
        this.todoService.getTodo(this.groupId, this.userId, this.todoId)
            .subscribe((todo) => {
              this.todo = todo;
            })
      })
  }

  editTodo() {
    this.router.navigate([`../../edit-todo/${this.todoId}`], { relativeTo: this.route })
  }

}
