import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { CourseDetail, Data } from '@codebase/shared/data-access-models';

import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  constructor(private http: HttpClient) {}

  // https://stackoverflow.com/questions/46005430/property-json-does-not-exist-on-type-object
  // loadCourseDetail(courseId: number): Observable<CourseDetail> {
  //   return this.http.get<CourseDetail>(`/api/v1/courses/${courseId}`);
  // }

  loadCourseDetail(courseId: number): Observable<CourseDetail> {
    return this.http
      .get<Data<CourseDetail>>(`/api/v1/courses/${courseId}`)
      .pipe(map((data): CourseDetail => data.payload));
  }
}
