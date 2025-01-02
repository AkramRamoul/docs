import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  documents: defineTable({
    title: v.string(),
    initialContent: v.optional(v.string()),
    ownerId: v.string(),
    content: v.string(),
    roomId: v.optional(v.string()),
    organizationId: v.optional(v.string()),
  })
    .index("by_owner_Id", ["ownerId"])
    .index("by_organization_Id", ["organizationId"])
    .searchIndex("search_title", {
      searchField: "title",
      filterFields: ["ownerId", "organizationId"],
    }),
});