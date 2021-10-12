import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators, } from "@angular/forms";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { HttpService } from "src/app/shared/services/http.service";
import { Loan } from "src/app/shared/models/loan.model";
import { User } from "src/app/shared/models/user.model";
import { PageEvent } from "@angular/material/paginator";
import {CurrencyValue} from "../../shared/models/currencyvalue.model";
import { LoanType } from "src/app/shared/models/loanType.model";

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css'],
})
export class LoanComponent implements OnInit {
  loans: Loan[] = new Array();
  users: User[] = new Array();
  loanTypes: LoanType[] = new Array();
  updateLoanForm!: FormGroup;

  modalRef!: NgbModalRef;
  errorMessage: any;
  closeResult: any;
  modalHeader!: String;
  totalItems: any;
  pageIndex: any;
  pageSize: any;
  editing!: boolean;


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
    content: Loan[],
    totalElements: number,
    totalPages: number
  } = { status: "notYetPending", content: [], totalElements: 0, totalPages: 0 };

  loan = [
    { name: "userId", displayName: "User ID", class: "col-2" },
    { name: "loanId", displayName: "Loan ID", class: "col-3" },
    { name: "loanType.typeName", displayName: "Type", class: "col-2" },
    { name: "loanType.apr", displayName: "APR", class: "col-2" },
    { name: "balance", displayName: "Balance", class: "col-2" },
    { name: "principal", displayName: "Principal", class: "col-2" },
    { name: "loanType.numMonths", displayName: "Month Duration", class: "col-2" },
    { name: "createDate", displayName: "Date Created", class: "col-2" },
    { name: "nextDueDate", displayName: "Next Due Date", class: "col-2" },
    { name: "previousDueDate", displayName: "Previous Due Date", class: "col-2" }
  ];


  constructor(private httpService: HttpService, private fb: FormBuilder, private modalService: NgbModal) { }
  ngOnInit(): void {
    this.totalItems = 0;
    this.pageIndex = 0;
    this.pageSize = 5;
    this.update();
  }

  onChangePage(pe:PageEvent) {
    this.pageIndex = pe.pageIndex;
    if(pe.pageSize !== this.pageSize){
      this.pageIndex = 0;
      this.pageSize = pe.pageSize;
    }
    this.loans = new Array();
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
    this.loans = [];
    this.data = { status: "pending", content: [], totalElements: 0, totalPages: 0 };
    this.httpService.getLoans(this.pageIndex, this.pageSize, this.sort, this.dir, this.search)
    .subscribe((res) => {
      console.log(res);
      let arr: any;
      arr = res;
      this.totalItems = arr.totalElements;
      for (let obj of arr.content) {
        let u = new Loan(obj.createDate, CurrencyValue.from(obj.balance), CurrencyValue.from(obj.principal), obj.loanId, obj.loanType,
          obj.nextDueDate, obj.previousDueDate, obj.userId, obj.valueTitle);
        this.loans.push(u);
      }
      this.data = {
        status: "success",
        content: arr.content,
        totalElements: arr.numberOfElements,
        totalPages: arr.totalPages
      };
    }, (err) => {
      console.error("Failed to retrieve loans", err);
      this.data = { status: "error", content: [], totalElements: 0, totalPages: 0 };
    })
  }

  initializeForms() {
    this.updateLoanForm = new FormGroup({
      loanId: new FormControl('', [Validators.required, Validators.minLength(32), Validators.maxLength(32), Validators.pattern("/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/")]),
      userId: new FormControl('', [Validators.required, Validators.minLength(32), Validators.maxLength(32), Validators.pattern("/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/")]),
      loanType: new FormControl('', [Validators.required]),
      balance: new FormControl('', [Validators.required]),
      createDate: new FormControl('', [Validators.required]),
      interest: new FormControl('', [Validators.required, Validators.maxLength(3)]),
      nickname: new FormControl('', [Validators.maxLength(50)]),
      type: new FormControl('', [Validators.required])
    })
  }

  deleteLoan(id: String) {
    if (window.confirm('Are you sure you want to remove: ' + id + '? It will be removed from the database completely.')) {
      this.httpService.deleteById("http://localhost:9001/loans/" + id).subscribe((result) => {
        console.log(result);
        this.users.length = 0;
      });
      window.location.reload();
    }
  };

  formFilledCheck() {
    if (this.updateLoanForm.controls['userId'].value &&
      this.updateLoanForm.controls['loanId'].value &&
      this.updateLoanForm.controls['loanType.typeName'].value &&
      this.updateLoanForm.controls['balance'].value &&
      this.updateLoanForm.controls['createDate'].value &&
      this.updateLoanForm.controls['nextDueDate'].value &&
      this.updateLoanForm.controls['previousDueDate'].value &&
      this.updateLoanForm.controls['principal'].value &&
      this.updateLoanForm.controls['valueTitle'].value) {
      console.log('form is filled');
      return true;
    } else {
      console.log('form isn\'t filled');
      return false;
    }
  }

  saveLoan() {
    if (this.formFilledCheck()) {
      let u = new Loan(
        this.updateLoanForm.controls['createDate'].value,
        CurrencyValue.valueOf(this.updateLoanForm.controls['balance'].value.replace('$', '')),//<-- VERY IMPORTANT!!!
        this.updateLoanForm.controls['loanId'].value,
        this.updateLoanForm.controls['loanType'].value,
        this.updateLoanForm.controls['nextDueDate'].value,
        this.updateLoanForm.controls['previousDueDate'].value,
        this.updateLoanForm.controls['principal'].value,
        this.updateLoanForm.controls['userId'].value,
        this.updateLoanForm.controls['valueTitle'].value);
      console.log(u)
      const body = JSON.stringify(u);

      if (!this.updateLoanForm.controls['nickname'].value) {
        window.confirm('Save Acount ' + this.updateLoanForm.controls['loanId'].value + '?');
      }
      else {
        window.confirm('Save Acount ' + this.updateLoanForm.controls['nickname'].value + '?');
      }
      this.httpService.update('http://localhost:9001/loans', body).subscribe((result) => {
        console.log("updating" + result);
        this.loans.length = 0;
        this.update()
        window.location.reload();
      });
    } else {
      alert("Only the Nickname and Activity sections may be left blank.")
    }
  }

  async open(content: any, u: Loan | null) {
    if (u !== null) {
      this.editing = true;
      this.modalHeader = 'Edit Loan';
      this.updateLoanForm = this.fb.group({
        userId: u.$userId,
        loanId: u.$loanId,
        balance: u.$balance,
        typeName: u.$loanType.typeName,
        apr: u.$loanType.apr,
        numMonths: u.$loanType.numMonths,
        description: u.$loanType.description,
        createDate: u.$createDate,
        nextDueDate: u.$nextDueDate,
        previousDueDate: u.$previousDueDate,
        principal: u.$principal,
        valueTitle: u.$valueTitle,
      });
    } else {
      this.editing = false;
      this.modalHeader = 'Add New Loan';
      const uuid = await this.httpService.getNewUUID('http://localhost:9001/loans/new');
      console.log('rcv\'d: ', uuid);
      const today = new Date();
      const n = new Date();
      const p = new Date();
      n.setDate(today.getDate() + 30);
      p.setDate(today.getDate() - 30);
      console.log("current, nextm previous: ", today, ", ", n, ", ", p)
      this.updateLoanForm = this.fb.group({
        loanType: {
          typeName: '',
          id: '',
          activeStatus: '',
          apr: '',
          numMonths: '',
          description: ''
        },
        userId: '',
        loanId: uuid,
        activeStatus: '',
        balance: '',
        createDate: today.toJSON().slice(0,10),
        nextDueDate: n.toJSON().slice(0,10),
        previousDueDate: p.toJSON().slice(0,10),
        principal: '',
        valueTitle: ''
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

  get userId() { return this.updateLoanForm.get('userId'); }
  get loanId() { return this.updateLoanForm.get('loanId'); }
  get balance() { return this.updateLoanForm.get('balance'); }
  get createDate() { return this.updateLoanForm.get('createDate'); }
  get nextDueDate() { return this.updateLoanForm.get('nextDueDate'); }
  get previousDueDate() { return this.updateLoanForm.get('previousDueDate'); }
  get principal() { return this.updateLoanForm.get('principal'); }
  get valueTitle() { return this.updateLoanForm.get('valueTitle'); }
}