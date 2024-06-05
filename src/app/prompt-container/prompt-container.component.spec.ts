import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromptContainerComponent } from './prompt-container.component';

describe('PromptContainerComponent', () => {
  let component: PromptContainerComponent;
  let fixture: ComponentFixture<PromptContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromptContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromptContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
