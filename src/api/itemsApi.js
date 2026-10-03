const API_URL = "https://api.openpublica.com/v1/meetings";

function formatLocation(govId) {
  if (!govId) return "Civic Center";
  return govId
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function mapMeeting(m) {
  const meetingId = m.meeting_id || m.id;
  const startTime = m.epoch_timestamp
    ? m.epoch_timestamp * 1000
    : m.date
      ? new Date(m.date).getTime()
      : Date.now();

  const location = formatLocation(m.government_id);

  return {
    id: meetingId,
    _id: meetingId,
    meeting_id: meetingId,
    title: m.title || "Public Meeting",
    description: m.summary || m.description || "",
    startTime,
    endTime: startTime + 2 * 60 * 60 * 1000,
    date: m.date || new Date(startTime).toISOString().split("T")[0],
    location,
    isVirtual: Boolean(
      (m.title && /virtual|online|zoom/i.test(m.title)) ||
      (m.summary && /virtual|online|zoom/i.test(m.summary))
    ),
    coverImage: m.thumbnail_url || undefined,
    thumbnail: m.thumbnail_url || "",
    category: m.category_name
      ? {
          name: m.category_name,
          slug: "civic",
          color: "#3B82F6",
        }
      : {
          name: "Civic Meeting",
          slug: "civic",
          color: "#2563EB",
        },
    organizer: location
      ? {
          name: `${location} Assembly`,
          avatar: "",
        }
      : undefined,
    status: "upcoming",
    createdAt: startTime,
  };
}

export async function fetchItems() {
  const res = await fetch(`${API_URL}?limit=15`);

  if (!res.ok) {
    throw new Error(`Failed to fetch items: ${res.status} ${res.statusText}`);
  }

  const result = await res.json();
  const rawList = Array.isArray(result.data)
    ? result.data
    : Array.isArray(result)
      ? result
      : [];

  return rawList.map(mapMeeting);
}

export async function fetchItemById(id) {
  const res = await fetch(`${API_URL}/${id}`);

  if (res.status === 404 || res.status === 400) {
    return null;
  }

  if (!res.ok) {
    throw new Error(`Failed to fetch item: ${res.status} ${res.statusText}`);
  }

  const result = await res.json();
  const m = result.data || result;

  if (!m || (typeof m === "object" && Object.keys(m).length === 0)) {
    return null;
  }

  return mapMeeting(m);
}
