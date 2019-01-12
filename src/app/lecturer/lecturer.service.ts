import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LecturerService {
  readonly API_END_POINT = 'http://localhost:8080/lecturers';

  constructor(private http: HttpClient) {}

  get(pageNumber = 0, pageSize = 5): Observable<any> {
    return this.http.get(
      this.API_END_POINT + '?page=' + pageNumber + '&size=' + pageSize
    );
  }

  post(entity) {
    return this.http.post(this.API_END_POINT, entity);
  }

  put(element) {
    return this.http.put(element._links.self.href, element);
  }

  patch(element) {
    return this.http.patch(element._links.self.href, element);
  }

  delete(element: any) {
    return this.http.delete(element._links.self.href);
  }
}
