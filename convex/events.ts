import { query, mutation } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";

export const getEvents = query({
  args: {},
  handler: async (ctx) => {
    const events = await ctx.db.query("events").collect();

    const enrichedEvents = await Promise.all(
      events.map(async (event) => {
        const category = await ctx.db.get(event.categoryId);
        const organizer = await ctx.db.get(event.organizerId);
        return {
          ...event,
          category: category
            ? { name: category.name, slug: category.slug, color: category.color }
            : null,
          organizer: organizer
            ? { name: organizer.name, avatar: organizer.avatar, email: organizer.email }
            : null,
        };
      })
    );

    return enrichedEvents;
  },
});

export const createEvent = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    categoryId: v.id("categories"),
    startTime: v.number(),
    endTime: v.number(),
    location: v.string(),
    isVirtual: v.boolean(),
    capacity: v.optional(v.number()),
    price: v.optional(v.number()),
    coverImage: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthenticated: Must be logged in to create an event.");
    }

    const eventId = await ctx.db.insert("events", {
      ...args,
      organizerId: userId,
      status: "upcoming",
      createdAt: Date.now(),
    });

    return eventId;
  },
});

export const seedEvents = mutation({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthenticated: Must be logged in to seed events.");
    }

    const existingEvents = await ctx.db.query("events").collect();
    if (existingEvents.length > 0) {
      return { status: "already_seeded", count: existingEvents.length };
    }

    // Seed Categories
    const techCategoryId = await ctx.db.insert("categories", {
      name: "Technology",
      slug: "technology",
      icon: "laptop",
      description: "Software, hardware, AI, and developer meetups",
      color: "#3B82F6",
    });

    const communityCategoryId = await ctx.db.insert("categories", {
      name: "Community",
      slug: "community",
      icon: "users",
      description: "Local gatherings and social meetups",
      color: "#10B981",
    });

    const artsCategoryId = await ctx.db.insert("categories", {
      name: "Arts & Culture",
      slug: "arts-culture",
      icon: "palette",
      description: "Music, performance, poetry, and art exhibitions",
      color: "#EC4899",
    });

    const businessCategoryId = await ctx.db.insert("categories", {
      name: "Business",
      slug: "business",
      icon: "briefcase",
      description: "Entrepreneurship, networking, and career growth",
      color: "#F59E0B",
    });

    // Seed Organizer User
    const organizerId = await ctx.db.insert("users", {
      name: "Kulan Community Hub",
      email: "organizer@kulan.org",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      bio: "Organizing inclusive tech and community events across the region.",
      role: "organizer",
      createdAt: Date.now(),
    });

    // Seed Sample Events
    const now = Date.now();
    const day = 24 * 60 * 60 * 1000;

    const sampleEvents = [
      {
        title: "Tech Summit 2026",
        description: "Join local developers, designers, and tech enthusiasts for keynotes, workshops, and networking.",
        coverImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
        categoryId: techCategoryId,
        organizerId: organizerId,
        startTime: now + day * 3,
        endTime: now + day * 3 + (4 * 60 * 60 * 1000),
        location: "Kulan Innovation Lab & Online",
        isVirtual: false,
        capacity: 150,
        price: 0,
        status: "upcoming",
        createdAt: now,
      },
      {
        title: "Community Cultural & Arts Fair",
        description: "A celebration of local music, food, craft, and visual storytelling featuring local artists.",
        coverImage: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
        categoryId: artsCategoryId,
        organizerId: organizerId,
        startTime: now + day * 7,
        endTime: now + day * 7 + (6 * 60 * 60 * 1000),
        location: "Central Park Plaza",
        isVirtual: false,
        capacity: 300,
        price: 0,
        status: "upcoming",
        createdAt: now,
      },
      {
        title: "Startup Founders & Pitch Night",
        description: "Early-stage founders present innovative projects to mentors, peers, and potential collaborators.",
        coverImage: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80",
        categoryId: businessCategoryId,
        organizerId: organizerId,
        startTime: now + day * 12,
        endTime: now + day * 12 + (3 * 60 * 60 * 1000),
        location: "Virtual Stage (Zoom)",
        isVirtual: true,
        capacity: 200,
        price: 0,
        status: "upcoming",
        createdAt: now,
      },
      {
        title: "Kulan Youth & Community Meetup",
        description: "Open community discussion on local leadership, civic engagement, and collaborative initiatives.",
        coverImage: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=80",
        categoryId: communityCategoryId,
        organizerId: organizerId,
        startTime: now + day * 15,
        endTime: now + day * 15 + (2.5 * 60 * 60 * 1000),
        location: "Community Center Auditorium",
        isVirtual: false,
        capacity: 100,
        price: 0,
        status: "upcoming",
        createdAt: now,
      },
    ];

    for (const event of sampleEvents) {
      await ctx.db.insert("events", event);
    }

    return { status: "seeded", count: sampleEvents.length };
  },
});
