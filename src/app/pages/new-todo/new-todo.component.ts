import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.css']
})
export class NewTodoComponent implements OnInit {

  groupId: string;
  userId: string;
  createdTodo: boolean = false;

  constructor(
    private todoService: TodoService,
    private router: Router,
    private route: ActivatedRoute
    ) {
      this.route.params.subscribe((params) => {
        this.groupId = params['groupId']
        this.userId = params['userId']
      })
    }

  ngOnInit(): void {
  }

  addTodo(todoTitle: string, todoDiscription: string, todoDeadline: string) {
    if(todoTitle && todoDiscription && todoDeadline) {
      this.createdTodo = false;
      this.todoService.createTodo(this.groupId, this.userId, todoTitle, todoDiscription, todoDeadline)
      .subscribe(() => {
        this.router.navigate(['../'], { relativeTo: this.route })
      })
    }
    else{
      this.createdTodo = true;
    }
  }

}
