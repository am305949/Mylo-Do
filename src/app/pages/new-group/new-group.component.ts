import { ActivatedRoute, Router, Params } from '@angular/router';
import { TodoService } from './../../services/todo.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.css']
})
export class NewGroupComponent implements OnInit {
  userId: string;

  constructor(
    private todoService: TodoService,
    private router: Router,
    private route: ActivatedRoute
    ) {
      this.route.params.subscribe((params) => {
        this.userId = params['userId']
      })
    }

  ngOnInit(): void {
  }

  addGroup(groupTitle: string) {
    this.todoService.createGroup(groupTitle, this.userId)
        .subscribe((group: any) => {
          //this.router.navigate(['../'], { relativeTo: this.route });
          this.router.navigate([`/${this.userId}/groups/${group._id}`])
        })
  }

}
