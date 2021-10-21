import { ThisReceiver } from "@angular/compiler";
import {CurrencyValue} from "./currencyvalue.model";
import { LoanType } from "./loanType.model";
import { User } from "./user.model";

export class Loan {
    private user: User;
    private id: String;
    private balance: CurrencyValue;
    private principal: CurrencyValue;
    private loanType: LoanType;
    private createDate: Date;
    private nextDueDate: Date;
    private previousDueDate: Date;
    private valueTitle: String;

    constructor(createDate: Date, balance: CurrencyValue, principal: CurrencyValue, id: String, loanType: LoanType, 
        nextDueDate: Date, previousDueDate: Date,  user: User, valueTitle: String) {
        this.user = user;
        this.id = id;
        this.balance = balance;
        this.principal = principal;
        this.loanType = loanType;
        this.createDate = createDate;
        this.nextDueDate = nextDueDate;
        this.previousDueDate = previousDueDate;
        this.valueTitle = valueTitle;
    }

    get $user() {
        return this.user
    }

    set $user(val: User) {
        this.user = val
    }

    get $id() {
        return this.id
    }

    set $id(val: String) {
        this.id = val
    }

    get $balance() {
        return this.balance
    }

    set $balance(val: CurrencyValue) {
        this.balance = val
    }

    set $principal(val: CurrencyValue) {
        this.principal = val
    }

    get $principal() {
        return this.principal
    }

    set $loanType(val: LoanType) {
        this.loanType = val
    }

    get $loanType() {
        return this.loanType
    }

    get $createDate() {
        return this.createDate
    }

    set $createDate(val: Date) {
        this.createDate = val
    }

    get $nextDueDate() {
        return this.nextDueDate
    }

    set $nextDueDate(val: Date) {
        this.nextDueDate = val
    }

    get $previousDueDate() {
        return this.previousDueDate
    }

    set $previousDueDate(val: Date) {
        this.previousDueDate = val
    }

    get $valueTitle() {
        return this.valueTitle
    }

    set $valueTitle(val: String) {
        this.valueTitle = val
    }
}