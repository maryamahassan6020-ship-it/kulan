import React from "react";
import { Calendar, MapPin, Globe, Tag } from "lucide-react";
import { EventItem } from "../types";

interface EventCardProps {
  event: EventItem;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const startDate = new Date(event.startTime).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const startTime = new Date(event.startTime).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <div className="group bg-white rounded-xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col h-full">
      {/* Cover Image & Category Badge */}
      <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
        <img
          src={
            event.coverImage ||
            "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80"
          }
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
          {event.category && (
            <span
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold text-white shadow-xs"
              style={{ backgroundColor: event.category.color || "#3B82F6" }}
            >
              <Tag className="w-3 h-3" />
              {event.category.name}
            </span>
          )}
          {event.isVirtual && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-900/80 backdrop-blur-xs text-white">
              <Globe className="w-3 h-3" />
              Virtual
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1 mb-2">
          {event.title}
        </h3>

        <p className="text-sm text-slate-600 line-clamp-2 mb-4 flex-1">
          {event.description}
        </p>

        {/* Date & Location Info */}
        <div className="space-y-2 pt-3 border-t border-slate-100 text-xs text-slate-600 font-medium">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-500 shrink-0" />
            <span>
              {startDate} • {startTime}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>
        </div>

        {/* Organizer */}
        {event.organizer && (
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2.5">
            {event.organizer.avatar ? (
              <img
                src={event.organizer.avatar}
                alt={event.organizer.name}
                className="w-6 h-6 rounded-full object-cover border border-slate-200"
              />
            ) : (
              <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                {event.organizer.name.charAt(0)}
              </div>
            )}
            <span className="text-xs text-slate-500 truncate">
              Organized by <strong className="text-slate-700 font-medium">{event.organizer.name}</strong>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
