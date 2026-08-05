'use client';

import * as React from 'react';
import { Mail, MessageSquare, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export default function ContactPage() {
  const [status, setStatus] = React.useState<'idle' | 'sent'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sent');
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 py-12 md:py-20">
      <div className="mb-10 text-center">
        <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 to-accent/15 text-primary">
          <Mail className="h-7 w-7" />
        </div>
        <h1 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Get in Touch
        </h1>
        <p className="text-base text-muted-foreground">
          Have a question, suggestion, or found a bug? We would love to hear
          from you. Send us a message and we will get back to you as soon as
          possible.
        </p>
      </div>

      {status === 'sent' ? (
        <div className="animate-fade-in-up rounded-2xl border border-green-500/30 bg-green-500/5 p-8 text-center">
          <MessageSquare className="mx-auto mb-3 h-8 w-8 text-green-500" />
          <h2 className="mb-2 text-lg font-semibold">Message sent</h2>
          <p className="text-sm text-muted-foreground">
            Thank you for reaching out. We will respond to your message
            shortly.
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="animate-fade-in-up space-y-5 rounded-2xl border border-border/50 bg-card p-6 md:p-8"
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" placeholder="Your name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              name="subject"
              placeholder="What is this about?"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Tell us more..."
              rows={5}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            <Send className="mr-2 h-4 w-4" />
            Send Message
          </Button>
        </form>
      )}
    </div>
  );
}
