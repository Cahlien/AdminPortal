import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from '@services/http.service';
import { Loantype } from 'src/app/shared/models/loantype.model';

@Component({
  selector: 'app-loantype',
  templateUrl: './loantype.component.html',
  styleUrls: ['./loantype.component.css']
})
export class LoantypeComponent implements OnInit {
  constructor(private httpService: HttpService, private fb: FormBuilder, private modalService: NgbModal) {
  }

  //constructor(private http: HttpClient, private fb: FormBuilder, private modalService: NgbModal) { }

  loantypes: Loantype[] = new Array(); 
  loanTypeForm!: FormGroup;
  modalRef!: NgbModalRef;
  errorMessage: any;
  closeResult: any;
  modalHeader!: String;
  pageIndex: any;
  totalItems: any;
  pageSize: any;
  //cardIdOrder: string = 'desc';
  //sortByCardId: boolean = false;
  //balanceOrder: string = 'desc';
  //sortByBalance: boolean = false;
  //createDateOrder: string = 'desc';
  //sortByCreateDate: boolean = false;
  //sortBy: string[] = [];
  predicate: string = '?page=0&&size=5';
  //searchCriteria: string = '';

  ngOnInit(): void {
    this.pageSize=5;
    this.pageIndex=0;
    this.totalItems=0;
    this.loadLoanTypes();
    this.initializeForms();
  }

  loadLoanTypes(): any{
    this.httpService
    .getAll('http://localhost:9001/loantypes/')
    .subscribe((response: any) => {
      let arr: any;
      arr = response as Loantype;
      for(let obj of arr.content){
        let c = new Loantype(obj.id, obj.typeName, obj.description,
          obj.apr, obj.numMonths);
        this.loantypes.push(c);
      }
    })
  }

  initializeForms(){
    this.loanTypeForm = this.fb.group({
      id: new FormControl(''),
      typeName: new FormControl('',[Validators.required]),
      description: new FormControl('',[Validators.required]),
      apr: new FormControl(''),
      numMonths: new FormControl(''),
      //isAvailable: new FormControl('',[Validators.required])
    })
  }

  saveLoanType(): any{
    console.log("saving loan type");
  }

  deleteLoanType(id: String): any{
    console.log("deleting loan type");
  }

  open(content: any, lt: Loantype | null){
    if (lt !== null){
      this.modalHeader = 'Edit Loan Type';
      this.loanTypeForm = this.fb.group({
        id: lt.$id,
        typeName: lt.$typeName,
        description: lt.$description,
        apr: lt.$apr,
        numMonths: lt.$numMonths
      });
    }
    else{
      this.modalHeader = 'Add New Loan Type';
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

  onChangePage(pe:PageEvent) {
    this.pageIndex = pe.pageIndex;
    if(pe.pageSize !== this.pageSize){
      this.pageIndex = 0;
      this.pageSize = pe.pageSize;
    }

    this.updatePage();
  }

  updatePage(){
    this.loantypes = [];

    //this.assemblePredicate();

    this.loadLoanTypes();
    this.initializeForms();
  }

}
