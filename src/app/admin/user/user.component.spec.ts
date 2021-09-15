import { ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {FormsModule} from "@angular/forms";
import objectContaining = jasmine.objectContaining;
import {HttpHeaders, HttpResponse} from "@angular/common/http";
import { HttpService } from '../../shared/services/http.service';
import { ReactiveFormsModule } from '@angular/forms';

import { MatPaginatorModule } from '@angular/material/paginator';
import {PageEvent} from "@angular/material/paginator";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { UserComponent } from './user.component';
import { of } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';

describe('UserComponent', () => {
  let component: UserComponent;
  let cardService: HttpTestingController;
  let fixture: ComponentFixture<UserComponent>;
  let httpService: HttpService;

  beforeAll(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        MatPaginatorModule,
        BrowserAnimationsModule,
        NoopAnimationsModule
      ],
      declarations: [ UserComponent ],
      providers: [HttpService]
    })
    .compileComponents();
  });

  beforeAll(() => {
    cardService = TestBed.inject(HttpTestingController);
    httpService = TestBed.inject(HttpService);
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    const response = new HttpResponse({
      body:{},
      status: 200,
      statusText: 'OK'
    });
    const call = cardService.expectOne('http://gateway:9001/admin/users');
    expect(call.request.method).toEqual('GET');
    call.flush(response);
    cardService.verify();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();

    /*
    const response = new HttpResponse({
      body:{},
      status: 200,
      statusText: 'OK'
    });
    */

    //const call = cardService.expectOne('http://gateway:9001/cards/');
    //const call2 = cardService.expectOne('http://gateway:9001/admin/users');
    //expect(call.request.method).toEqual('GET');
    //expect(call2.request.method).toEqual('GET');
    //call.flush(response);
    //call2.flush(response);
  });

  it('should make http DELETE request', () => {
    component.deleteUser("1");

    const response = new HttpResponse({
      body:{},
      status: 200,
      statusText: 'OK'
    });

    const call1 = cardService.expectOne('http://gateway:9001/admin/users/1');
    expect(call1.request.method).toEqual('DELETE');
    call1.flush(response);

  })

  it('should process form data and register new user with POST http request', () => {

    component.userForm.controls['username'].setValue('user_name');
    component.userForm.controls['password'].setValue('password');
    component.userForm.controls['email'].setValue('mock@email.com');
    component.userForm.controls['firstName'].setValue('name_first');
    component.userForm.controls['lastName'].setValue('name_last');
    component.userForm.controls['dateOfBirth'].setValue('2021-08-14');
    component.userForm.controls['role'].setValue('admin');

    component.saveUser();

    const response = new HttpResponse({
      body:{},
      status: 200,
      statusText: 'OK'
    });

    const call = cardService.expectOne('http://gateway:9001/users');
    expect(call.request.method).toEqual('POST');
    call.flush(response);

  });

  it('should process form data and update existing user with PUT http request', async () => {

    component.userForm.controls['username'].setValue('user_name');
    component.userForm.controls['userId'].setValue('234568-890145');
    component.userForm.controls['password'].setValue('password');
    component.userForm.controls['email'].setValue('mock@email.com');
    component.userForm.controls['firstName'].setValue('name_first');
    component.userForm.controls['lastName'].setValue('name_last');
    component.userForm.controls['dateOfBirth'].setValue('2021-08-14');
    component.userForm.controls['role'].setValue('admin');

    component.saveUser();

    const response = new HttpResponse({
      body:{},
      status: 200,
      statusText: 'OK'
    });

    const call = cardService.expectOne('http://gateway:9001/admin/users/234568-890145');
    expect(call.request.method).toEqual('PUT');
    call.flush(response);

  });
});

