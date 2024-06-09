import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-prompt-input',
  templateUrl: './prompt-input.component.html',
  styleUrls: ['./prompt-input.component.css']
})
export class PromptInputComponent {
  userInput: string = '';
  selectedModel: string = 'demo';
  @Input() buttonLabels!: string[];
  @Input() showProcessing: boolean = false;
  
  @Output() inputSubmitted: EventEmitter<{ input: string, model: string }> = new EventEmitter<{ input: string, model: string }>();

  submitInput(event: Event): void {
    // if the user key is enter then prevent the default behavior
    // and emit the inputSubmitted event with the userInpu
    if (event instanceof KeyboardEvent) {
      if (event.key === 'Enter') {
        event.preventDefault();
    }}

    if (this.userInput.trim()) {
    this.userInput = this.userInput.trim();
    this.inputSubmitted.emit({ input: this.userInput, model: this.selectedModel });
    this.userInput = '';
    }
    this.userInput = '';
  }
  submitWithLabel(label: string): void {
    this.inputSubmitted.emit({ input: label, model: this.selectedModel });
  }

}
