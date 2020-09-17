import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCreditCardComponent } from './add-credit-card.component';

describe('AddCardComponent', () => {
  let component: AddCreditCardComponent;
  let fixture: ComponentFixture<AddCreditCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCreditCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCreditCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
