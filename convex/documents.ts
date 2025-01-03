import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
export const listDocuments = query({
  handler: async (ctx) => {
    const documents = await ctx.db.query("documents").collect();
    return documents;
  },
});

export const post = mutation({
  args: {
    title: v.optional(v.string()),
    initialContent: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new ConvexError("Unauthorized");
    }
    return await ctx.db.insert("documents", {
      title: args.title ?? "Untitled document",
      ownerId: user.subject,
      initialContent: args.initialContent,
    });
  },
});
