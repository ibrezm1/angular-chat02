import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiPromptMessageComponent } from './ai-prompt-message.component';

describe('AiPromptMessageComponent', () => {
  let component: AiPromptMessageComponent;
  let fixture: ComponentFixture<AiPromptMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AiPromptMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiPromptMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
