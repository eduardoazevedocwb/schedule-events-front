import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventmodalComponent } from './eventmodal.component';

describe('EventmodalComponent', () => {
  let component: EventmodalComponent;
  let fixture: ComponentFixture<EventmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventmodalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
