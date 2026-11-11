'use client';

import { ChevronDown } from 'lucide-react';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

const questions = [
  {
    "question": "How do I start a conversation?",
    "answer": "Choose Talk to hotel reception and allow microphone access when your browser asks. Speak in English and describe what you need. You can mute the microphone or end the conversation with the voice controls."
  },
  {
    "question": "What should I say?",
    "answer": "Try: “Two adults and a six-year-old, two nights starting tomorrow. What room is away from the elevator, and what would it cost?” Ask about floors, smoking, breakfast or remaining demo rooms, then request a simulated booking."
  },
  {
    "question": "Are the hotel details real?",
    "answer": "No. Agora Riverside Hotel, its Boston address, room attributes, prices and room counts are fictional demonstration data. The address is not a real destination for navigation."
  },
  {
    "question": "Can I check availability or book a room?",
    "answer": "You can compare configured demo availability and confirm a simulated stay within the next 28 days, for 1–14 nights. The assistant reviews dates, party, room details and the USD total before asking for your agreement. No live search, real reservation, payment, email or saved booking is involved."
  },
  {
    "question": "Can I choose a high floor or a smoking room?",
    "answer": "The family suite is on floor 8, away from the elevator; the king room is on floor 3 near the elevator; the twin room is on floor 5 away from it. All rooms are non-smoking. These are fictional category attributes; unlisted combinations and crib supply cannot be guaranteed."
  },
  {
    "question": "Can I change what I said?",
    "answer": "Yes. Tell the assistant which detail to correct, ask it to repeat or clarify an answer, or request a verbal recap. Details are used within the current conversation; this demo does not save business results or remember them across sessions."
  },
  {
    "question": "What if my microphone does not work?",
    "answer": "Check that microphone access is allowed for this page and that the correct input device is selected in your browser or system settings. Make sure the microphone is not muted, then try Talk to hotel reception again."
  }
];

export function ScenarioFaq() {
  return (
    <DialogContent className="demo-inspector demo-faq-drawer">
      <DialogHeader className="demo-faq-heading">
        <DialogTitle>Frequently asked questions</DialogTitle>
        <DialogDescription>How to get started, what to ask, and what to expect.</DialogDescription>
      </DialogHeader>
      <div className="demo-faq-list">
        {questions.map(({ question, answer }) => (
          <details className="demo-faq-item" key={question}>
            <summary>
              <span>{question}</span>
              <ChevronDown className="demo-faq-chevron" size={16} aria-hidden="true" />
            </summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </DialogContent>
  );
}
