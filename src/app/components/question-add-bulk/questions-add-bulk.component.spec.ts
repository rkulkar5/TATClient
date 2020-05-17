import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsAddBulkComponent } from './questions-add-bulk.component';

describe('QuestionsAddComponent', () => {
  let component: QuestionsAddBulkComponent;
  let fixture: ComponentFixture<QuestionsAddBulkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionsAddBulkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsAddBulkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
