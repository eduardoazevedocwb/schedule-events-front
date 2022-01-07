import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListmodalComponent } from './listmodal.component';

describe('ListmodalComponent', () => {
  let component: ListmodalComponent;
  let fixture: ComponentFixture<ListmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListmodalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
