import { FormatDateService } from './format-date.service';
import { WebService } from './web.service';
import { Injectable } from '@angular/core';
import ToDo from '../models/todos';
import Group from '../models/groups';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private webService: WebService) { }

  // Groups
  getGroups(userId: string) {
    return this.webService.get(`group/${userId}/groups`);
  }

  getGroup(groupId: string, userId: string) {
    return this.webService.get(`group/${userId}/groups/${groupId}`);
  }

  createGroup(title: string, userId: string) {
    return this.webService.post(`group/${userId}/groups`, { title, userId })
  }

  updateGroup(groupId: string, userId: string, group: Group) {
    return this.webService.patch(`group/${userId}/groups/${groupId}`, { title: group.title, _userId: group._userId })
  }

  deleteGroup(groupId: string, userId: string) {
    return this.webService.delete(`group/${userId}/groups/${groupId}`)
  }


  // ToDos
  getTodos(groupId: string, userId: string) {
    return this.webService.get(`todo/${userId}/groups/${groupId}/todos`);
  }

  getTodo(groupId: string, userId: string, todoId: string) {
    return this.webService.get(`todo/${userId}/groups/${groupId}/todos/${todoId}`);
  }

  createTodo(groupId: string, userId: string, title: string, discription: string, deadline: string) {
    return this.webService.post(`todo/${userId}/groups/${groupId}/todos`, { groupId, userId, title, discription, deadline })
  }

  deleteTodo(groupId: string, userId: string, todoId: string) {
    return this.webService.delete(`todo/${userId}/groups/${groupId}/todos/${todoId}`)
  }

  updateTodo(groupId: string, userId: string, todo: ToDo, modificationDate: string, deadline: string) {
    return this.webService.patch(`todo/${userId}/groups/${groupId}/todos/${todo._id}`, { _groupId: groupId, _userId: userId, title: todo.title, discription: todo.discription, Completed: todo.Completed, createdDate: modificationDate, finishDate: deadline })
  }

  setComplete(groupId: string, userId: string, todo: ToDo) {
    return this.webService.patch(`todo/${userId}/groups/${groupId}/todos/${todo._id}`, { _groupId: groupId, _userId: userId, Completed: !todo.Completed })
  }
}
