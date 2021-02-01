import { Component, OnInit } from '@angular/core';
import { CoursesService } from './courses.service';
import { Observable } from 'rxjs';
import { CourseDetail } from '@codebase/shared/data-access-models';
@Component({
  selector: 'codebase-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  course$: Observable<CourseDetail>;

  constructor(private coursesService: CoursesService) {}

  ngOnInit(): void {
    this.course$ = this.coursesService.loadCourseDetail(1);
  }
}
