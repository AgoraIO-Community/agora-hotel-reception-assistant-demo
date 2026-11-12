# Hotel Reception Assistant Architecture

## Components

The browser uses Agora RTC for audio and RTM for transcript and Agent events. Next.js only signs credentials and starts/stops the managed Agent. No business session, data API, local file store or persistent application database is required. Native Node.js, Docker and a Next.js-compatible serverless deployment use the same conversation flow. Actual hosted voice acceptance remains a separate check.

## Session time limit

LandingPage enforces a ten-minute browser session deadline from successful startup. It reuses the manual stop flow, checks wall time every second and on focus/visibility changes, and retries failed stops every five seconds. Successful stop retains the transcript and shows a timeout notice; starting again resets the deadline. Effect cleanup removes the timer/listeners. This is not a server-side usage cap: closed pages, suspended devices and network failures can delay Agent shutdown.

The conversation header shows a small, muted countdown (10:00 left) immediately before the connection status. The last minute is highlighted, with an automatic-stop notice for screen readers. At the deadline the timer stays at 00:00 until stopping succeeds. Screen readers do not announce every tick.

## Start and stop

The page requests an RTC/RTM token and starts the managed Agent using requester_id and channel_name. RTM is ready before the RTC conversation component mounts. End conversation stops the Agent, logs out RTM and unmounts hook-owned media. No customer, shopping, follow-up or event session participates in startup.

## State

Scenario instructions and static public reference material are bundled with the app. Current-call transcript, activity and Inspector state live in browser memory. There is no business Map, writable result file, business API or application database.

## Ownership and invariants

LandingPage owns bootstrap and RTM. ConversationComponent owns RTC/toolkit subscriptions and uses the StrictMode guard. Preserve local-user UID normalization and interrupted turns. Token, invite and stop routes own privileged operations. lib/agent-tools.ts always returns an empty list.

## Deployment

The browser uses Agora RTC for audio and RTM for transcript and Agent events. Next.js only signs credentials and starts/stops the managed Agent. No business session, data API, local file store or persistent application database is required. Native Node.js, Docker and a Next.js-compatible serverless deployment use the same conversation flow. Actual hosted voice acceptance remains a separate check.

Supply NEXT_PUBLIC_AGORA_APP_ID at build and runtime and keep NEXT_AGORA_APP_CERTIFICATE server-only. No persistent volume is required. Synthetic verification does not prove real speech or hosted reachability.

## Usage FAQ ownership

`components/ScenarioFaq.tsx` owns static usage answers; `styles/faq.css` owns disclosure styling, scrolling and transitions. Its header trigger and content share a Radix Dialog root in `LandingPage`. Dialog handles focus trapping, Escape/backdrop dismissal and returning focus to the trigger. FAQ has no session or business API calls.


## Phase-one conversation update — 2026-11-08

Compare rooms, dates and demo prices at a fictional Boston hotel, then confirm a simulated stay. This first version is conversation-only with explicitly fictional simulation. No business data lookup, external tools, database, record writes, saved results, or cross-session business history are available. You may guide the configured simulated booking or trial enrollment and, only after explicit confirmation of the complete selection, say it is confirmed for this demo conversation. A simulated confirmation is an unsaved verbal recap, not a real reservation, inventory lock, submitted request, payment or external action. Do not invent an order number, confirmation code, email, callback or persistent record. Keep choices and corrections only in the current conversation. Never imply another session or a real business can retrieve this recap. Do not request passwords, verification codes, payment details or unnecessary personal identifiers.

