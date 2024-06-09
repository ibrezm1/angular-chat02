import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromptSidebarComponent } from './prompt-sidebar.component';

describe('PromptSidebarComponent', () => {
  let component: PromptSidebarComponent;
  let fixture: ComponentFixture<PromptSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromptSidebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromptSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
