import { getDemoDates } from './prompt-context';

// Configured fictional demo reference; never a live inventory or durable booking store.
export const SCENARIO_KNOWLEDGE = {
  "source": {
    "kind": "Fictional hotel demonstration reference",
    "revision": "2026-11-08",
    "scope": "All addresses, room attributes, rates and counts below are configured fictional examples, not real hotel facts or live inventory."
  },
  "hotel": "Agora Riverside Hotel",
  "location": "Boston, MA, United States",
  "timeZone": "America/New_York",
  "roomTypes": [
    {
      "id": "standard-king",
      "name": "Standard king room",
      "maxGuests": 2,
      "bedding": "One king bed",
      "floor": 3,
      "elevatorPosition": "Near the elevator",
      "smokingAllowed": false,
      "nightlyRateUsd": 159,
      "initialDemoRoomsPerNight": 4,
      "bestFor": "One or two guests sharing one bed; convenient elevator access"
    },
    {
      "id": "standard-twin",
      "name": "Standard twin room",
      "maxGuests": 2,
      "bedding": "Two single beds",
      "floor": 5,
      "elevatorPosition": "Away from the elevator",
      "smokingAllowed": false,
      "nightlyRateUsd": 169,
      "initialDemoRoomsPerNight": 3,
      "bestFor": "One or two guests needing separate beds and a room away from the elevator"
    },
    {
      "id": "family-suite",
      "name": "Family suite",
      "maxGuests": 4,
      "bedding": "One king bed and one double sofa bed",
      "floor": 8,
      "elevatorPosition": "Away from the elevator",
      "smokingAllowed": false,
      "nightlyRateUsd": 249,
      "initialDemoRoomsPerNight": 2,
      "bestFor": "A party of up to four guests using existing beds; high floor and away from the elevator"
    }
  ],
  "occupancyPolicy": "Every adult, child and infant counts toward the room's maximum of two or four guests. No configured room permits more than four guests.",
  "extraBeds": "Rollaway beds are not part of the configured room options and do not increase room capacity.",
  "cribPolicy": "A crib may be requested for a child under two in a family suite within the four-guest limit. Supply is not configured; a simulated room confirmation does not guarantee a crib.",
  "childPolicy": "Children are welcome with an accompanying adult. Recommend bedding from the child's age and the family's preference, using the configured capacities.",
  "checkIn": "From 3:00 PM hotel local time",
  "checkOut": "By 12:00 PM noon hotel local time",
  "breakfast": {
    "hours": "7:00 AM–10:00 AM hotel local time",
    "location": "Riverside restaurant",
    "rateInclusion": "Not included in any configured demonstration room rate.",
    "children": "Under six: no separate breakfast charge with a paying adult. Ages six to twelve: half the adult breakfast price. Ages thirteen and older: adult price.",
    "price": "USD 20 per adult; ages six to twelve USD 10; under six no separate charge with a paying adult. Optional pay-at-restaurant breakfast is not included in the room total."
  },
  "wifi": "Guest Wi-Fi is available throughout the hotel. No network name or password is provided here.",
  "unknownFacilities": "Pool, parking, pet policy and specific accessible-room features are not defined. State the particular unknown and discuss what needs verifying.",
  "address": "120 Example Riverside Lane, Boston, MA 02110, United States (fictional demo address; do not use for navigation)",
  "smokingPolicy": "All rooms and indoor areas are non-smoking. No smoking room is offered.",
  "roomAttributes": "Floor and elevator position are guaranteed category attributes only in this fictional demo. Floors 7 and above count as high floor. Do not promise a different floor or an unlisted combination; discuss a preference without guaranteeing it.",
  "demoPricing": {
    "currency": "USD",
    "taxPercent": 10,
    "additionalFeesUsd": 0,
    "calculation": "Nightly room rate x nights x rooms, plus 10% tax; round tax to cents. No payment is taken.",
    "cancellation": "In this conversation, a simulated cancellation releases only the counts tracked in the conversation; no real refund or cancellation is performed."
  },
  "demoInventory": "The initial count for each room type applies to every night in demoStayWindow. It is a fixed demo snapshot, not a lookup. Every occupied night must be inside the window; checkout may equal checkOutThrough. Decrement counts for overlapping nights only after explicit simulated confirmation within this conversation; no hold before confirmation. Do not double-count a repeated confirmation. Restore counts only after an explicitly confirmed simulated cancellation. If earlier selections are no longer in context, say availability is uncertain instead of inventing a ledger."
} as const;

export function getScenarioKnowledge(now = new Date()) {
  const dates = getDemoDates(SCENARIO_KNOWLEDGE.timeZone, now);
  return {
    ...SCENARIO_KNOWLEDGE,
    demoStayWindow: {
      checkInFrom: dates[0], checkOutThrough: dates[28],
      minimumNights: 1, maximumNights: 14,
      description: 'Only stays fully inside this rolling demo window can be simulated. Outside it, discuss plans without inventing inventory.',
    },
  };
}
