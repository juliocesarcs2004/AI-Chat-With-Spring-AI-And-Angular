import { Component, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-simple-chat',
  imports: [MatCardModule, MatToolbarModule, MatInputModule, MatButtonModule, MatIconModule, FormsModule, NgClass],
  templateUrl: './simple-chat.html',
  styleUrl: './simple-chat.scss',
})
export class SimpleChat {

  userInput = '';

  messages = signal([
    { text: 'Hello! How can I help you today ?', isBot: true }
  ])

  sendMessage() {
    this.trimUserMesssage();
    if (this.userInput !== '') {
      this.updateMessages(this.userInput);
      this.userInput = '';
      this.simulateResponse();
    }
  }

  private updateMessages(text: string, isBot = false) {
    this.messages.update(messages => [...messages, { text: text, isBot: isBot}]);
  }

  private trimUserMesssage(){
    this.userInput = this.userInput.trim();
  }

  private simulateResponse() {
    setTimeout(() => {
      const response = 'This is a simulated response from the Chat AI.';
      this.updateMessages(response, true);
    }, 2000);
  }
}