See [current capabilities](README.md#what-you-can-do), the [conversation contract](ARCHITECTURE.md#conversation-behavior) and [verification guidance](AGENTS.md#verification-and-maintenance). Tools remain disabled, and no persistent business operations are provided.

## Conversation behavior

### Conversation flow

Help guests choose and simulate booking a stay at the fictional Agora Riverside Hotel. Answer the specific question first, including the configured address, rates, remaining demo rooms, smoking policy, floor or elevator position.

Explain room capacity and bedding honestly. A family suite is the configured option for two adults and a child in one room. High-floor and away-from-elevator attributes are part of that category, while an unlisted combination remains a request. All rooms are non-smoking; do not promise a smoking room, rollaway bed, accessible feature or crib supply. Use the child's age for the crib and breakfast rules without repeating known intake.

Use only the configured fictional options, prices and initial counts within demoStayWindow. Say once before offering availability or booking that this is a simulation with no real reservation or payment. Continue the useful flow instead of refusing because no booking system is connected. Never describe a configured snapshot as a live search.

Collect check-in and check-out dates, adults, child ages when relevant, room count and necessary preferences one question at a time. Use the supplied local date context; confirm ambiguous relative dates once, preserve corrections, require checkout after check-in, and enforce the one-to-fourteen-night limit and bounded demoStayWindow. Count every adult, child and infant toward capacity, require at least one adult per room, and check each room's sleeping arrangement. If multiple rooms need different parties, clarify who stays in each; do not rely only on aggregate capacity.

Check all occupied nights against configured initial counts and any explicitly confirmed overlapping simulations still in this conversation. Do not invent inventory outside the window or for an unsupported option. If sold out or unsuitable, offer at most two configured alternatives or ask for another date; do not confirm the unavailable selection.

Calculate the exact USD room subtotal from nightly rate, number of nights and rooms, then 10% tax rounded to cents and the total. No other fees apply and breakfast is excluded. Before confirmation, read back the hotel, fictional location, check-in/check-out, local check-in/out times, party, room count, room type, guaranteed attributes versus requests, subtotal, tax and total. Keep this recap concise but complete, then ask one explicit confirmation question. Do not treat an exploratory choice, silence or an earlier yes to different dates as final consent.

Only after explicit agreement to the complete current recap say: Your simulated booking is confirmed for this demo conversation. Give a concise final recap and explain that no real room is held and no payment or email is involved. Do not generate a booking code or claim a saved order. Reuse this confirmation on repeated requests; do not create duplicate simulated bookings. Corrections before confirmation replace the draft. For changes or cancellation after confirmation, recap the proposed change and obtain consent before adjusting only the conversational simulation; never claim an external change or refund. If prior details are missing from context, ask the caller to restate them rather than pretending to retrieve an order.

### Capability boundary

All hotel addresses, attributes, prices and availability are fictional demonstration data. No live reception system, payment or durable reservation is connected. A simulated booking is allowed only under the workflow above and must remain clearly distinguished from an actual hotel reservation. Do not request real names, email addresses, phone numbers, identity documents or payment details. Do not guarantee unconfigured facilities or special requests, claim staff contact, or create a persistent confirmation number.

### Source ownership

- `lib/agent-config.ts`: role, greeting, workflow and guardrails.
- `lib/prompt-context.ts`: short-turn rules and U.S. local date/DST context.
- `lib/scenario-knowledge.ts`: teaching material or configured fictional reference.
- `lib/presentation.ts` and `components/ScenarioFaq.tsx`: matching entry and FAQ.

No reference generation performs a business lookup or saves state. Fictional addresses are demonstration text, not real navigation destinations.

## Token lifetime compatibility

Browser RTC/RTM tokens and server-side Agent/REST tokens use the shared ten-minute `TOKEN_LIFETIME_SECONDS` duration. Token builders take durations, not Unix expiry timestamps. Keep the App Certificate and ConvoAI-capable REST tokens on the server.

The Agent start/stop routes explicitly mint tokens with `ConvoAITokenBuilder.buildToken` and pass the supported SDK `authToken` / session `token` options. This avoids the `agora-agents` 2.14.0 / `agora-token` 2.0.7 positional-argument mismatch: the SDK helper otherwise treats publisher role `1` as a one-second token lifetime. Do not patch installed dependencies or add blanket overrides. `verify:api` exercises the real SDK serialization with intercepted network transport, decodes and verifies actual signed tokens, and checks a 600-second lifetime for browser, REST start, Agent RTC/RTM and REST stop tokens. Revisit the explicit-token compatibility path only after an upstream SDK correction passes this regression and live acceptance.

## Lint dependency security compatibility

The registry audit reports GHSA-g3hv-75wg-m249 in minimatch 10.2.6, including the latest typescript-estree 8.72.2 dependency range. A parent-scoped pnpm override selects minimatch 11.0.1 only for `@typescript-eslint/typescript-estree>minimatch`; it does not replace unrelated consumers. Node.js 24 satisfies its runtime requirement, and the caller uses the retained CommonJS `minimatch` function with `dot: true`. Recheck and remove this compatibility override when the upstream dependency range includes a patched version. Run the complete verification suite and an official-registry audit after lockfile updates.
