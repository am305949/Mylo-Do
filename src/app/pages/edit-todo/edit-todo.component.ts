import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormatDateService } from 'src/app/services/format-date.service';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.css']
})
export class EditTodoComponent implements OnInit {

  groupId: string;
  todoId: string;
  userId: string;
  todo: any;

  constructor(
    private todoService: TodoService,
    private router: Router,
    private route: ActivatedRoute,
    private formatDateService: FormatDateService
    ) {
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

  ngOnInit(): void {
  }

  editTodo(todoTitle: string, todoDiscription: string, todoDeadline: string) {
    if(todoTitle) { this.todo.title = todoTitle; }
    if(todoDiscription){ this.todo.discription = todoDiscription; }
    if(todoDeadline){ this.todo.finishDate = todoDeadline; }
    let modifiedDate = this.formatDateService.formatDate(new Date());
    this.todoService.updateTodo(this.groupId, this.userId, this.todo, modifiedDate, this.todo.finishDate)
        .subscribe(() => {
          this.router.navigate(['../../'], { relativeTo: this.route })
        })
  }

}
