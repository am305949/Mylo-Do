import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormatDateService {

  constructor() { }

  formatDate (today: Date) {
    let date = new Date(today);
    let yyyy = date.getFullYear();
    let mm = date.getMonth() + 1; // Months start at 0!
    let dd = date.getDate();

    let dayString = dd.toString();
    let monthString = mm.toString();

    if (dd < 10) dayString = '0' + dd;
    if (mm < 10) monthString = '0' + mm;

    let dateString = yyyy + '-' + mm + '-' + dd;

    return dateString;
}
}
