"use client";

import React, { useState, useRef, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, Sparkles, AlertTriangle } from "lucide-react";
import { aiSafetyAssistant } from "@/ai/flows/ai-safety-assistant-flow";
import { cn } from "@/lib/utils";

interface Message {
  role: 'assistant' | 'user';
  content: string;
}

export function AiAssistantPanel() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Suraksha AI online. How can I assist with sanitation safety monitoring today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const result = await aiSafetyAssistant({ query: userMessage });
      setMessages(prev => [...prev, { role: 'assistant', content: result.response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "I encountered an error connecting to the safety network. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="h-full border-none shadow-xl flex flex-col overflow-hidden bg-white/50 backdrop-blur-sm">
      <CardHeader className="bg-primary text-white py-4">
        <div className="flex items-center justify-between">
          <CardTitle className="font-headline text-lg flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-300" />
            Suraksha AI Assistant
          </CardTitle>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
            <span className="text-[10px] font-bold tracking-widest uppercase opacity-70">Secured</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 p-0 overflow-hidden bg-slate-50/50">
        <ScrollArea className="h-[400px] p-4" ref={scrollRef}>
          <div className="space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={cn(
                "flex gap-3 max-w-[85%]",
                m.role === 'user' ? "ml-auto flex-row-reverse" : ""
              )}>
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                  m.role === 'assistant' ? "bg-primary text-white" : "bg-white border border-border"
                )}>
                  {m.role === 'assistant' ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5 text-muted-foreground" />}
                </div>
                <div className={cn(
                  "p-3 rounded-2xl text-sm font-body shadow-sm",
                  m.role === 'assistant' ? "bg-white text-foreground rounded-tl-none border border-slate-100" : "bg-primary text-white rounded-tr-none"
                )}>
                  {m.content.split('\n').map((line, idx) => (
                    <p key={idx} className={line.trim() === '' ? 'h-2' : 'mb-1 last:mb-0'}>
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center shrink-0">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="p-3 rounded-2xl bg-white border border-slate-100 text-sm animate-pulse flex items-center gap-2 font-body italic text-muted-foreground">
                  Analyzing safety logs...
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      
      <CardFooter className="p-4 border-t bg-white">
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex w-full gap-2">
          <Input 
            placeholder="Ask about worker status..." 
            className="flex-1 border-slate-200 focus-visible:ring-primary h-11 text-sm font-body"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button type="submit" size="icon" className="h-11 w-11 bg-primary hover:bg-primary/90 shadow-lg" disabled={isLoading}>
            <Send className="w-5 h-5" />
          </Button>
        </form>
      </CardFooter>
      
      <div className="bg-amber-50 px-4 py-2 border-t flex items-center gap-2">
        <AlertTriangle className="w-3 h-3 text-amber-600" />
        <p className="text-[10px] text-amber-700 font-medium font-body uppercase tracking-tight">
          Supervisor query channel active. Prioritize critical alerts.
        </p>
      </div>
    </Card>
  );
}
