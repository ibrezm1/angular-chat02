import { Component } from '@angular/core';
import { StreamService } from '../stream.service';

@Component({
  selector: 'app-prompt-container',
  templateUrl: './prompt-container.component.html',
  styleUrls: ['./prompt-container.component.css']
})
export class PromptContainerComponent {
  prompts = [
    { type: 'human', message: 'Hello from human 1!' },
    { type: 'ai', message: '# Hello from AI 1!\n\nThis is a **markdown** message.' },
    { type: 'human', message: 'Hello from human 2!' },
    { type: 'ai', message: '# Hello from AI 1!\n\nThis is a **markdown** message.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed urna quis turpis malesuada cursus at at velit. Sed vel efficitur sapien. Cras sit amet viverra dui. Curabitur nec nisl at felis pellentesque tempus. Sed nec fringilla magna. Duis a lacus quis purus laoreet dictum eu sit amet enim. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed congue, arcu nec bibendum auctor, libero turpis posuere mi, ac sollicitudin nisl nunc vitae elit. Suspendisse faucibus dolor et massa volutpat, vel fringilla sem venenatis. Proin ultrices orci id elit pharetra cursus. Nullam nec est vitae odio convallis condimentum a a ex. Etiam sit amet augue vel purus ultrices malesuada. Vivamus sollicitudin, risus ac scelerisque euismod, velit nulla venenatis velit, ut auctor quam felis nec turpis. Integer ultricies dolor sit amet nunc scelerisque aliquet. Ut at eros lectus. Nam consequat magna nec scelerisque laoreet.' },
    { type: 'human', message: 'Hello from human 3!' },
    { type: 'ai', message: '# Hello from AI 1!\n\nThis is a **markdown** message.\n\n**Bold Text**\n\n*Italic Text*\n\n***Bold and Italic Text***\n\n- List item 1\n- List item 2\n- List item 3\n\n1. Numbered item 1\n2. Numbered item 2\n3. Numbered item 3\n\n[Link to Google](https://www.google.com/)\n\n![Image](https://via.placeholder.com/150)\n\n```typescript\n// Code block\nconsole.log("Hello, World!");\n```\n\n> Blockquote\n\n---\n\nHorizontal Rule\n\n> Multiple paragraphs:\n> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n> Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n> Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\n> Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
    { type: 'human', message: 'Hello from human 4!' },
    { type: 'ai', message: '# Hello from AI 4!\n\nThis is a fourth **markdown** message.' }
  ];

  buttonLabels = [    'Regenerate response',
  'Use prompt suggestions',
  'Toggle web search',
  'Select a tone',
  'Improve',
  'Make longer',
  'Explain in simple words',
  'Summarize in three lines',
  'Translate content'];

  userInput: string = '';
  showProcessing = false; // Show processing indicator

  constructor(private streamService: StreamService) {}

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  
  handleInputSubmitted(eventData: { input: string, model: string }): void {

    this.userInput = eventData.input;
    var model = eventData.model;
    var input = this.userInput;
    this.prompts.push({ type: 'human', message: input });
  
    var updatedMessage = '';
      // Simulate AI response
      this.prompts.push({ type: 'ai', message: '' });
      this.showProcessing = true;
      this.streamService.streamMessage(input,model).subscribe(
        (data: string) => {
        //updatedMessage = updatedMessage + data;
        this.prompts[this.prompts.length - 1] = { ...this.prompts[this.prompts.length - 1], message: data };
        this.scrollToBottom(); 
      },
      (error: any) => console.error(error),
      () => {
        this.showProcessing = false;
        console.log('Streaming complete');
      });

    // Scroll to the bottom of the chat
    this.scrollToBottom();

  }


  scrollToBottom(): void {
    setTimeout(() => {
      const chatInput = document.getElementById('chat-input');
      chatInput!.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, 100); // Adjust the delay as needed
  }

}
