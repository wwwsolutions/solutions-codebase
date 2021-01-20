import { Component, OnInit } from '@angular/core';
import { CoursesService } from './courses.service';

@Component({
  selector: 'codebase-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'postgres-ng-app';

  constructor(private coursesService: CoursesService) {}

  ngOnInit(): void {
    this.coursesService
      .loadCourseDetail(1)
      .subscribe((data) => console.log(data));
  }
}
