import type { ScenarioPresentation } from '@/types/presentation';
export type { ScenarioPresentation } from '@/types/presentation';

export const presentation: ScenarioPresentation = {
  "id": "02-hotel-reception",
  "name": "Hotel Reception Assistant",
  "purpose": "Room details and simulated booking",
  "summary": "Compare rooms, dates and demo prices at a fictional Boston hotel, then confirm a simulated stay.",
  "featuresHeading": "In this conversation",
  "features": [
    {
      "emoji": "💬",
      "title": "Floor, elevator & smoking details"
    },
    {
      "emoji": "🎙️",
      "title": "Demo availability & clear USD pricing"
    },
    {
      "emoji": "📝",
      "title": "Simulated booking confirmation"
    }
  ],
  "builtWith": [
    "Agora Conversational AI",
    "Agents SDK",
    "Next.js"
  ],
  "startLabel": "Talk to hotel reception",
  "boundaryShort": "Simulation only. No real room is held, no payment is taken, and no booking is saved.",
  "outcomes": [
    {
      "id": "helpful",
      "label": "The conversation helped"
    },
    {
      "id": "needs-guidance",
      "label": "I need more guidance"
    }
  ],
  "developer": {
    "sourceUrl": "https://github.com/AgoraIO-Community/agora-hotel-reception-assistant-demo",
    "runCommand": "pnpm install --frozen-lockfile\npnpm run doctor\npnpm run dev",
    "skillsCommand": "npx skills add github:AgoraIO/skills",
    "assistantPrompt": "Work in this existing Hotel Reception Assistant voice demo. Preserve RTC/RTM and the phase-one conversation-only boundary. Use configured fictional references and explicitly labeled current-conversation simulations where supported. Keep tools disabled, results unsaved and real business actions unavailable. Keep entry copy, FAQ and prompt behavior aligned.",
    "docsUrl": "https://docs.agora.io/en/ai/build/build-server-client",
    "sdkUrl": "https://www.npmjs.com/package/agora-agents",
    "consoleUrl": "https://console.agora.io/",
    "cliUrl": "https://github.com/AgoraIO/cli",
    "skillsUrl": "https://github.com/AgoraIO/skills",
    "extensionPoints": [
      {
        "title": "Change the conversation",
        "path": "lib/agent-config.ts"
      },
      {
        "title": "Choose models and voice",
        "path": "lib/runtime-profile.ts"
      },
      {
        "title": "Adapt scenario UI copy",
        "path": "lib/presentation.ts"
      }
    ]
  }
};

export function getScenarioPresentation(): ScenarioPresentation { return presentation; }
