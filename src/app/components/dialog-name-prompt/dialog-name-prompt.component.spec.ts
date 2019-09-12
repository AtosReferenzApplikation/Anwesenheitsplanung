import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNamePromptComponent } from './dialog-name-prompt.component';

describe('DialogNamePromptComponent', () => {
  let component: DialogNamePromptComponent;
  let fixture: ComponentFixture<DialogNamePromptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogNamePromptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogNamePromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
