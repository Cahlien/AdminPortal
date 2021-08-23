import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from 'src/app/shared/services/http.service';
import { FormBuilder } from '@angular/forms';
import { UserComponent } from './user.component';
import { of } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';

fdescribe('UserComponent', () => {
    let component: UserComponent;
    let fixture: ComponentFixture<UserComponent>;
    let httpServiceSpy: jasmine.SpyObj<HttpService>;

    beforeEach(async () => {
        httpServiceSpy = jasmine.createSpyObj('HttpService', ['getUsers', 'getNewUUID', 'update', 'deleteById', 'create'])
        await TestBed.configureTestingModule({
            declarations: [UserComponent],
            providers: [{
                provide: HttpService,
                useValue: httpServiceSpy
            }, NgbModal, FormBuilder]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(UserComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get users', () => {
        const users = [new User('abcd', 'abcd', 'abcd@abcd.com', 
        '1111111111', 'abcd', 'abcd', 
        '2000-01-01', 'abcd', 
        'd44c62cd-c1e5-4273-82ec-2b1fa9654b0a')]
        const page = {
            status: 'success',
            content: users,
            numberOfElements: 1,
            totalPages: 1
        }
        const data = {
            status: "success",
            content: users,
            totalElements: 1,
            totalPages: 1
        }
        httpServiceSpy.getUsers.and.returnValue(of(users));
        fixture.detectChanges();
        expect(component.users).toEqual(users);
        expect(component.data).toEqual(data);
        expect(component.users.length).toBe(1);
    })

});
