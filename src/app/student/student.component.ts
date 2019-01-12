import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { StudentService } from './student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  hide = true;

  studentForm = new FormGroup({
    _links: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    address: new FormControl(''),
    telephone: new FormControl(''),
    email: new FormControl(''),
    dateOfBirth: new FormControl(''),
    gender: new FormControl('')
  });

  dataSource = [];
  page: any = {
    size: 5,
    totalElements: 0,
    pageIndex: 0
  };

  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'address',
    'telephone',
    'email',
    'dateOfBirth',
    'gender',
    'action'
  ];
  pageSizeOptions: number[] = [5, 10, 25, 100, 150];

  constructor(private service: StudentService) {}

  // onSubmit() {
  //   console.warn(this.studentForm.value);
  // }

  ngOnInit() {
    this.fillTable();
  }

  save() {
    const value = this.studentForm.value;
    // console.log(value);
    if (value._links === '' || value._links === null) {
      this.service.post(value).subscribe(() => {
        this.clearForm();
        this.fillTable();
      });
    } else {
      this.service.put(value).subscribe(() => {
        this.clearForm();
        this.fillTable();
      });
    }
  }

  delete(element: any) {
    this.service.delete(element).subscribe(response => {
      this.fillTable();
    });
  }

  edit(element: any) {
    // console.log(element);
    element.dateOfBirth = new Date(element.dateOfBirth);
    this.studentForm.patchValue(element);
  }

  pageEvent(event) {
    this.page.size = event.pageSize;
    this.page.number = event.pageIndex;
    this.fillTable();
  }

  clearForm(): any {
    this.studentForm.reset();
  }

  // deleteForm(): any {
  //   this.studentForm.reset()
  // }

  fillTable(): any {
    // console.log('Requesting');
    this.service
      .get(this.page.number, this.page.size)
      .subscribe((response: any) => {
        // console.log('Received');
        this.page = response.page;
        this.dataSource =
          response._embedded[Object.keys(response._embedded)[0]];
      });
    // console.log('Requested');
  }
}
