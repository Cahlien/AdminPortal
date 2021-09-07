import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpService } from '../../shared/services/http.service';

import { LoantypeComponent } from './loantype.component';

describe('LoantypeComponent', () => {
  let component: LoantypeComponent;
  let loanTypeService: HttpTestingController;
  let fixture: ComponentFixture<LoantypeComponent>;
  let httpService: HttpService;

  beforeAll(async () => {
    await TestBed.configureTestingModule({
      imports: [         
        FormsModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        MatPaginatorModule,
        BrowserAnimationsModule,
        NoopAnimationsModule ],
        declarations: [LoantypeComponent],
        providers: [HttpService]
    })
    .compileComponents();
  });

  beforeAll(() => {
    loanTypeService = TestBed.inject(HttpTestingController);
    httpService = TestBed.inject(HttpService);
    fixture = TestBed.createComponent(LoantypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    const response = new HttpResponse({
      body:{},
      status: 200,
      statusText: 'OK'
    });
    const call = loanTypeService.expectOne('http://localhost:9001/loantypes?page=0&&size=5');
    expect(call.request.method).toEqual('GET');
    call.flush(response);
    //cardService.verify();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();

  });
});
