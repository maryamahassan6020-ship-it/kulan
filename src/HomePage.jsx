import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { EventCard } from "./components/EventCard";
import { EmptyState } from "./components/States";
import { Search, Sparkles, Calendar, ArrowRight } from "lucide-react";

// Kulan original community events (seeded from convex/events.ts)
const KULAN_COMMUNITY_EVENTS = [
  {
    _id: "kulan-tech-summit-2026",
    id: "kulan-tech-summit-2026",
    title: "Tech Summit 2026",
    description:
      "Join local developers, designers, and tech enthusiasts for keynotes, workshops, and networking.",
    coverImage:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
    categoryId: "cat-technology",
    organizerId: "org-kulan",
    startTime: Date.now() + 3 * 24 * 60 * 60 * 1000,
    endTime: Date.now() + 3 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000,
    location: "Kulan Innovation Lab & Online",
    isVirtual: false,
    capacity: 150,
    price: 0,
    status: "upcoming",
    createdAt: Date.now(),
    category: {
      name: "Technology",
      slug: "technology",
      color: "#3B82F6",
    },
    organizer: {
      name: "Kulan Community Hub",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      email: "organizer@kulan.org",
    },
  },
  {
    _id: "kulan-cultural-arts-fair",
    id: "kulan-cultural-arts-fair",
    title: "Community Cultural & Arts Fair",
    description:
      "A celebration of local music, food, craft, and visual storytelling featuring local artists.",
    coverImage:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
    categoryId: "cat-arts",
    organizerId: "org-kulan",
    startTime: Date.now() + 7 * 24 * 60 * 60 * 1000,
    endTime: Date.now() + 7 * 24 * 60 * 60 * 1000 + 6 * 60 * 60 * 1000,
    location: "Central Park Plaza",
    isVirtual: false,
    capacity: 300,
    price: 0,
    status: "upcoming",
    createdAt: Date.now(),
    category: {
      name: "Arts & Culture",
      slug: "arts-culture",
      color: "#EC4899",
    },
    organizer: {
      name: "Kulan Community Hub",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      email: "organizer@kulan.org",
    },
  },
  {
    _id: "kulan-startup-pitch-night",
    id: "kulan-startup-pitch-night",
    title: "Startup Founders & Pitch Night",
    description:
      "Early-stage founders present innovative projects to mentors, peers, and potential collaborators.",
    coverImage:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80",
    categoryId: "cat-business",
    organizerId: "org-kulan",
    startTime: Date.now() + 12 * 24 * 60 * 60 * 1000,
    endTime: Date.now() + 12 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000,
    location: "Virtual Stage (Zoom)",
    isVirtual: true,
    capacity: 200,
    price: 0,
    status: "upcoming",
    createdAt: Date.now(),
    category: {
      name: "Business",
      slug: "business",
      color: "#F59E0B",
    },
    organizer: {
      name: "Kulan Community Hub",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      email: "organizer@kulan.org",
    },
  },
  {
    _id: "kulan-youth-community-meetup",
    id: "kulan-youth-community-meetup",
    title: "Kulan Youth & Community Meetup",
    description:
      "Open community discussion on local leadership, civic engagement, and collaborative initiatives.",
    coverImage:
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=80",
    categoryId: "cat-community",
    organizerId: "org-kulan",
    startTime: Date.now() + 15 * 24 * 60 * 60 * 1000,
    endTime: Date.now() + 15 * 24 * 60 * 60 * 1000 + 2.5 * 60 * 60 * 1000,
    location: "Community Center Auditorium",
    isVirtual: false,
    capacity: 100,
    price: 0,
    status: "upcoming",
    createdAt: Date.now(),
    category: {
      name: "Community",
      slug: "community",
      color: "#10B981",
    },
    organizer: {
      name: "Kulan Community Hub",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      email: "organizer@kulan.org",
    },
  },
];

const CATEGORIES = ["All", "Technology", "Community", "Arts & Culture", "Business"];

export function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEvents = useMemo(() => {
    return KULAN_COMMUNITY_EVENTS.filter((event) => {
      const matchesCategory =
        selectedCategory === "All" || event.category?.name === selectedCategory;
      const matchesSearch =
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50/50 pb-16">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-blue-50/60 to-white border-b border-slate-200/80 pt-12 pb-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Kulan Community Events</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Connecting Our Community Through Events
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-8">
            Discover tech summits, cultural celebrations, founder pitch nights, and local gatherings.
          </p>

          {/* Search bar & quick action */}
          <div className="max-w-xl mx-auto flex flex-col sm:flex-row items-center gap-3">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search community events or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-xs"
              />
            </div>

            <Link
              to="/meetings"
              className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl bg-slate-900 hover:bg-slate-800 text-white transition-colors shadow-xs"
            >
              <span>Public Meetings</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === category
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <div key={event._id} className="h-full">
                <EventCard event={event} />
              </div>
            ))}
          </div>
        ) : (
          <EmptyState message="No community events match your search criteria. Try a different search term or category." />
        )}
      </main>
    </div>
  );
}

export default HomePage;
