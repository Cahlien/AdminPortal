import { OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { HttpService } from "src/app/shared/services/http.service";


export class AccountComponent implements OnInit {

constructor(private httpService: HttpService, private fb: FormBuilder, private modalService: NgbModal) { }
    ngOnInit(): void {
        this.loadAccounts();
    }

    loadAccounts(): any{
        this.httpService
        .getAll("http://localhost:8000/accounts")
    }

}