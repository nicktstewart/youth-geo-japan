# HANDOFF

## Published Site Workflow

- If the source data, upstream design files, or original VS Code project are updated elsewhere, edit those upstream files first.
- Then ask this repository to publish the new version under the appropriate `public/<site>/` directory and any related route/config files.
- For any site that is served from `public/`, treat the files there as the published output for this repository.
- When adding a new public site, make sure the publication path is documented in the repo so future updates know where the deployed version lives.
- Default publication mode for side projects is direct URL access, not search-engine indexation.
- If a site should be discoverable through Google Search or other search engines, that is a separate request and should be stated explicitly before changing SEO, sitemap, robots, or metadata settings.
- After changes, verify with `npm run lint` and `npm run build`.

## What To Update

- Static HTML site:
  - `public/<site>/index.html`
  - Any supporting JSON, images, or other assets in `public/<site>/`
- Additional entry pages or variants:
  - `public/<site>/<variant>.html`
  - Any linked data files in the same folder
- Next.js route-based pages:
  - `app/`
  - `lib/`
  - `components/`
  - SEO, sitemap, robots, and metadata files as needed

## Rule Of Thumb

- Upstream source files are for editing and generation.
- This repository is for the published version that users actually open.
- If a site exists only as static files in `public/`, update those files here to publish the new version.
