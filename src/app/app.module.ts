import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


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
import { LoginComponent } from './login/login.component';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    PromptContainerComponent,
    PromptMessageComponent,
    AiPromptMessageComponent,
    PromptSuggestionsComponent,
    PromptInputComponent,
    PromptSidebarComponent,
    LoginComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MarkdownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
