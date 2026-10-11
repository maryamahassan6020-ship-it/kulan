import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useItemsStore } from "./store/useItemsStore";
import { EventCard } from "./components/EventCard";
import { LoadingState, ErrorState, EmptyState } from "./components/States";
import { Landmark, Bookmark } from "lucide-react";

export function ItemsPage() {
  const items = useItemsStore((state) => state.items);
  const status = useItemsStore((state) => state.status);
  const loadItems = useItemsStore((state) => state.loadItems);
  const toggleItem = useItemsStore((state) => state.toggleItem);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  if (status === "loading") {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100 mb-3">
            <Landmark className="w-3.5 h-3.5" />
            <span>Civic & Public Gatherings</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Public Meetings
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Browse official civic hearings, assembly sessions, and open public meetings.
          </p>
        </div>
        <p className="sr-only">Loading...</p>
        <LoadingState />
      </main>
    );
  }

  if (status === "error") {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Public Meetings
          </h1>
        </div>
        <ErrorState message="Something went wrong while fetching public meetings." />
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Public Meetings
          </h1>
        </div>
        <EmptyState message="No public meetings available right now." />
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100 mb-3">
          <Landmark className="w-3.5 h-3.5" />
          <span>Civic & Public Gatherings</span>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
          Public Meetings
        </h1>
        <p className="text-slate-600 text-sm mt-1">
          Browse official civic hearings, assembly sessions, and open public meetings.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((meeting) => (
          <div
            key={meeting.id}
            className={`relative rounded-xl transition-all ${
              meeting.isSelected ? "ring-2 ring-blue-600 shadow-md" : ""
            }`}
          >
            <Link
              to={`/items/${meeting.id}`}
              className="block h-full group/link no-underline focus:outline-none rounded-xl"
            >
              <EventCard event={meeting} />
            </Link>

            {/* Week 14 Interactive Action: toggleItem */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleItem(meeting.id);
              }}
              className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-md transition-colors cursor-pointer ${
                meeting.isSelected
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white/80 text-slate-600 hover:bg-white hover:text-blue-600 shadow-xs"
              }`}
              title={meeting.isSelected ? "Deselect meeting" : "Select meeting"}
              aria-label={meeting.isSelected ? "Deselect meeting" : "Select meeting"}
            >
              <Bookmark className={`w-4 h-4 ${meeting.isSelected ? "fill-current" : ""}`} />
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}

export default ItemsPage;
