import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-prompt-suggestions',
  templateUrl: './prompt-suggestions.component.html',
  styleUrls: ['./prompt-suggestions.component.css']
})
export class PromptSuggestionsComponent {
  @Input() buttonLabels!: string[];

}
