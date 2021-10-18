import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from 'src/app/shared/services/http.service';
import { FormBuilder } from '@angular/forms';
import { AccountComponent } from './accounts.component';
import { of } from 'rxjs';
import { Account } from 'src/app/shared/models/account.model';
import { User } from 'src/app/shared/models/user.model';

describe('AccountsComponent', () => {
    let component: AccountComponent;
    let fixture: ComponentFixture<AccountComponent>;
    let httpServiceSpy: jasmine.SpyObj<HttpService>;

    beforeEach(async () => {
        httpServiceSpy = jasmine.createSpyObj('HttpService', ['getAccounts', 'getNewAccounts', 'update', 'deleteById', 'getAll'])
        await TestBed.configureTestingModule({
            declarations: [AccountComponent],
            providers: [{
                provide: HttpService,
                useValue: httpServiceSpy
            }, NgbModal, FormBuilder]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AccountComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get accounts', () => {
        const users = [new User('abcd', 'abcd', 'abcd@abcd.com',
            '1111111111', 'abcd', 'abcd',
            '2000-01-01', 'abcd',
            'd44c62cd-c1e5-4273-82ec-2b1fa9654b0a')]
        httpServiceSpy.getAll.and.returnValue(of(users));
        const account = new Account(
            'd44c62cd-c1e5-4273-82ec-2b1fa9654b0a',
            'd44c62cd-c1e5-4273-82ec-2b1fa9654b0a',
            true, 100, new Date(2000, 1, 1), 1, 'abcd', 'abcd')
        account.$firstName = 'abcd';
        account.$lastName = 'abcd';
        const accounts = [account];
        const page = {
            status: 'success',
            content: accounts,
            numberOfElements: 1,
            totalPages: 1
        }
        const account2 = new Account(
            'd44c62cd-c1e5-4273-82ec-2b1fa9654b0a',
            'd44c62cd-c1e5-4273-82ec-2b1fa9654b0a',
            true, 100, new Date(2000, 1, 1), 1, 'abcd', 'abcd')
        account2.$firstName = 'abcd';
        account2.$lastName = 'abcd';
        const otherAccounts = [account2];
        const data = {
            status: "success",
            content: otherAccounts,
            totalElements: 1,
            totalPages: 1
        }
        httpServiceSpy.getAccounts.and.returnValue(of(page));
        fixture.detectChanges();
        expect(component.users).toEqual(users);
        expect(component.data).toEqual(data);
        expect(component.accounts.length).toBe(1);
    })

});