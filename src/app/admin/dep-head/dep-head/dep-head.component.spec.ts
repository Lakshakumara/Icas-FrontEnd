import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepHeadComponent } from './dep-head.component';

describe('DepHeadComponent', () => {
  let component: DepHeadComponent;
  let fixture: ComponentFixture<DepHeadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DepHeadComponent]
    });
    fixture = TestBed.createComponent(DepHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
