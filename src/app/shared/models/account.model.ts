import { ThisReceiver } from "@angular/compiler";

export class Account {
    private userId: String;
    private accountId: String;
    private active_status: boolean;
    private balance: number;
    private create_date: Date;
    private interest: number;
    private nickname: String;
    private type: String;
    private firstName: any;
    private lastName: any;

    constructor(userId: String, accountId: String, active_status: boolean, balance: number, create_date: Date, interest: number, nickname: String, type: String) {
        this.userId = userId;
        this.accountId = accountId;
        this.active_status = active_status;
        this.balance = balance;
        this.create_date = create_date;
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

    get $active_status() {
        return this.active_status
    }

    set $active_status(val: boolean) {
        this.active_status = val
    }

    get $balance() {
        return this.balance
    }

    set $balance(val: number) {
        this.balance = val
    }

    fixBalance(): number{
        this.balance = this.balance / 100
        return this.balance
    }

    get $create_date() {
        return this.create_date
    }

    set $create_date(val: Date) {
        this.create_date = val
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