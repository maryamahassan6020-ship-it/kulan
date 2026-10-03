import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchItemById } from "./api/itemsApi.js";
import { ErrorState } from "./components/States";
import { Calendar, MapPin, ArrowLeft, Tag, Globe } from "lucide-react";

export function ItemDetailPage() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    setStatus("loading");

    fetchItemById(id)
      .then((data) => {
        setItem(data);
        setStatus("success");
      })
      .catch(() => {
        setStatus("error");
      });
  }, [id]);

  if (status === "loading") {
    return (
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/meetings"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Public Meetings
        </Link>
        <p className="sr-only">Loading...</p>
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 animate-pulse">
          <div className="text-slate-500 font-medium mb-4">Loading...</div>
          <div className="w-full h-64 bg-slate-200 rounded-xl mb-6" />
          <div className="h-8 bg-slate-200 rounded w-3/4 mb-4" />
          <div className="h-4 bg-slate-200 rounded w-1/3 mb-6" />
          <div className="h-4 bg-slate-200 rounded w-full mb-2" />
          <div className="h-4 bg-slate-200 rounded w-5/6" />
        </div>
      </main>
    );
  }

  if (status === "error") {
    return (
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/meetings"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Public Meetings
        </Link>
        <ErrorState message="Something went wrong while fetching meeting details." />
      </main>
    );
  }

  if (!item) {
    return (
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/meetings"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Public Meetings
        </Link>
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center max-w-lg mx-auto my-8">
          <h2 className="text-base font-semibold text-slate-900 mb-1">Item not found</h2>
          <p className="text-sm text-slate-500">The requested public meeting could not be found.</p>
        </div>
      </main>
    );
  }

  const startDate = item.startTime
    ? new Date(item.startTime).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : item.date || "";

  const startTime = item.startTime
    ? new Date(item.startTime).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      })
    : "";

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/meetings"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Public Meetings
      </Link>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        {/* Cover Image & Category Badge */}
        {item.coverImage && (
          <div className="relative h-64 sm:h-80 w-full bg-slate-100 overflow-hidden">
            <img
              src={item.coverImage}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
              {item.category && (
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white shadow-xs"
                  style={{ backgroundColor: item.category.color || "#3B82F6" }}
                >
                  <Tag className="w-3 h-3" />
                  {item.category.name}
                </span>
              )}
              {item.isVirtual && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-slate-900/80 backdrop-blur-xs text-white">
                  <Globe className="w-3 h-3" />
                  Virtual
                </span>
              )}
            </div>
          </div>
        )}

        <div className="p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
            {item.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 py-4 border-y border-slate-100 text-sm text-slate-600 mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-500 shrink-0" />
              <span>
                {startDate} {startTime ? `• ${startTime}` : ""}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>{item.location}</span>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-base font-semibold text-slate-900">
              Meeting Overview & Agenda
            </h2>
            <div className="text-sm sm:text-base text-slate-700 leading-relaxed whitespace-pre-line">
              {item.description || "Official agenda details will be provided at the hearing."}
            </div>
          </div>

          {item.organizer && (
            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center gap-3">
              {item.organizer.avatar ? (
                <img
                  src={item.organizer.avatar}
                  alt={item.organizer.name}
                  className="w-8 h-8 rounded-full object-cover border border-slate-200"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                  {item.organizer.name.charAt(0)}
                </div>
              )}
              <div>
                <p className="text-xs text-slate-500">Organized by</p>
                <p className="text-sm font-medium text-slate-800">{item.organizer.name}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default ItemDetailPage;
