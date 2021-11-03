import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators, } from "@angular/forms";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { HttpService } from "src/app/shared/services/http.service";
import { Account } from "src/app/shared/models/account.model";
import { User } from "src/app/shared/models/user.model";
import { PageEvent } from "@angular/material/paginator";
import { CurrencyValue } from "../../shared/models/currencyvalue.model";
import { AccountType } from "src/app/shared/models/accounttype.model";


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
  activeAccount!: Account;
  activeAccountType!: AccountType;

  modalRef!: NgbModalRef;
  errorMessage: any;
  closeResult: any;
  modalHeader!: String;
  totalItems: any;
  pageIndex: any;
  pageSize: any;
  editing!: boolean;
  depositReady: boolean = false;


  @Input() search!: string;
  @Output() searchChange = new EventEmitter<string>();

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
    { name: "user", displayName: "User ID", class: "col-2" },
    { name: "id", displayName: "Account ID", class: "col-3" },
    { name: "activeStatus", displayName: "Is Active", class: "col-3" },
    { name: "balance", displayName: "Balance", class: "col-2" },
    { name: "createDate", displayName: "Date Created", class: "col-2" },
    { name: "interest", displayName: "Interest Rate", class: "col-2" },
    { name: "nickname", displayName: "Nickname", class: "col-3" },
    // { name: "description", displayName: "Description", class: "col-3" },
    { name: "type", displayName: "Account Type", class: "col-3" }
  ];


  constructor(private httpService: HttpService, private fb: FormBuilder, private modalService: NgbModal) { }
  ngOnInit(): void {
    this.totalItems = 0;
    this.pageIndex = 0;
    this.pageSize = 5;
    this.update();
  }

  onChangePage(pe: PageEvent) {
    this.pageIndex = pe.pageIndex;
    if (pe.pageSize !== this.pageSize) {
      this.pageIndex = 0;
      this.pageSize = pe.pageSize;
    }
    this.accounts = new Array();
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

  getTypeId(type: string): number {
    switch (type) {
      case 'SuperSaver':
        return 1;
      case 'CoolCash':
        return 2;
      case 'Recovery':
        return 4;
      case 'Teller':
        return 3;
      case 'ATM':
        return 7;
      case 'Third Party':
        return 8;
        default:
          return 9
    }
    // return Math.random().toString(16).substr(2, 8) + '-' + Math.random().toString(16).substr(2, 8) + '-' + Math.random().toString(16).substr(2, 8) + '-' + Math.random().toString(16).substr(2, 8)
  }

  async requestAccount() {
    if (this.updateAccountForm.controls['userId'].value &&
    this.updateAccountForm.controls['interest'].value &&
    this.updateAccountForm.controls['createDate'].value &&
    this.updateAccountForm.controls['type'].value) {
      let today = new Date();
      let expire = today.getDate() + 3000
      console.log('expire date: ', expire)
      var at = new AccountType(
        this.getTypeId(this.updateAccountForm.value.type),
        this.updateAccountForm.value.type,
        this.updateAccountForm.value.description,
        true,
        today,
        new Date(expire),
        this.updateAccountForm.value.nickname)
      this.depositReady = true;
      const a = await this.httpService.getNewUUID('http://localhost:9001/accounts/new', this.updateAccountForm.controls['userId'].value)
      console.log('account received: ', a)
      this.activeAccount = a;
      console.log('active account: ', this.activeAccount)
      console.log('account form: ', this.updateAccountForm.value)
      this.updateAccountForm.controls['activeStatus'].setValue(true);
      this.activeAccount.interest = this.updateAccountForm.value.interest;
      this.activeAccountType = at;
    } else {
      window.alert('Only the description and Nickname fields may be left blank. Please fill out all other fields before attempting to activate a new account.')
    }
  }

  refresh() {
    this.search = "";
    this.sort = 'Id';
    this.dir = 'asc';
    this.totalItems = 0;
    this.pageIndex = 0;
    this.pageSize = 5;
    this.update();
  }

  update() {
    this.accounts = [];
    this.data = { status: "pending", content: [], totalElements: 0, totalPages: 0 };
    this.httpService.getAccounts(this.pageIndex, this.pageSize, this.sort, this.dir, this.search)
      .subscribe((res) => {
        console.log(res);
        let arr: any;
        arr = res;
        this.totalItems = arr.totalElements;
        for (let obj of arr.content) {
          let u = new Account(obj.user, obj.id, obj.activeStatus, CurrencyValue.from(obj.balance),
            obj.createDate, obj.interest, obj.nickname, obj.type);
          this.accounts.push(u);
        }
        this.data = {
          status: "success",
          content: arr.content,
          totalElements: arr.numberOfElements,
          totalPages: arr.totalPages
        };
      }, (err) => {
        console.error("Failed to retrieve accounts", err);
        console.log('error status: ', err.status)
        this.data = { status: "error", content: [], totalElements: 0, totalPages: 0 };
        if (err.status === 503) {
          setTimeout(() => {
            console.log('sleeping...')
            window.alert('[503 ERROR: ACCOUNTSERVICE] \nServers did not respond. They may be down, or your connection may be interrupted. Page will refresh until a connedction can be established')
            window.location.reload();
          }, 5000);
        }
      })
  }

  initializeForms() {
    this.updateAccountForm = new FormGroup({
      user: new FormControl('', [Validators.required, Validators.minLength(32), Validators.maxLength(32), Validators.pattern("/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/")]),
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
      console.log('active account: ', this.activeAccount)
      console.log('active account type: ', this.activeAccountType)
      let u = this.activeAccount.user;
      let a = new Account(
        u,
        this.activeAccount.id,
        true,
        CurrencyValue.valueOf(this.updateAccountForm.controls['balance'].value),
        this.activeAccountType.$createDate,
        this.activeAccount.interest,
        this.updateAccountForm.controls['nickname'].value,
        this.activeAccountType);
        a.type.description = this.updateAccountForm.value.description;
      console.log(a)
      const body = a;
      const modelBody = {
        userId: a.user.userId,
        balance: a.$balance,
        createDate: a.$createDate,
        type_id: this.activeAccountType.$id,
        type: {
          id: this.activeAccountType.$id,
          name: this.activeAccountType.name,
          description: this.activeAccountType.description,
          isActive: true,
          createDate: a.$createDate,
          expireDate: this.activeAccountType.$expireDate,
          nickname: a.$nickname
        },
        nickname: a.$nickname,
        interest: a.interest,
        activeStatus: true
      };
      console.log('body created: ', body)

      if (!this.updateAccountForm.controls['nickname'].value) {
        window.confirm('Save Acount ' + this.updateAccountForm.controls['id'].value + '?');
      }
      else {
        window.confirm('Save Acount ' + this.updateAccountForm.controls['nickname'].value + '?');
      }
      if (!this.editing) {
        this.httpService.create('http://localhost:9001/accounts', modelBody).subscribe((result) => {
          console.log("creating " + result);
          this.accounts.length = 0;
          this.update()
          window.location.reload();
        });
      } else {
        this.httpService.update('http://localhost:9001/accounts', body).subscribe((result) => {
          console.log("updating " + result);
          this.accounts.length = 0;
          this.update()
          window.location.reload();
        });
      }
    } else {
      console.log('userId: ', this.updateAccountForm.controls['userId'].value)
      console.log('activeStatus: ', this.updateAccountForm.controls['activeStatus'].value)
      console.log('balance: ', this.updateAccountForm.controls['balance'].value)
      console.log('createDate: ', this.updateAccountForm.controls['createDate'].value)
      console.log('nickname: ', this.updateAccountForm.controls['nickname'].value)
      console.log('type: ', this.updateAccountForm.controls['type'].value)
      alert("Only the Nickname and Activity sections may be left blank.")
    }
  }

  async open(content: any, u: Account | null) {
    if (u !== null) {
      this.activeAccount = u;
      this.activeAccountType = u?.$type;
      let bValue = u.$balance.dollars + (u.$balance.cents / 100)
      if (u.$balance.isNegative) {
        bValue *= -1;
      }
      this.editing = true;
      console.log('editing account: ', u)
      this.modalHeader = 'Edit Account';
      this.updateAccountForm = this.fb.group({
        user: u.$user,
        userId: u.$user.userId,
        id: u.$id,
        activeStatus: u.$activeStatus,
        balance: bValue,
        createDate: u.$createDate,
        interest: u.$interest,
        nickname: u.$nickname,
        type: u.$type.name,
        description: u.$type.description
      });
    } else {
      this.editing = false;
      this.modalHeader = 'Add New Account';
      const uuid = await this.httpService.getNewUUID('http://localhost:9001/accounts/new');
      console.log('rcv\'d: ', uuid);
      this.updateAccountForm = this.fb.group({
        userId: '',
        id: uuid.id,
        activeStatus: '',
        balance: '',
        createDate: new Date().toJSON().slice(0, 10),
        interest: '',
        nickname: '',
        type: '',
        description: ''
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
    this.depositReady = false;
    this.editing = false;
  }

  get user() { return this.updateAccountForm.get('user'); }
  get userId() { return this.updateAccountForm.get('userId'); }
  get activeStatus() { return this.updateAccountForm.get('activeStatus'); }
  get balance() { return this.updateAccountForm.get('balance'); }
  get createDate() { return this.updateAccountForm.get('createDate'); }
  get interest() { return this.updateAccountForm.get('interest'); }
  get nickname() { return this.updateAccountForm.get('nickname'); }
  get type() { return this.updateAccountForm.get('type'); }
}
