
export class AccountType {
     id: String;
     isActive: boolean;
     createDate: Date;
     expireDate: Date;
     name: String;

    constructor(id: String, isActive: boolean, createDate: Date, expireDate: Date, name: String) {
        this.id = id;
        this.isActive = isActive;
        this.createDate = createDate;
        this.expireDate = expireDate
        this.name = name;
    }

    get $id() {
        return this.id
    }

    set $id(val: String) {
        this.id = val
    }

    get $isActive() {
        return this.isActive
    }

    set $isActive(val: boolean) {
        this.isActive = val
    }

    get $createDate() {
        return this.createDate
    }

    set $createDate(val: Date) {
        this.createDate = val
    }

    get $expireDate() {
        return this.expireDate
    }

    set $expireDate(val: Date) {
        this.expireDate = val
    }

    get $name() {
        return this.name
    }

    set $name(val: String) {
        this.name = val
    }
}