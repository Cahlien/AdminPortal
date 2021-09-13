import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from '../../shared/services/http.service';
import { Loantype } from '../../shared/models/loantype.model';

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
  typeNameOrder: string = 'desc';
  sortByTypeName: boolean = false;
  aprOrder: string = 'desc';
  sortByApr: boolean = false;
  numMonthsOrder: string = 'desc';
  sortByNumMonths: boolean = false;
  sortBy: string[] = [];
  predicate: string = '?page=0&&size=5';
  searchCriteria: string = '';
  createNew: boolean = false;

  ngOnInit(): void {
    this.pageSize=5;
    this.pageIndex=0;
    this.totalItems=0;
    this.loadLoanTypes();
    this.initializeForms();
  }

  loadLoanTypes(): any{
    this.httpService
    .getAll('http://localhost:9001/loantypes' + this.predicate)
    .subscribe((response: any) => {
      let arr: any;
      arr = response as Loantype;
      this.totalItems = arr.totalElements;
      for(let obj of arr.content){
        let c = new Loantype(obj.typeName, obj.description,
          obj.apr, obj.numMonths, obj.id);
        this.loantypes.push(c);
      }
    })
  }

  initializeForms(){
    this.loanTypeForm = new FormGroup({
      id: new FormControl(''),
      typeName: new FormControl('',[Validators.required, Validators.maxLength(20), Validators.pattern("^[a-zA-Z]+$")]),
      description: new FormControl('',[Validators.required, Validators.maxLength(300)]),
      apr: new FormControl('',[Validators.required, Validators.maxLength(5), Validators.pattern("^\-?[0-9]+(?:\.[0-9]{1,2})?$")]),
      numMonths: new FormControl('',[Validators.required, Validators.maxLength(3), Validators.pattern("^[0-9]*$")]),
      //isAvailable: new FormControl('',[Validators.required])
    })
  }

  saveLoanType(): any{
    if(this.createNew){
      let lt = new Loantype(
        this.loanTypeForm.controls['typeName'].value,
        this.loanTypeForm.controls['description'].value,
        this.loanTypeForm.controls['apr'].value,
        this.loanTypeForm.controls['numMonths'].value
      )

      const body = JSON.stringify(lt);

      this.httpService.create('http://localhost:9001/loantypes', body).subscribe((result)=> {
        this.loantypes.length = 0;
        this.loadLoanTypes();
        this.initializeForms();
      });
    }
    else{
      let lt = new Loantype(
        this.loanTypeForm.controls['typeName'].value,
        this.loanTypeForm.controls['description'].value,
        this.loanTypeForm.controls['apr'].value,
        this.loanTypeForm.controls['numMonths'].value,
        this.loanTypeForm.controls['id'].value
      )

      const body = JSON.stringify(lt);

      this.httpService.update('http://localhost:9001/loantypes', body).subscribe((result) =>{
        this.loantypes.length = 0;
        this.loadLoanTypes();
        this.initializeForms();
      });
    }
  }

  deleteLoanType(id: String){
    this.httpService.deleteById('http://localhost:9001/loantypes/' + id).subscribe((result) => {
      this.loantypes.length = 0;
      this.loadLoanTypes();
    })
  }

  async open(content: any, lt: Loantype | null){
    this.initializeForms();
    if (lt !== null){
      this.createNew = false;
      this.modalHeader = 'Edit Loan Type';
      console.log(this.loanTypeForm);
      this.loanTypeForm.controls['id'].setValue(lt.$id);
      this.loanTypeForm.controls['typeName'].setValue(lt.$typeName);
      this.loanTypeForm.controls['description'].setValue(lt.$description);
      this.loanTypeForm.controls['apr'].setValue(lt.$apr);
      this.loanTypeForm.controls['numMonths'].setValue(lt.$numMonths);
    }
    else{
      console.log(this.loanTypeForm);
      this.createNew = true;
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

  private assemblePredicate(){
    this.sortBy = [];

    this.predicate = "?page=" + this.pageIndex + "&&size=" + this.pageSize;
    this.predicate += this.sortBy.length > 0 ? '&&sortBy=' + this.sortBy : '';
    this.predicate += this.searchCriteria.length > 0 ? "&&search=" + this.searchCriteria : '';
  }

  updatePage(){
    this.loantypes = [];

    this.assemblePredicate();

    this.loadLoanTypes();
    this.initializeForms();
  }

  get typeName() {return this.loanTypeForm.get('typeName'); }
  get description() {return this.loanTypeForm.get('description'); }
  get apr() {return this.loanTypeForm.get('apr'); }
  get numMonths() {return this.loanTypeForm.get('numMonths'); }

}
