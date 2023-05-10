import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private student = new BehaviorSubject<any>(null);
  student$ = this.student.asObservable();


  constructor() {

  }

  sendStudent(student: any) {
    this.student.next(student);
  }

}
