import {Timestamp} from "rxjs";

export class TransactionModel {
  private _id: String;
  private _transactionType: any;
  private _transactionAmount: any;
  private _transactionStatus: any;
  private _source: any;
  private _target: any;
  private _statusTime: Timestamp<any>;
  private _notes: String;


  constructor(id: String, transactionType: any, transactionAmount: any, transactionStatus: any, source: any, target: any, statusTime: Timestamp<any>, notes: String) {
    this._id = id;
    this._transactionType = transactionType;
    this._transactionAmount = transactionAmount;
    this._transactionStatus = transactionStatus;
    this._source = source;
    this._target = target;
    this._statusTime = statusTime;
    this._notes = notes;
  }

  get id(): String {
    return this._id;
  }

  set id(value: String) {
    this._id = value;
  }

  get transactionType() {
    return this._transactionType;
  }

  set transactionType(value) {
    this._transactionType = value;
  }

  get transactionAmount() {
    return this._transactionAmount;
  }

  set transactionAmount(value) {
    this._transactionAmount = value;
  }

  get transactionStatus() {
    return this._transactionStatus;
  }

  set transactionStatus(value) {
    this._transactionStatus = value;
  }

  get source() {
    return this._source;
  }

  set source(value) {
    this._source = value;
  }

  get target() {
    return this._target;
  }

  set target(value) {
    this._target = value;
  }

  get statusTime() {
    return this._statusTime;
  }

  set statusTime(value) {
    this._statusTime = value;
  }

  get notes() {
    return this._notes;
  }

  set notes(value) {
    this._notes = value;
  }
}
