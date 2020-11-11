import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import * as moment from 'moment';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {
  userList = [
    {avatar: `./assets/images.png`, name:`harish`, email:`harish@gmail.com`,experience:`2 Years 4 months`},
    {avatar: `./assets/images.png`, name:`pradeep`, email:`pradeep@gmail.com`, experience:`6 months`},
    {avatar: `./assets/images.png`, name:`ritesh`, email:`ritesh@gmail.com`,experience:`1 month`},
    {avatar: `./assets/images.png`, name:`chigar`, email:`chirag@gmail.com`,experience:`1 mnonth`}
  ];

  modalRef: BsModalRef;
  userForm: FormGroup;
  stillWorking;
  pic: File;
  leavingDate: any;

  constructor( private modalService: BsModalService,
    private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/[a-zåäö ]/i)]],
      email: ['', [Validators.required, Validators.pattern(/\S+@\S+\.\S+/)]],
      joiningDate: ['', Validators.required],
      leavingDate: ['',Validators.required]
    });
  }

  remove(index) {
    let res = confirm('Are you sure you want to delete');
    if ( res === true && index !== -1) {
        this.userList.splice(index, 1);
    }
  }

  add(template) {
    this.modalRef = this.modalService.show(template,
      {
        class: 'modal-dialog-centered modal-lg',
      });
  }

  working(event){
    this.stillWorking = event.target.checked;
  }

  addUser() {
    if(this.stillWorking) {
      this.userForm.controls.leavingDate.setValue(new Date());
    }
    let d1 = new Date(this.userForm.value.leavingDate);               
    let d2 = new Date(this.userForm.value.joiningDate);
    let diff = new Date(
    d1.getFullYear()-d2.getFullYear(), 
    d1.getMonth()-d2.getMonth(), 
    d1.getDate()-d2.getDate()
  );
  let exp = `${diff.getYear()} years ${diff.getMonth()} months` ;

  if( this.userForm.valid ) {
    this.userList.push(
      {
        avatar:  `./assets/images.png`,
        name: this.userForm.value.name,
        email:this.userForm.value.email,
        experience: exp
      },
    );
    this.modalRef.hide();
    this.userForm.reset();
  } else {
    alert('please fill the form');
  }
  }
  onImagePicked(event: Event) {
     this.pic = (event.target as HTMLInputElement).files[0];
  }
}
