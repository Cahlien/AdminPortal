import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from 'src/app/shared/services/http.service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoanComponent } from './loans.component';
import { of } from 'rxjs';
import { Loan } from 'src/app/shared/models/loan.model';
import { User } from 'src/app/shared/models/user.model';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CurrencyValue } from 'src/app/shared/models/currencyvalue.model';
import { LoanType } from 'src/app/shared/models/loanType.model';
import { HttpResponse } from '@angular/common/http';

describe('LoansComponent', () => {
  let component: LoanComponent;
  let loanService: HttpTestingController;
  let fixture: ComponentFixture<LoanComponent>;
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
          declarations: [ LoanComponent ],
          providers: [HttpService]
        })
        .compileComponents();
      });
    beforeAll(() => {
    loanService = TestBed.inject(HttpTestingController);
    httpService = TestBed.inject(HttpService);
    fixture = TestBed.createComponent(LoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

    afterEach(() => {
    const response = new HttpResponse({
      body:{},
      status: 200,
      statusText: 'OK'
    });
    const call = loanService.expectOne('http://localhost:9001/loans?page=0&&size=5');
    expect(call.request.method).toEqual('GET');
    call.flush(response);
    loanService.verify();
  });

  it('should create component and send two http GET requests', () => {
    expect(component).toBeTruthy();

    const response = new HttpResponse({
      body:{},
      status: 200,
      statusText: 'OK'
    });
    //const call = cardService.expectOne('http://localhost:9001/cards/');
    const call2 = loanService.expectOne('http://localhost:9001/loantypes/');
    //expect(call.request.method).toEqual('GET');
    expect(call2.request.method).toEqual('GET');
    //call.flush(response);
    call2.flush(response);
    };

    it('should get Loans', () => {
        const c = new CurrencyValue(false, 0, 0)
        const lt = new LoanType(
            'd44c62cd-c1e5-4273-82ec-2b1fa9654b0a',
            true,
            new Date(),
            10,
            '',
            'test',
            0
        )
        const users = [new User('abcd', 'abcd', 'abcd@abcd.com',
            '1111111111', 'abcd', 'abcd',
            '2000-01-01', 'abcd',
            'd44c62cd-c1e5-4273-82ec-2b1fa9654b0a')]
        httpService.getAll.and.returnValue(of(users));
        const loan = new Loan(
            new Date(),
            c,
            c,
            'd44c62cd-c1e5-4273-82ec-2b1fa9654b0a',
            lt,
            new Date(),
            new Date(),
            'd44c62cd-c1e5-4273-82ec-2b1fa9654b0a',
            'title'
            )
        const Loan2 = new Loan(
            new Date(),
            c,
            c,
            'd44c62cd-c1e5-4273-82ec-2b1fa9654b0a',
            lt,
            new Date(),
            new Date(),
            'd44c62cd-c1e5-4273-82ec-2b1fa9654b0a',
            'title2'
            )
        const data = httpService.getAll("http://localhost:9001/loans");
        fixture.detectChanges();
        // expect(component.users).toEqual(users);
        expect(component.data).toEqual(data);
    })

});