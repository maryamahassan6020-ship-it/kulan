import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchItems } from "./api/itemsApi.js";
import { EventCard } from "./components/EventCard";
import { LoadingState, ErrorState } from "./components/States";
import { Landmark } from "lucide-react";

export function ItemsPage() {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    setStatus("loading");

    fetchItems()
      .then((data) => {
        setItems(data || []);
        setStatus("success");
      })
      .catch(() => {
        setStatus("error");
      });
  }, []);

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
          <Link
            key={meeting.id}
            to={`/items/${meeting.id}`}
            className="block h-full group/link no-underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl"
          >
            <EventCard event={meeting} />
          </Link>
        ))}
      </div>
    </main>
  );
}

export default ItemsPage;
