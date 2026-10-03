import React from "react";
import { AlertCircle, CalendarX, RefreshCw } from "lucide-react";

export const LoadingState: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="bg-white rounded-xl border border-slate-200 p-4 animate-pulse flex flex-col h-80"
        >
          <div className="w-full h-40 bg-slate-200 rounded-lg mb-4" />
          <div className="h-5 bg-slate-200 rounded w-3/4 mb-2" />
          <div className="h-4 bg-slate-200 rounded w-full mb-2" />
          <div className="h-4 bg-slate-200 rounded w-1/2 mb-auto" />
          <div className="h-3 bg-slate-200 rounded w-2/3 mt-4" />
        </div>
      ))}
    </div>
  );
};

interface EmptyStateProps {
  message?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  message = "No events found. Check back later for new community gatherings.",
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-12 text-center max-w-lg mx-auto my-8">
      <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
        <CalendarX className="w-6 h-6" />
      </div>
      <h3 className="text-base font-semibold text-slate-900 mb-1">No Events Found</h3>
      <p className="text-sm text-slate-500 mb-4">{message}</p>
    </div>
  );
};

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  message = "Failed to load events from Convex database.",
  onRetry,
}) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center max-w-lg mx-auto my-8">
      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3 text-red-600">
        <AlertCircle className="w-5 h-5" />
      </div>
      <h3 className="text-sm font-semibold text-red-900 mb-1">Error Loading Data</h3>
      <p className="text-xs text-red-700 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-md text-xs font-medium transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Retry Query
        </button>
      )}
    </div>
  );
};
