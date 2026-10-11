# Kulan — Build Log

## Week 13 Build Log

### Project

Kulan

### Week 13 Goal

The goal was to work on the existing Kulan React/Vite project with help from AI. I needed to review the generated code, keep the current functionality, and check that the project still worked.

### Prompt I Used

I asked the AI to review the existing Kulan project and understand its React/Vite structure before making changes. I asked it to improve the existing project without unnecessary changes, keep the current functionality and Convex setup, follow the existing project structure and UI style, avoid placeholder features and unnecessary dependencies, explain important changes, and make sure the code worked.

### AI Changes

The AI helped me work on the existing project. I reviewed the changed files to make sure the updates matched the project requirements and did not introduce unnecessary changes.

### Verification

I checked the project structure, reviewed changed files, checked Git status, and ran `npm run build`.

The successful build result was:

`✓ 1741 modules transformed.`

Vite successfully created the `dist` folder without build errors.

### Git

I initialized the local project as a Git repository and connected it to:

https://github.com/maryamahassan6020-ship-it/kulan

I committed the local project and pushed it to GitHub.

### What I Learned

I learned to give AI clear instructions, review its output, test the project, and verify changes instead of accepting generated code without checking it.

---

## Week 14 Build Log — Zustand Store

### 1. What I Built

I moved the public meetings data fetching and state management into a centralized Zustand store at `src/store/useItemsStore.js`.

The store uses Zustand's `create` function and contains `items` and `status` state. Its `loadItems` action fetches meetings from the OpenPublica API and normalizes the data. Its `toggleItem(id)` action changes an item's selection state using immutable updates.

`src/ItemsPage.jsx` uses store selectors to read the meetings and loading status and to call the store actions. The bookmark button updates an item's selected state.

`src/ItemDetailPage.jsx` reads the selected meeting from the store using the route ID and loads the meetings if the store is empty.

I removed `src/api/itemsApi.js` because fetching is now handled by the Zustand store.

### 2. Prompts I Used

* I asked the AI to create a Zustand store with meeting data, loading status, a fetch action, and an action that changes item state.
* I asked it to update `ItemsPage.jsx` and `ItemDetailPage.jsx` to use Zustand selectors.
* I asked it to review the implementation, remove the unused API helper, and check the build.

### 3. One Thing AI Got Wrong

The AI initially edited `ItemsPage.jsx` when I had asked it to update `ItemDetailPage.jsx`. I caught the mistake by checking which file had changed and asked it to inspect the correct file.

The AI also changed the Convex fallback URL in `src/App.jsx` while investigating an unrelated error. This was outside the assignment, so I identified it during review and made sure the original Convex setup was preserved.

### 4. Verification

I reviewed the changed files, checked Git status, and ran `npm run build`.

The build completed successfully:

`✓ 1744 modules transformed.`

Vite successfully generated the production files in the `dist` folder.

### 5. What I Learned

I learned how to centralize state with Zustand, use selectors in React components, update state immutably, and check AI-generated changes before accepting them.

### Repository

https://github.com/maryamahassan6020-ship-it/kulan
