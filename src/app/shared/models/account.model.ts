import { ThisReceiver } from "@angular/compiler";
import {CurrencyValue} from "./currencyvalue.model";

export class Account {
    private userId: String;
    private accountId: String;
    private activeStatus: boolean;
    private balance: CurrencyValue;
    private createDate: Date;
    private interest: number;
    private nickname: String;
    private type: String;
    private firstName: any;
    private lastName: any;

    constructor(userId: String, accountId: String, activeStatus: boolean, balance: CurrencyValue, createDate: Date, interest: number, nickname: String, type: String) {
        this.userId = userId;
        this.accountId = accountId;
        this.activeStatus = activeStatus;
        this.balance = balance;
        this.createDate = createDate;
        this.interest = interest
        this.nickname = nickname;
        this.type = type;
    }

    get $userId() {
        return this.userId
    }

    set $userId(val: String) {
        this.userId = val
    }

    get $accountId() {
        return this.accountId
    }

    set $accountId(val: String) {
        this.accountId = val
    }

    get $activeStatus() {
        return this.activeStatus
    }

    set $activeStatus(val: boolean) {
        this.activeStatus = val
    }

    get $balance() {
        return this.balance
    }

    set $balance(val: CurrencyValue) {
        this.balance = val
    }

    fixBalance(): CurrencyValue{
        return this.balance
    }

    get $createDate() {
        return this.createDate
    }

    set $createDate(val: Date) {
        this.createDate = val
    }

    get $interest() {
        return this.interest
    }

    set $interest(val: number) {
        this.interest = val
    }

    get $nickname() {
        return this.nickname
    }

    set $nickname(val: String) {
        this.nickname = val
    }

    get $type() {
        return this.type
    }

    set $type(val: String) {
        this.type = val
    }

    get $firstName() {
        return this.firstName
    }

    set $firstName(val: String) {
        this.firstName = val;
    }

    get $lastName() {
        return this.lastName
    }

    set $lastName(val: String) {
        this.lastName = val;
    }
}
