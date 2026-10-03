import { ConvexReactClient } from "convex/react";
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import AppRoutes from "./AppRoutes.jsx";

const convexUrl = import.meta.env.VITE_CONVEX_URL || "https://dummy-kulan.convex.cloud";
const convex = new ConvexReactClient(convexUrl);

export function App() {
  return (
    <ConvexAuthProvider client={convex}>
      <AppRoutes />
    </ConvexAuthProvider>
  );
}

export default App;
