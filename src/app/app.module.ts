import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PromptContainerComponent } from './prompt-container/prompt-container.component';
import { PromptMessageComponent } from './prompt-message/prompt-message.component';
import { AiPromptMessageComponent } from './ai-prompt-message/ai-prompt-message.component';
import { PromptSuggestionsComponent } from './prompt-suggestions/prompt-suggestions.component';
import { PromptInputComponent } from './prompt-input/prompt-input.component';
import { MarkdownModule } from 'ngx-markdown';
import { FormsModule } from '@angular/forms';
import { PromptSidebarComponent } from './prompt-sidebar/prompt-sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    PromptContainerComponent,
    PromptMessageComponent,
    AiPromptMessageComponent,
    PromptSuggestionsComponent,
    PromptInputComponent,
    PromptSidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MarkdownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
