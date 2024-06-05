import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ai-prompt-message',
  templateUrl: './ai-prompt-message.component.html',
  styleUrls: ['./ai-prompt-message.component.css']
})
export class AiPromptMessageComponent {
  @Input() message!: string;

}
