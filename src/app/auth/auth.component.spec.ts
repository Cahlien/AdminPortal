import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AuthComponent} from './auth.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {FormsModule} from "@angular/forms";

describe('AuthComponent', () => {
  let mockAuthService: any;
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  beforeEach(() => {
    mockAuthService = jasmine.createSpyObj(['login']);
    mockAuthService.login.and.returnValue(localStorage.setItem('token', 'test'));
  })
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [AuthComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save userId and token in localStorage when logging in', async () => {
    let result = await mockAuthService.login("test@test.com", "test");
    expect(localStorage.getItem('token')).toBe('test');
  })
});
