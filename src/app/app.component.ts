import { Component } from '@angular/core';
import { AuthServiceService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  constructor(private authService: AuthServiceService) { }

  ngOnInit(){
    this.authService.autoAuthUser();
  }
}
