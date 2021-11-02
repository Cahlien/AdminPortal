import { ThisReceiver } from "@angular/compiler";
import {CurrencyValue} from "./currencyvalue.model";
import { LoanType } from "./loanType.model";
import { User } from "./user.model";

export class Loan {
    private user: User;
    private id: String;
    private balance: CurrencyValue;
    private principal: CurrencyValue;
    private minDue: CurrencyValue;
    private lateFee: CurrencyValue;
    private loanType: LoanType;
    private createDate: Date;
    private nextDueDate: Date;
    private previousDueDate: Date;
    private minMonthFee: String;
    private hasPaid: boolean;

    constructor(createDate: Date, balance: CurrencyValue, principal: CurrencyValue, minDue: CurrencyValue, lateFee: CurrencyValue, id: String, loanType: LoanType, 
        nextDueDate: Date, previousDueDate: Date,  user: User, minMonthFee: String, hasPaid: boolean) {
        this.user = user;
        this.id = id;
        this.balance = balance;
        this.principal = principal;
        this.minDue = minDue;
        this.lateFee = lateFee;
        this.loanType = loanType;
        this.createDate = createDate;
        this.nextDueDate = nextDueDate;
        this.previousDueDate = previousDueDate;
        this.minMonthFee = minMonthFee;
        this.hasPaid = hasPaid;
    }

    get $minDue() {
        return this.minDue
    }

    set $minDue(val: CurrencyValue) {
        this.minDue = val
    }

    get $lateFee() {
        return this.lateFee
    }

    set $lateFee(val: CurrencyValue) {
        this.lateFee = val
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

    get $minMonthFee() {
        return this.minMonthFee
    }

    set $minMonthFee(val: String) {
        this.minMonthFee = val
    }

    get $hasPaid() {
        return this.hasPaid
    }

    set $hasPaid(val: boolean) {
        this.hasPaid = val
    }
}