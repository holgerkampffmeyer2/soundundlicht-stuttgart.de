## Context

The Sound & Licht Stuttgart website is built as an Astro 7.x Static Site Generation (SSG) application utilizing Tailwind CSS 4.x for styling in a dark theme. It features robust client-side search (Pagefind), wishlist/merkliste management (`localStorage`), content collections for products, FAQs, and cities, and automated SEO/IndexNow submission.

## Goals / Non-Goals

**Goals:**
- Document and formalize the complete feature set and architecture of the current implementation.
- Outline design decisions regarding static generation, client-side stores, search integration, and testing suites.

**Non-Goals:**
- Implementing new features or refactoring existing business logic.

## Decisions

- **Architecture:** Astro SSG with static output to `dist/`, ensuring high performance, excellent SEO, and fast global loading.
- **Styling:** Tailwind CSS 4.x with custom design tokens for a dark, professional event technology rental aesthetic.
- **Search:** Pagefind 1.5.2 integrated via `astro-pagefind` with inline script initialization and client-side catalog matching for rentals.
- **Merkliste / Wishlist:** Client-side persistence using `localStorage` (`sls_merkliste`) with automatic 24-hour expiration and event-driven component communication.
- **Content Collections:** Type-safe YAML/JSON content loading for products, FAQs, and cities.
- **Testing:** Vitest for unit testing store logic and Playwright for E2E tests of search and wishlist interactions.

## Risks / Trade-offs

- **Static Constraints:** Dynamic features require client-side JavaScript (`localStorage`, search overlay, wishlist drawer).
  - *Mitigation:* Graceful degradation and robust client store initialization with fallback handling.
- **Search Indexing:** Pagefind index requires a full build step (`pnpm run build`).
  - *Mitigation:* Integrated into build and CI pipeline commands.
