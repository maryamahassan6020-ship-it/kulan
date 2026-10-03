# Week 12 – Convex Backend & Authentication

## Architecture Planning

Before writing any code, I used AI to analyze my Kulan repository and propose a Convex database architecture that matches my existing React + Vite user interface.

### AI Prompt Used

I asked the AI to:

* Analyze my repository
* Explain the current application structure
* Propose a Convex database schema
* Use exactly four tables:

  * users
  * events
  * rsvps
  * categories
* Explain relationships before generating any code

### Repository Analysis Summary

The AI identified that Kulan is built with:

* React 19
* TypeScript
* Vite
* Tailwind CSS
* Lucide React Icons
* Framer Motion

The application already contains:

* Homepage with event cards
* Search and filtering interface
* Event details page
* Login and signup forms
* Event creation workflow

The AI recommended keeping the existing UI unchanged and connecting it to a Convex backend.

## Proposed Database Structure

### users

Stores application users and organizers.

Fields:

* name
* email
* avatar
* bio
* role
* createdAt

### categories

Stores event categories used for filtering.

Fields:

* name
* slug
* icon
* description
* color

### events

Stores all event information displayed by the application.

Fields:

* title
* description
* coverImage
* categoryId
* organizerId
* startTime
* endTime
* location
* isVirtual
* capacity
* price
* status
* createdAt

### rsvps

Stores attendance records between users and events.

Fields:

* eventId
* userId
* status
* guestCount
* note
* updatedAt

## Relationship Design

The AI proposed the following relationships:

* One organizer can create many events.
* One category can contain many events.
* One user can RSVP to many events.
* One event can contain many RSVPs.

The RSVP table acts as a many-to-many relationship between users and events.

## Why RSVPs Are Separate

The RSVP data is stored in its own table because:

* One user can join multiple events.
* One event can have multiple attendees.
* Attendance can be queried efficiently.
* Duplicate RSVPs can be prevented through indexing.

## My Understanding

I understand that events should only contain event information while attendance data belongs in a dedicated RSVP table.

This structure allows Kulan to support real user accounts, event creation, event participation, and category filtering while keeping the database organized and scalable.

## Status

Architecture planning completed.

No Convex code has been generated yet.

Next step:
Create convex/schema.ts using the approved database design.
## Week 12 Error Diagnosis

Error:
TypeError: Cannot destructure property 'signIn' of 'useAuthActions(...)' as it is undefined

Most Likely Causes:
1. Component rendered outside ConvexAuthProvider
2. Convex Auth provider not initialized
3. Incorrect Password provider import

Root Cause:
Auth components were rendered outside the ConvexAuthProvider tree.

Fix:
Wrapped the entire application inside ConvexAuthProvider and corrected the Password provider import.

Result:
Authentication, login, signup, logout, and session persistence work correctly.
## Week 12 Testing

Successfully tested locally.

- Convex backend running locally
- Sign up works
- Login works
- Logout works
- Session persists after refresh
- Create Event protected for guests

Issue encountered:
[CONVEX A(auth:signIn)] Connection lost while action was in flight

Root cause:
Google AI Studio Preview environment lost connection to Convex Auth.

Verification:
Authentication worked correctly when tested locally with:
- npx convex dev
- npm run dev
