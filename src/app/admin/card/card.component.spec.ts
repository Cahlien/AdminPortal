import {TestBed, async } from '@angular/core/testing';
import {CardComponent} from "./card.component";

describe("CardComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [
          CardComponent
        ],
      }).compileComponents();
  }));

  it("should create a card component", async () => {
    const fixture = TestBed.createComponent(CardComponent);
    const page = fixture.debugElement.componentInstance;
    expect(page).toBeTruthy();
  });
});
