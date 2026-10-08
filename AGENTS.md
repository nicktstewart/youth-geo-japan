<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## GitHub operations

- Do not run `git commit` or `git push` in this project. The user will review, commit, and push all changes.
- Leave completed changes uncommitted in the working tree for the user to handle.

## SEO / AIO maintenance

Before changing user-visible content, page routes, navigation, metadata, or organization details, read and follow `docs/seo-aio-guide.md`.

- Keep Japanese and English content and metadata aligned.
- When visible content on an existing page changes, update only that route's truthful `routeLastModified` value in `app/sitemap.ts`.
- Any Activities newsletter, activity record, event, or schedule update MUST update the `"/activities"` date in `app/sitemap.ts` to the real publication or deployment date. Do not use the build time and do not update `lastmod` for formatting-only or code-only changes.
- New public pages must be added to `indexableRoutes` in `lib/seo.ts`, `routeLastModified` in `app/sitemap.ts`, bilingual metadata, hreflang/canonical handling, and crawlable internal navigation.
- Keep visible content, page metadata, JSON-LD, sitemap, robots rules, and social preview information consistent.
- Run `npm run lint` and `npm run build` after SEO- or content-related changes.

## Promo video

- The promo video and its source live in `promo/`. Before editing or re-rendering the video, read `promo/README.md` (pipeline, storyboard, beat-sync rules, editing recipes).
