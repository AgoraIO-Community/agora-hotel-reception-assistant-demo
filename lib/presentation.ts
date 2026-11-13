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
    "assistantPrompt": "Help me create and run the Hotel Reception Assistant using Agora CLI.\n\nCheck that Agora CLI is installed and ready. If installation or an upgrade is needed, ask before proceeding. Guide me through browser login when required.\n\nGet the recipe details:\nagora recipes show agora-hotel-reception-assistant-demo --json\n\nRead its implementation guide:\nhttps://raw.githubusercontent.com/AgoraIO-Community/agora-hotel-reception-assistant-demo/main/RECIPE.md\n\nReference source:\nhttps://github.com/AgoraIO-Community/agora-hotel-reception-assistant-demo\n\nBefore initialization, confirm which Agora project to use. Ask before creating a new Agora project.\n\nInitialize the app in a new or empty directory. Replace <confirmed-project-id> with the actual ID of the project confirmed above before running:\nagora init my-hotel-app --recipe agora-hotel-reception-assistant-demo --project <confirmed-project-id> --json\n\nLet the CLI configure the credentials. Never print the App Certificate in chat or expose it in browser code.\n\nFollow the returned nextSteps to install dependencies and start the app. Help diagnose and resolve any errors.\n\nProvide the local URL and guide me through microphone access. Help me test this request:\n\"What time is check-in, and what facilities does the hotel offer?\"\n\nReport what was verified and what still needs testing. Follow the capabilities and limits in the implementation guide; do not claim external actions were completed without verification.",
    "docsUrl": "https://docs.agora.io/en/ai/build/build-server-client",
    "sdkUrl": "https://github.com/AgoraIO/agora-agents-ts",
    "consoleUrl": "https://console.agora.io/",
    "cliUrl": "https://github.com/AgoraIO/cli",
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
    ],
    "createCommand": "npx agora-hotel-reception-assistant-demo@latest my-hotel-app\ncd my-hotel-app",
    "testRequest": "What time is check-in, and what facilities does the hotel offer?"
  }
};

export function getScenarioPresentation(): ScenarioPresentation { return presentation; }
