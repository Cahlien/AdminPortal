import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators, } from "@angular/forms";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { HttpService } from "src/app/shared/services/http.service";
import { Account } from "src/app/shared/models/account.model";
import { User } from "src/app/shared/models/user.model";
import { Observable, of } from "rxjs";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css'],
})
export class AccountComponent implements OnInit {

  accounts: Account[] = new Array();
  users: User[] = new Array();
  sortedAccounts: Account[] = new Array();
  updateAccountForm!: FormGroup;

  modalRef!: NgbModalRef;
  errorMessage: any;
  closeResult: any;
  modalHeader!: String;

  constructor(private httpService: HttpService, private fb: FormBuilder, private modalService: NgbModal) { }
  ngOnInit(): void {
    this.loadAccounts();
    this.loadUsers();
    this.sortAccounts();
    //this.initializeForms();
  }

  loadAccounts(): any {
    this.httpService
      .getAll("http://localhost:9001/accounts/all")
      .subscribe((response) => {
        let arr: any;
        arr = response;
        for (let obj of arr) {
          console.log(obj.nickname);
          let u = new Account(obj.userId, obj.accountId, obj.active_status, obj.balance,
            obj.create_date, obj.interest, obj.nickname, obj.type);
          u.fixBalance(); //<--VERY IMPORTANT!!!
          this.accounts.push(u);
        }
      })
  }

  loadUsers(): any {
    this.httpService
      .getAll('http://localhost:9001/users')
      .subscribe((response) => {
        let arr: any;
        arr = response;
        for (let obj of arr) {
          console.log(obj.firstName);
          let u = new User(obj.username, obj.password, obj.email, obj.phone,
            obj.firstName, obj.lastName, obj.dateOfBirth, obj.role, obj.userId);
          this.users.push(u);
        }
        this.sortAccounts();
      })
  }

  sortAccounts(): any {
    for (var i = 0; i < this.users.length; i++) {
      for (var j = 0; j < this.accounts.length; j++) {
        if (this.accounts[j].$userId == this.users[i].$userId) {
          this.accounts[j].$firstName = this.users[i].$firstName;
          this.accounts[j].$lastName = this.users[i].$lastName;
          this.sortedAccounts.push(this.accounts[j]);
          console.log('accounts length: ' + this.sortedAccounts.length)
        }
        else {
          this.accounts[j].$firstName = 'Unrecognized user ID'
          this.accounts[j].$lastName = 'Please Fix'
          this.sortedAccounts.push(this.accounts[j])
        }
      }
    }
  }

  initializeForms() {
    this.updateAccountForm = new FormGroup({
      userId: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      accountId: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      active_status: new FormControl('', [Validators.required]),
      balance: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      create_date: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      interest: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      nickname: new FormControl('', [Validators.maxLength(50)]),
      type: new FormControl('', [Validators.required, Validators.maxLength(10)])
    })
  }

  deactivateAccount(id: String) {
    if (window.confirm('Are you sure you want to remove: ' + id + '? It will be removed from the database completely.')) {
      this.httpService.deleteById("http://localhost:9001/accounts/" + id).subscribe((result) => {
        console.log(result);
        this.users.length = 0;
        this.loadUsers();
      });
      window.location.reload();
    }
  };

  formFilledCheck() {
    if (this.updateAccountForm.controls['userId'].value &&
      this.updateAccountForm.controls['accountId'].value &&
      this.updateAccountForm.controls['balance'].value &&
      this.updateAccountForm.controls['interest'].value &&
      this.updateAccountForm.controls['create_date'].value &&
      this.updateAccountForm.controls['type'].value) {
      console.log('form is filled');
      return true;
    } else {
      console.log('form isn\'t filled');
      return false;
    }
  }

  saveAccount() {
    if (this.formFilledCheck()) {
      let u = new Account(
        this.updateAccountForm.controls['userId'].value,
        this.updateAccountForm.controls['accountId'].value,
        this.updateAccountForm.controls['active_status'].value,
        this.updateAccountForm.controls['balance'].value * 100,//<-- VERY IMPORTANT!!!
        this.updateAccountForm.controls['create_date'].value,
        this.updateAccountForm.controls['interest'].value,
        this.updateAccountForm.controls['nickname'].value,
        this.updateAccountForm.controls['type'].value);

      const body = JSON.stringify(u);

      if (!this.updateAccountForm.controls['nickname'].value) {
        alert('Save Acount ' + this.updateAccountForm.controls['accountId'].value + '?');
      }
      else {
        alert('Save Acount ' + this.updateAccountForm.controls['nickname'].value + '?');
      }
      this.httpService.update('http://localhost:9001/accounts', body).subscribe((result) => {
        console.log("updating" + result);
        this.accounts.length = 0;
        this.loadAccounts();
        window.location.reload();
      });
    } else {
      alert("Only the Nickname and Activity sections may be left blank.")
    }
  }

  async open(content: any, u: Account | null) {
    if (u !== null) {
      this.modalHeader = 'Edit Account';
      this.updateAccountForm = this.fb.group({
        userId: u.$userId,
        accountId: u.$accountId,
        active_status: u.$active_status,
        balance: u.$balance,
        create_date: u.$create_date,
        interest: u.$interest,
        nickname: u.$nickname,
        type: u.$type,
      });
    } else {
      this.modalHeader = 'Add New Account';
      const uuid = await this.httpService.getNewAccount('http://localhost:9001/accounts/new');
      console.log('rcv\'d: ', uuid);
      this.updateAccountForm = this.fb.group({
        userId: '',
        accountId: uuid,
        active_status: '',
        balance: '',
        create_date: '',
        interest: '',
        nickname: '',
        type: ''
      })
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
  closeModal() {
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