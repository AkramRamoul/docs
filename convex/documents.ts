import { query } from "./_generated/server";
export const listDocuments = query({
  handler: async (ctx) => {
    const documents = await ctx.db.query("documents").collect();
    return documents;
  },
});
