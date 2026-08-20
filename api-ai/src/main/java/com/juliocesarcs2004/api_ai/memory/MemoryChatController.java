package com.juliocesarcs2004.api_ai.memory;

import com.juliocesarcs2004.api_ai.chat.ChatMessage;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chat-memory")
public class MemoryChatController {

    private final MemoryChatService chatService;

    public MemoryChatController(MemoryChatService chatService) {
        this.chatService = chatService;
    }

    @PostMapping("/{chatId}")
    ChatMessage simpleChat(@PathVariable String chatId, @RequestBody ChatMessage chatMessage) {
        var response = this.chatService.chat(chatMessage.message(), chatId);
        return new ChatMessage(response);
    }

    @PostMapping("/start")
    NewChatResponse startNewChat(@RequestBody ChatMessage chatMessage) {
        return this.chatService.createNewChat(chatMessage.message());
    }

    @GetMapping
    List<Chat> getAllChatsForUser() {
        return this.chatService.getAllChatsForUser();
    }
}
