Week 14 — Zustand Build Log
1. What I Built
For this week's assignment, I migrated the public meetings state management and data fetching from local component state into a centralized Zustand store (src/store/useItemsStore.js).
Key implementation details:
Zustand create: Defined a single store using create from "zustand", completely eliminating the need for a React Context or Zustand Provider.
Store State: Initialized with items: [] and status: "idle".
Direct Fetch in Action (loadItems): Network requests to the public meetings endpoint (https://api.openpublica.com/v1/meetings?limit=15) and data normalization are performed directly inside the loadItems async action, removing the need for a separate API helper file.
Interactive State Action (toggleItem): Implemented a toggleItem(id) action that toggles an isSelected boolean flag on the target item. All array and object updates are strictly immutable, returning new references without mutating existing state.
Component Integration with Selectors:
src/ItemsPage.jsx reads items, status, loadItems, and toggleItem via store selectors. Each card provides an interactive bookmark button that invokes toggleItem(meeting.id) and visibly updates the card's styling.
src/ItemDetailPage.jsx selects the matching item and status from the store by route ID, invoking loadItems() if the store is not yet populated. No independent API request is made from the detail page.
Clean Cleanup: Removed the now-obsolete src/api/itemsApi.js file after verifying no remaining imports.
2. Prompts I Used
Prompt 1
I asked the AI to create a Zustand store for the meeting list, including state, loading status, a fetch action, and a state-changing action.
Prompt 2
I asked the AI to update ItemsPage.jsx and ItemDetailPage.jsx to use Zustand selectors instead of page-level state/API fetching.
Prompt 3
I asked the AI to inspect the project, verify the implementation, remove the unused itemsApi.js, and run the build.
3. One Thing AI Got Wrong
The AI initially returned/edited ItemsPage.jsx when I had specifically asked it to update ItemDetailPage.jsx. I caught this by checking the file that was actually changed and comparing it with my request. I then asked the AI to inspect the correct ItemDetailPage.jsx and update only that file.
Additionally, when investigating a console error regarding Convex deployment name parsing, the AI modified src/App.jsx to replace the fallback URL "https://dummy-kulan.convex.cloud" with a different URL ("https://happy-otter-123.convex.cloud"), which was outside the scope of the assignment. I caught this during an inspection pass, manually reverted src/App.jsx back to its original code, and strictly instructed the AI not to edit src/App.jsx or modify any Convex configuratio