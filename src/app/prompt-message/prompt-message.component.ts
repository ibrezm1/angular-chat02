import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-prompt-message',
  templateUrl: './prompt-message.component.html',
  styleUrls: ['./prompt-message.component.css']
})
export class PromptMessageComponent {
  @Input() message!: string;
}
