import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenificiaryComponent } from './benificiary.component';

describe('BenificiaryComponent', () => {
  let component: BenificiaryComponent;
  let fixture: ComponentFixture<BenificiaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BenificiaryComponent]
    });
    fixture = TestBed.createComponent(BenificiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
