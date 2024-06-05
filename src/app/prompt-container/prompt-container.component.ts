import { Component } from '@angular/core';

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

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  
  handleInputSubmitted(input: string): void {

  // Function to generate random length Lorem Ipsum
  const generateLoremIpsum = (): string => {
    const wordCount = Math.floor(Math.random() * (200 - 50 + 1)) + 5;
    const loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
    const words = loremIpsum.split(' ');
    let result = [];
    for (let i = 0; i < wordCount; i++) {
      result.push(words[i % words.length]);
    }
    return result.join(' ');
  };

    // Generate a random word count between 5 and 20
    
    const randomLoremIpsum = generateLoremIpsum();

    this.userInput = input;
    this.prompts.push({ type: 'human', message: input });
    // Simulate AI response
    this.prompts.push({ type: 'ai', message: 'AI response to: ' + randomLoremIpsum });

    // add a delay of 1 sec 
    setTimeout(() => {
      // increment the last message pushed to the prompts array
      var updatedMessage:string = "randomLoremIpsum"
      this.prompts[this.prompts.length - 1].message = 'AI response to: ' + updatedMessage;
      // rerender the last message pushed to the prompts array in angular
      this.prompts[this.prompts.length - 1] = { ...this.prompts[this.prompts.length - 1], message: updatedMessage };

      console.log('AI response to: ' + updatedMessage);
    }, 2000);

    // Scroll to the bottom of the chat
    this.scrollToBottom();

  }


  scrollToBottom(): void {
    setTimeout(() => {
      const chat = document.getElementById('chat');
      if (chat) {
        chat.scrollTop = chat.scrollHeight;
      }
    });
  }

}
