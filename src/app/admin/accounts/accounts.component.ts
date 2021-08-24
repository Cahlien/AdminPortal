import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators, } from "@angular/forms";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { HttpService } from "src/app/shared/services/http.service";
import { Account } from "src/app/shared/models/account.model";
import { User } from "src/app/shared/models/user.model";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css'],
})
export class AccountComponent implements OnInit {
  accounts: Account[] = new Array();
  users: User[] = new Array();
  namedAccounts: Account[] = new Array();
  updateAccountForm!: FormGroup;

  modalRef!: NgbModalRef;
  errorMessage: any;
  closeResult: any;
  modalHeader!: String;

  @Input() search!: string;
  @Output() searchChange = new EventEmitter<string>();

  @Input() pageNumber: number = 0;
  @Output() pageNumberChange = new EventEmitter<number>();

  @Input() resultsPerPage: number = 10;
  @Output() resultsPerPageChange = new EventEmitter<number>();

  @Input() sort!: string;
  @Output() sortChange = new EventEmitter<number>();

  @Input() asc!: boolean;
  @Output() ascChange = new EventEmitter<number>();

  @Input() dir!: string;
  @Output() dirChange = new EventEmitter<number>();

  data: {
    status: string,
    content: Account[],
    totalElements: number,
    totalPages: number
  } = { status: "notYetPending", content: [], totalElements: 0, totalPages: 0 };

  account = [
    { name: "userId", displayName: "User ID", class: "col-2" },
    { name: "accountId", displayName: "Account ID", class: "col-3" },
    { name: "activeStatus", displayName: "Is Active", class: "col-3" },
    { name: "balance", displayName: "Balance", class: "col-2" },
    { name: "createDate", displayName: "Date Created", class: "col-2" },
    { name: "interest", displayName: "Interest Rate", class: "col-2" },
    { name: "nickname", displayName: "Nickname", class: "col-3" },
    { name: "type", displayName: "Account Type", class: "col-3" }
  ];


  constructor(private httpService: HttpService, private fb: FormBuilder, private modalService: NgbModal) { }
  ngOnInit(): void {
    this.update();
  }

  setPage(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.update();
  }

  setResultsPerPage(resultsPerPage: number) {
    this.pageNumber = 0;
    this.resultsPerPage = resultsPerPage;
    this.update();
  }

  setSort(property: string) {
    if (this.asc && this.sort === property) {
      this.asc = false;
      this.dir = "desc";
      this.update();
    } else {
      console.log('asc true')
      if (property !== 'firstName' && property !== 'lastName') {
        this.sort = property;
        this.asc = true;
        this.dir = "asc";
        this.update();
      }
      else {
        alert('Cannot sort by name.')
      }
    }
  }

  setSearch(search: string) {
    this.search = search;
  }

  update() {
    this.accounts = [];
    this.data = { status: "pending", content: [], totalElements: 0, totalPages: 0 };
    this.httpService.getAccounts(this.pageNumber, this.resultsPerPage, this.sort, this.dir, this.search)
    .subscribe((res) => {
      console.log(res);
      let arr: any;
      arr = res;
      for (let obj of arr.content) {
        let u = new Account(obj.userId, obj.accountId, obj.activeStatus, obj.balance,
          obj.createDate, obj.interest, obj.nickname, obj.type);
        u.fixBalance(); //<--VERY IMPORTANT!!!
        this.accounts.push(u);
        console.log('accounts: ', this.accounts)
      }
      this.data = {
        status: "success",
        content: arr.content,
        totalElements: arr.numberOfElements,
        totalPages: arr.totalPages
      };
    }, (err) => {
      console.error("Failed to retrieve accounts", err);
      this.data = { status: "error", content: [], totalElements: 0, totalPages: 0 };
    })
  }

  initializeForms() {
    this.updateAccountForm = new FormGroup({
      userId: new FormControl('', [Validators.required, Validators.minLength(32), Validators.maxLength(32), Validators.pattern("/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/")]),
      activeStatus: new FormControl('', [Validators.required]),
      balance: new FormControl('', [Validators.required]),
      createDate: new FormControl('', [Validators.required]),
      interest: new FormControl('', [Validators.required, Validators.maxLength(3)]),
      nickname: new FormControl('', [Validators.maxLength(50)]),
      type: new FormControl('', [Validators.required])
    })
  }

  deactivateAccount(id: String) {
    if (window.confirm('Are you sure you want to remove: ' + id + '? It will be removed from the database completely.')) {
      this.httpService.deleteById("http://localhost:9001/accounts/" + id).subscribe((result) => {
        console.log(result);
        this.users.length = 0;
      });
      window.location.reload();
    }
  };

  formFilledCheck() {
    if (this.updateAccountForm.controls['userId'].value &&
      this.updateAccountForm.controls['accountId'].value &&
      this.updateAccountForm.controls['balance'].value &&
      this.updateAccountForm.controls['interest'].value &&
      this.updateAccountForm.controls['createDate'].value &&
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
        this.updateAccountForm.controls['activeStatus'].value,
        this.updateAccountForm.controls['balance'].value * 100,//<-- VERY IMPORTANT!!!
        this.updateAccountForm.controls['createDate'].value,
        this.updateAccountForm.controls['interest'].value,
        this.updateAccountForm.controls['nickname'].value,
        this.updateAccountForm.controls['type'].value);

      const body = JSON.stringify(u);

      if (!this.updateAccountForm.controls['nickname'].value) {
        window.confirm('Save Acount ' + this.updateAccountForm.controls['accountId'].value + '?');
      }
      else {
        window.confirm('Save Acount ' + this.updateAccountForm.controls['nickname'].value + '?');
      }
      this.httpService.update('http://localhost:9001/accounts', body).subscribe((result) => {
        console.log("updating" + result);
        this.accounts.length = 0;
        this.update()
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
        activeStatus: u.$activeStatus,
        balance: u.$balance,
        createDate: u.$createDate,
        interest: u.$interest,
        nickname: u.$nickname,
        type: u.$type,
      });
    } else {
      this.modalHeader = 'Add New Account';
      const uuid = await this.httpService.getNewUUID('http://localhost:9001/accounts/new');
      console.log('rcv\'d: ', uuid);
      this.updateAccountForm = this.fb.group({
        userId: '',
        accountId: uuid,
        activeStatus: '',
        balance: '',
        createDate: '',
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

  get userId() { return this.updateAccountForm.get('userId'); }
  get activeStatus() { return this.updateAccountForm.get('activeStatus'); }
  get balance() { return this.updateAccountForm.get('balance'); }
  get createDate() { return this.updateAccountForm.get('createDate'); }
  get interest() { return this.updateAccountForm.get('interest'); }
  get nickname() { return this.updateAccountForm.get('nickname'); }
  get type() { return this.updateAccountForm.get('type'); }
}