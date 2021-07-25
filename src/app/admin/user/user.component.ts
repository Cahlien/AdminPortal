import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/shared/services/http.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/shared/models/user.model';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private httpService: HttpService, private fb: FormBuilder, private modalService: NgbModal) { }

  //constructor(private http: HttpClient, private fb: FormBuilder, private modalService: NgbModal) { }

  users: User[] = new Array();
  updateUserForm!: FormGroup;



  modalRef!: NgbModalRef;
  errorMessage: any;
  closeResult: any;
  modalHeader!: String;

  ngOnInit(): void {
    this.loadUsers();
    //sthis.initializeForms();
  }

  loadUsers(): any{
    this.httpService
    .getAll('http://localhost:8080/admin/users')
    .subscribe((response) => {
      let arr: any;
      arr = response;
      for(let obj of arr){
        console.log(obj.dateOfBirth);
        let u = new User(obj.username, obj.password, obj.email, obj.phone, 
          obj.firstName, obj.lastName, obj.dateOfBirth, obj.role, obj.userId);
        console.log(u);
        this.users.push(u);
      }
    })
  }

  initializeForms(){
    this.updateUserForm = new FormGroup({
      userId: new FormControl('',[Validators.required, Validators.maxLength(20)]),
      username: new FormControl('',[Validators.required, Validators.maxLength(20)]),
      password: new FormControl('',[Validators.required, Validators.maxLength(20)]),
      email: new FormControl('',[Validators.required, Validators.maxLength(30)]),
      phone: new FormControl('',[Validators.required, Validators.maxLength(10)]),
      firstName: new FormControl('',[Validators.required, Validators.maxLength(20)]),
      lastName: new FormControl('',[Validators.required, Validators.maxLength(20)]),
      dateOfBirth: new FormControl('',[Validators.required, Validators.maxLength(10)]),
      role: new FormControl('',[Validators.required, Validators.maxLength(20)])
    })
  }

  deleteUser(id: String){
    alert("delete user " + id);
    this.httpService.deleteById('http://localhost:8080/admin/users/id/' + id).subscribe((result)=>{
      console.log(result);
      this.users.length = 0;
      this.loadUsers();
    })
  }

  saveUser(){
    console.log("save");
    alert("save user " + this.updateUserForm.controls['dateOfBirth'].value);
    let u = new User(
      this.updateUserForm.controls['username'].value,
      this.updateUserForm.controls['password'].value,
      this.updateUserForm.controls['email'].value,
      this.updateUserForm.controls['phone'].value,
      this.updateUserForm.controls['firstName'].value, 
      this.updateUserForm.controls['lastName'].value,
      this.updateUserForm.controls['dateOfBirth'].value,
      this.updateUserForm.controls['role'].value,
      this.updateUserForm.controls['userId'].value);
    
    const body = JSON.stringify(u);
    console.log(body);

    if (!this.updateUserForm.controls['userId'].value){
      console.log("saving...");
      this.httpService.create('http://localhost:8080/admin/users', body).subscribe((result)=>{
        console.log("save" + result);
        this.users.length = 0;
        this.loadUsers();
      })
    }
    else{
      console.log("editing...");
      this.httpService.update('http://localhost:8080/admin/users/id/' + this.updateUserForm.controls['userId'].value, body).subscribe((result)=>{
        console.log("updating" + result);
        this.users.length = 0;
        this.loadUsers();
      })
    }
    //this.loadUsers();
  }

  //{ username: String; password: String; email: String; phone: String; 
  //firstName: String; lastName: String; dateOfBirth: String; role: String, userId: String}
  open(content: any, u: User | null){
    if (u!== null){
      this.modalHeader = 'Edit User';
      console.log("createModal False");
      this.updateUserForm = this.fb.group({
        userId: u.$userId,
        username: u.$username,
        password: u.$password,
        email: u.$email,
        phone: u.$phone,
        firstName: u.$firstName,
        lastName: u.$lastName,
        dateOfBirth: u.$dateOfBirth,
        role: u.$role
      });
    } else{
      this.modalHeader = 'Add New User';
      console.log("createModal True");
      if(this.updateUserForm){
        console.log("updateuserform");
        this.updateUserForm.reset();
        this.updateUserForm = this.fb.group({
          userId: '',
          username: '',
          password: '',
          email: '',
          phone: '',
          firstName: '',
          lastName: '',
          dateOfBirth: '',
          role: ''
        })
      }
      
    }
    this.modalRef = this.modalService.open(content);
    this.modalRef.result.then(
      (result) => {
        this.errorMessage = '';
      },
      (reason) => {
        this.errorMessage = 'Something went wrong';
      }
    );
  }

  closeModal(){
    this.modalRef.close();
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      //this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
