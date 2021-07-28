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
  userForm!: FormGroup;
  modalRef!: NgbModalRef;
  errorMessage: any;
  closeResult: any;
  modalHeader!: String;

  ngOnInit(): void {
    this.loadUsers();
    this.initializeForms();
    //sthis.initializeForms();
  }

  loadUsers(): any{
    this.httpService
    .getAll('http://localhost:9001/admin/users')
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
    this.userForm = this.fb.group({
      userId: new FormControl(''),
      username: new FormControl('',[Validators.required, Validators.maxLength(20)]),
      password: new FormControl('',[Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
      email: new FormControl('',[Validators.required, Validators.maxLength(30), Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      phone: new FormControl('',[Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      firstName: new FormControl('',[Validators.required, Validators.maxLength(20)]),
      lastName: new FormControl('',[Validators.required, Validators.maxLength(20)]),
      dateOfBirth: new FormControl('',[Validators.required, Validators.maxLength(10)]),
      role: new FormControl('',[Validators.required])
    })
  }

  deleteUser(id: String){
    this.httpService.deleteById('http://localhost:9001/admin/users/' + id).subscribe((result)=>{
      console.log(result);
      this.users.length = 0;
      this.loadUsers();
    })
  }

  saveUser(){
    let u = new User(
      this.userForm.controls['username'].value,
      this.userForm.controls['password'].value,
      this.userForm.controls['email'].value,
      this.userForm.controls['phone'].value,
      this.userForm.controls['firstName'].value, 
      this.userForm.controls['lastName'].value,
      this.userForm.controls['dateOfBirth'].value,
      this.userForm.controls['role'].value,
      this.userForm.controls['userId'].value);
    
    const body = JSON.stringify(u);

    if (!this.userForm.controls['userId'].value){
      this.httpService.create('http://localhost:9001/users', body).subscribe((result)=>{
        this.users.length = 0;
        this.loadUsers();
      })
    }
    else{
      this.httpService.update('http://localhost:9001/admin/users/' + this.userForm.controls['userId'].value, body).subscribe((result)=>{
        this.users.length = 0;
        this.loadUsers();
      })
    }
    this.initializeForms();
    //this.loadUsers();
  }

  //{ username: String; password: String; email: String; phone: String; 
  //firstName: String; lastName: String; dateOfBirth: String; role: String, userId: String}
  open(content: any, u: User | null){
    if (u!== null){
      this.modalHeader = 'Edit User';
      this.userForm = this.fb.group({
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
    } 
    else{
      this.modalHeader = 'Add New User';
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

  get username() { return this.userForm.get('username'); }
  get password() { return this.userForm.get('password'); }
  get email() { return this.userForm.get('email'); }
  get phone() { return this.userForm.get('phone'); }
  get firstName() { return this.userForm.get('firstName'); }
  get lastName() { return this.userForm.get('lastName'); }
  get dateOfBirth() { return this.userForm.get('dateOfBirth'); }
  get role() { return this.userForm.get('role'); }
}
