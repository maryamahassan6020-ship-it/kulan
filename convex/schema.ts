import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

export default defineSchema({
  ...authTables,

  users: defineTable({
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    avatar: v.optional(v.string()),
    bio: v.optional(v.string()),
    role: v.optional(v.string()),
    createdAt: v.optional(v.number()),
    image: v.optional(v.string()),
    emailVerificationTime: v.optional(v.number()),
    phone: v.optional(v.string()),
    phoneVerificationTime: v.optional(v.number()),
    isAnonymous: v.optional(v.boolean()),
  }).index("by_email", ["email"]),

  categories: defineTable({
    name: v.string(),
    slug: v.string(),
    icon: v.optional(v.string()),
    description: v.optional(v.string()),
    color: v.optional(v.string()),
  }).index("by_slug", ["slug"]),

  events: defineTable({
    title: v.string(),
    description: v.string(),
    coverImage: v.optional(v.string()),
    categoryId: v.id("categories"),
    organizerId: v.id("users"),
    startTime: v.number(),
    endTime: v.number(),
    location: v.string(),
    isVirtual: v.boolean(),
    capacity: v.optional(v.number()),
    price: v.optional(v.number()),
    status: v.string(),
    createdAt: v.number(),
  })
    .index("by_category", ["categoryId"])
    .index("by_organizer", ["organizerId"])
    .index("by_start_time", ["startTime"])
    .index("by_status", ["status"]),

  rsvps: defineTable({
    eventId: v.id("events"),
    userId: v.id("users"),
    status: v.string(),
    guestCount: v.optional(v.number()),
    note: v.optional(v.string()),
    updatedAt: v.number(),
  })
    .index("by_event", ["eventId"])
    .index("by_user", ["userId"])
    .index("by_event_and_user", ["eventId", "userId"]),
});

