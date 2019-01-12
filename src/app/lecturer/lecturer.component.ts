import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LecturerService } from './lecturer.service';

@Component({
  selector: 'app-lecturer',
  templateUrl: './lecturer.component.html',
  styleUrls: ['./lecturer.component.css']
})
export class LecturerComponent implements OnInit {

  lecturerForm = new FormGroup({
    _links: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    address: new FormControl(''),
    telephone: new FormControl(''),
    email: new FormControl(''),
    department: new FormControl('')
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
    'department',
    'action'
  ];
  pageSizeOptions: number[] = [5, 10, 25, 100, 150];
  constructor(private service: LecturerService) { }

  onSubmit() {
    console.warn(this.lecturerForm.value);
  }

  ngOnInit() {
    this.fillTable();
  }

  save() {
    const value = this.lecturerForm.value;
    console.log(value);
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
    // element.dateOfBirth = new Date(element.dateOfBirth);
    this.lecturerForm.patchValue(element);
  }

  pageEvent(event) {
    this.page.size = event.pageSize;
    this.page.number = event.pageIndex;
    this.fillTable();
  }

  clearForm(): any {
    this.lecturerForm.reset();
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
