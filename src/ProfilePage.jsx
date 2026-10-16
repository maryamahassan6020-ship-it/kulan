import { Link } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useItemsStore } from "./store/useItemsStore";
import { LogOut, Bookmark, Calendar, ArrowLeft, Shield } from "lucide-react";

export function ProfilePage() {
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);

  const items = useItemsStore((state) => state.items);
  const bookmarkedItems = items.filter((item) => item.isSelected);

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-xs">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-slate-900">{user?.name || "Member"}</h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                  <Shield className="w-3 h-3" />
                  Authenticated
                </span>
              </div>
              <p className="text-sm text-slate-500">{user?.email}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={logout}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors cursor-pointer border border-red-100"
          >
            <LogOut className="w-4 h-4" />
            Log Out
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <p className="font-semibold text-slate-700 mb-1">Session Token (Zustand Persist)</p>
            <p className="font-mono text-slate-500 break-all">{token || "None"}</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <p className="font-semibold text-slate-700 mb-1">Protected Route Verification</p>
            <p className="text-slate-500">
              This route is guarded by <code className="text-blue-600 font-mono">ProtectedRoute.jsx</code>. Refreshing the browser preserves your session via localStorage.
            </p>
          </div>
        </div>
      </div>

      {/* Bookmarked / Selected Meetings from Week 14 store */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Bookmark className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-bold text-slate-900">Your Saved Meetings ({bookmarkedItems.length})</h2>
        </div>

        {bookmarkedItems.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-sm text-slate-500">
            <p>You have not saved any meetings yet.</p>
            <Link to="/meetings" className="inline-block mt-2 font-medium text-blue-600 hover:underline">
              Browse Public Meetings →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bookmarkedItems.map((meeting) => (
              <Link
                key={meeting.id}
                to={`/items/${meeting.id}`}
                className="block p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-xs transition-all no-underline"
              >
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                  <Calendar className="w-3.5 h-3.5 text-blue-500" />
                  <span>{meeting.date}</span>
                </div>
                <h3 className="font-semibold text-slate-900 text-sm line-clamp-1">{meeting.title}</h3>
                <p className="text-xs text-slate-500 line-clamp-1 mt-1">{meeting.location}</p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default ProfilePage;
