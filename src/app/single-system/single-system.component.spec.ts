import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleSystemComponent } from './single-system.component';

describe('SingleSystemComponent', () => {
  let component: SingleSystemComponent;
  let fixture: ComponentFixture<SingleSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleSystemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
