import { Component, signal, ViewChild, ElementRef, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../chat-service';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-simple-chat',
  imports: [MatCardModule, MatToolbarModule, MatInputModule, MatButtonModule, MatIconModule, FormsModule, NgClass],
  templateUrl: './simple-chat.html',
  styleUrl: './simple-chat.scss',
})
export class SimpleChat {

  @ViewChild('chatHistory')
  private chatHistory!: ElementRef;

  private chatService = inject(ChatService);

  userInput = '';
  isLoading = false;

  local = false;

  messages = signal([
    { text: 'Hello! How can I help you today ?', isBot: true }
  ])

  sendMessage() {
    this.trimUserMesssage();
    if (this.userInput !== '' && !this.isLoading) {
      this.updateMessages(this.userInput);
      this.isLoading = true;
      if (this.local) {
        this.simulateResponse();
      } else {
        this.sendChatMessage();
      }

    }
  }

  private sendChatMessage() {
    this.chatService.sendChatMessage(this.userInput)
    .pipe(
      catchError(()=> {
        this.updateMessages('Sorry, I am unable to process your request at the moment.', true);
        this.isLoading = false;
        return throwError(() => new Error('Error ocurred while sending chat message'));
      })
    )
    .subscribe(response => {
        this.updateMessages(response.message, true);
        this.userInput = '';
        this.isLoading = false;
      });
  }

  private updateMessages(text: string, isBot = false) {
    this.messages.update(messages => [...messages, { text: text, isBot: isBot}]);
    this.scrollToBottom();
  }

  private trimUserMesssage(){
    this.userInput = this.userInput.trim();
  }

  private simulateResponse() {
    setTimeout(() => {
      const response = 'This is a simulated response from the Chat AI.';
      this.updateMessages(response, true);
      this.userInput = '';
      this.isLoading = false;
    }, 2000);
  }

  private scrollToBottom() {
    try {
      this.chatHistory.nativeElement.scrollTop = this.chatHistory.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Error scrolling to bottom:', err);
    }
  }
}
