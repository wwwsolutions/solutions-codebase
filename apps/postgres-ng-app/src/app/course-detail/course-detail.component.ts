import { Component, Input, OnInit } from '@angular/core';

import { CourseDetail } from '@codebase/shared/data-access-models';

@Component({
  selector: 'course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss'],
})
export class CourseDetailComponent implements OnInit {
  @Input()
  courseDetail: CourseDetail;

  constructor() {}

  ngOnInit(): void {}
}
