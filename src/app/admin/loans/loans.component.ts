import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators, } from "@angular/forms";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { HttpService } from "../../shared/services/http.service";
import { Loan } from "../../shared/models/loan.model";
import { User } from "../../shared/models/user.model";
import { PageEvent } from "@angular/material/paginator";
import { CurrencyValue } from "../../shared/models/currencyvalue.model";
import { LoanType } from "../../shared/models/loanType.model";

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
  activeLoan!: Loan;


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
    { name: "user", displayName: "User ID", class: "col-2" },
    { name: "id", displayName: "Loan ID", class: "col-3" },
    { name: "loanType.typeName", displayName: "Type", class: "col-2" },
    { name: "loanType.apr", displayName: "APR", class: "col-2" },
    { name: "balance", displayName: "Balance", class: "col-2" },
    { name: "minMonthFee", displayName: "Normal Minimum Due", class: "col-2" },
    { name: "minDue", displayName: "Current Minimum Due", class: "col-2" },
    { name: "lateFee", displayName: "Late Fee", class: "col-2" },
    { name: "principal", displayName: "Principal", class: "col-2" },
    { name: "loanType.numMonths", displayName: "Month Duration", class: "col-2" },
    { name: "createDate", displayName: "Date Created", class: "col-2" },
    { name: "nextDueDate", displayName: "Next Due Date", class: "col-2" },
    { name: "previousDueDate", displayName: "Previous Due Date", class: "col-2" },
    { name: "hasPaid", displayName: "Paid Status", class: "col-2" }
  ];


  constructor(private httpService: HttpService, private fb: FormBuilder, private modalService: NgbModal) { }
  ngOnInit(): void {
    this.totalItems = 0;
    this.pageIndex = 0;
    this.pageSize = 5;
    this.update();
    this.initializeForms();
  }

  onChangePage(pe: PageEvent) {
    this.pageIndex = pe.pageIndex;
    if (pe.pageSize !== this.pageSize) {
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
        // alert('Cannot sort by name.')
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
        console.log('found: ', res)
        for (let obj of arr.content) {
          let u = new Loan(obj.createDate, CurrencyValue.from(obj.balance), CurrencyValue.from(obj.principal), 
          CurrencyValue.from(obj.minDue), CurrencyValue.from(obj.lateFee), obj.id, obj.loanType,
            obj.nextDueDate, obj.previousDueDate, obj.user, obj.minMonthFee, obj.hasPaid);
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
        window.alert("Error trying to retrieve Loans")
        this.data = { status: "error", content: [], totalElements: 0, totalPages: 0 };
      })
  }

  initializeForms() {
    this.updateLoanForm = new FormGroup({
      id: new FormControl('', [Validators.required, Validators.minLength(32), Validators.maxLength(32), Validators.pattern("/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/")]),
      userId: new FormControl('', [Validators.required, Validators.minLength(32), Validators.maxLength(32), Validators.pattern("/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/")]),
      typeName: new FormControl('', [Validators.required]),
      negative: new FormControl('', [Validators.required]),
      numMonths: new FormControl('', [Validators.required]),
      createDate: new FormControl('', [Validators.required]),
      nextDueDate: new FormControl('', [Validators.required]),
      previousDueDate: new FormControl('', [Validators.required]),
      dollars: new FormControl('', [Validators.required]),
      cents: new FormControl('', [Validators.required]),
      minDue: new FormControl('', [Validators.required]),
      lateFee: new FormControl('', [Validators.required]), 
      apr: new FormControl('', [Validators.required, Validators.maxLength(3)])
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
      this.updateLoanForm.controls['typeName'].value &&
      this.updateLoanForm.controls['apr'].value &&
      this.updateLoanForm.controls['dollars'].value &&
      this.updateLoanForm.controls['cents'].value &&
      this.updateLoanForm.controls['numMonths'].value &&
      this.updateLoanForm.controls['createDate'].value &&
      this.updateLoanForm.controls['nextDueDate'].value &&
      this.updateLoanForm.controls['previousDueDate'].value) {
      console.log('form is filled');
      return true;
    } else {
      console.log('form isn\'t filled');
      console.log('form found: ',
        'user: ', this.updateLoanForm.controls['userId'].value,
        'typeName: ', this.updateLoanForm.controls['typeName'].value,
        'apr: ', this.updateLoanForm.controls['apr'].value,
        'dollars: ', this.updateLoanForm.controls['dollars'].value,
        'cents: ', this.updateLoanForm.controls['cents'].value,
        'negative: ', this.updateLoanForm.controls['negative'].value &&
      'months: ', this.updateLoanForm.controls['numMonths'].value,
        // this.updateLoanForm.controls['description'].value,
        'create: ', this.updateLoanForm.controls['createDate'].value,
        'next: ', this.updateLoanForm.controls['nextDueDate'].value,
        'previous: ', this.updateLoanForm.controls['previousDueDate'].value)
      return false;
    }
  }

  async saveLoan() {
    if (this.formFilledCheck()) {
      console.log('form filled')
      console.log('loans: ', this.loans)
      console.log('update form: ', this.updateLoanForm.value)
      let loan = this.activeLoan;
      let loanType = loan.$loanType;
      if (!this.editing) {
        console.log('not editing. getting new loan...')
        loan = await this.httpService.getNewUUID('http://localhost:9001/loans/new', this.updateLoanForm.controls['userId'].value);
        loanType = await this.httpService.getNewUUID('http://localhost:9001/loantypes/new');
      }
      console.log('loan body made: ', loan)
      console.log('loantype body made: ', loanType)
      let c = new CurrencyValue(
        this.updateLoanForm.controls['negative'].value,
        this.updateLoanForm.controls['dollars'].value,
        this.updateLoanForm.controls['cents'].value,
      )
      let num = c.getDollars + (c.getCents / 100);
      let c2 = CurrencyValue.valueOf(num * this.updateLoanForm.controls['apr'].value)
      console.log('principal calculated: ', c2.toString())
      let uuid = loanType.$id
      let t = new LoanType(
        uuid,
        true,
        this.updateLoanForm.controls['createDate'].value,
        this.updateLoanForm.controls['numMonths'].value,
        this.updateLoanForm.controls['description'].value,
        this.updateLoanForm.controls['typeName'].value,
        this.updateLoanForm.controls['apr'].value,
      )
      console.log('loan id: ', loan.$id)
      uuid = loan.$id
      let u = new Loan(
        this.updateLoanForm.controls['createDate'].value,
        c,
        c2,
        new CurrencyValue(false, 0, 0),
        new CurrencyValue(false, 0, 0),
        uuid,
        t,
        this.updateLoanForm.controls['nextDueDate'].value,
        this.updateLoanForm.controls['previousDueDate'].value,
        loan.$user,
        this.updateLoanForm.controls['minMonthFee'].value,
        false);
      const loanBody = JSON.stringify(u);
      const typeBody = JSON.stringify(t);
      console.log('loanBody to send: ', u)
      console.log('typeBody to send: ', typeBody)

      if (!uuid) {
        console.log('Id value found')
        window.confirm('Save Loan ' + uuid + '?');
      }
      else {
        console.log('no Id found')
        window.confirm('Save Loan ' + uuid + '?');
      }
      if (this.editing) {
        this.httpService.update('http://localhost:9001/loans', loanBody).subscribe((result) => {
          console.log("updating" + result);
          this.loans.length = 0;
          this.update()
          window.location.reload();
        });
      }
      else {
        this.httpService.create('http://localhost:9001/loantypes', typeBody).subscribe((result) => {
          console.log("creating loantype " + result);
          this.loans.length = 0;
          this.update()
        });
        this.httpService.create('http://localhost:9001/loans', loanBody).subscribe((result) => {
          console.log("creating loan " + result);
          this.loans.length = 0;
          this.update()
          window.location.reload();
        });
      }
    } else {
      alert("Only the Negative and Description sections may be left blank.")
    }
  }

  async open(content: any, u: Loan | null) {
    if (u !== null) {
      console.log('editing existing loan...', u)
      this.activeLoan = u;
      let userId = u.$user.userId
      console.log('user id found: ', userId)
      this.editing = true;
      this.modalHeader = 'Edit Loan';
      this.updateLoanForm = this.fb.group({
        user: u.$user,
        userId: u.$user.userId,
        id: u.$id,
        balance: u.$balance,
        dollars: u.$balance.dollars,
        cents: u.$balance.cents,
        minDue: u.$minDue,
        lateFee: u.$lateFee,
        negative: u.$balance.isNegative,
        typeName: u.$loanType.typeName,
        apr: u.$loanType.apr,
        numMonths: u.$loanType.numMonths,
        description: u.$loanType.$description,
        createDate: u.$createDate,
        nextDueDate: u.$nextDueDate,
        previousDueDate: u.$previousDueDate,
        principal: u.$principal,
        minMonthFee: u.$minMonthFee,
        hasPaid: u.$hasPaid
      });
    } else {
      console.log('creating new loan...')
      this.editing = false;
      this.modalHeader = 'Add New Loan';
      const today = new Date();
      const n = new Date();
      const p = new Date();
      n.setDate(today.getDate() + 30);
      p.setDate(today.getDate() - 30);
      this.updateLoanForm = this.fb.group({
        typeName: '',
        userId: '',
        id: '',
        apr: '',
        numMonths: '',
        description: '',
        user: '',
        dollars: '',
        minDue: '',
        cents: '',
        negative: '',
        createDate: today.toJSON().slice(0, 10),
        nextDueDate: n.toJSON().slice(0, 10),
        previousDueDate: p.toJSON().slice(0, 10),
        principal: '',
        minMonthFee: ''
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

  get user() { return this.updateLoanForm.get('user'); }
  get id() { return this.updateLoanForm.get('id'); }
  get balance() { return this.updateLoanForm.get('balance'); }
  get minDue() {return this.updateLoanForm.get('minDue')}
  get lateFee() {return this.updateLoanForm.get('lateFee')}
  get createDate() { return this.updateLoanForm.get('createDate'); }
  get nextDueDate() { return this.updateLoanForm.get('nextDueDate'); }
  get previousDueDate() { return this.updateLoanForm.get('previousDueDate'); }
  get principal() { return this.updateLoanForm.get('principal'); }
  get minMonthFee() { return this.updateLoanForm.get('minMonthFee'); }
  get hasPaid() {return this.updateLoanForm.get('hasPaid')}
}