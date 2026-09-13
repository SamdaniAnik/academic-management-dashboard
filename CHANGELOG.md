# Changelog

All notable changes to the **Academic Management Dashboard** are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- **Loading state** — `src/app/loading.js` renders Material UI skeletons while dynamic content streams in, so the interface never shows a blank page during navigation.
- **Error boundary** — `src/app/error.js` is a client-side boundary that catches render failures, surfaces the error message, and provides a working **Try again** button (`reset()`).
- **MIT License** — added the project `LICENSE` file so the repository can be distributed and reused as open-source software.
- **`.env.example`** — a documented template for the environment variables used by the application (see the README reference table).
- **Dashboard fallback states** — the headline cards render `-` when a data source is unavailable, and a single alert is shown only when every dashboard data source fails.
- **SSR-safe chart** — `DynamicBarChart` wraps `BarChart` with `next/dynamic` + `ssr: false`, letting `apexcharts` (which reads `window` at module load) render exclusively on the client. `BarChart` now uses the `apexcharts` API directly instead of `react-apexcharts`, fixing a runtime interop bug that previously crashed the page.

### Fixed

- **Security — hardcoded credentials** — removed database `host`/`user`/`password` hardcoding; the Sequelize instance now reads `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, and `DB_NAME` from the environment (see `src/lib/config/sequelize.js`).
- **Security — `X-Powered-By` header** — disabled Next.js's default framework fingerprint header (`poweredByHeader: false`).
- **Security — insecure default export** — the Sequelize instance no longer exports an unguarded default that could be imported by client components and leak credentials into the browser.
- **Architecture — business logic inside the App Router** — moved `models/*` and `config/sequelize.js` from `src/app/` into `src/lib/`, leaving only route handlers and components in the router directory.
- **Architecture — unconventional barrel naming** — renamed `__associations.js` to the conventional `associations.js` and updated every API route's imports to depth-correct relative paths.
- **Architecture — duplicated sidebar submenus** — extracted reusable `NavItem`/`SubMenu` components, replacing duplicated course/faculty submenu rendering (~50 lines) with a single `openMenu` state; parent menu items now highlight correctly on child routes.
- **Code quality — broken chart data flow** — re-enabled the previously commented-out "Most Popular Courses" chart and corrected the odd `../app/components/BarChart` import path.
- **Code quality — fragile API fetches** — the dashboard previously `await`ed three fetches in sequence with no error handling; all routes now use a shared `fetchJson()` helper and run in parallel via `Promise.all`.
- **Code quality — TypeScript config on a JS project** — removed `tsconfig.json`, `next-env.d.ts`, and the unused `typescript` devDependency; path aliases are now declared in `jsconfig.json` with `strict` checking enabled.
- **Pre-existing crash in `course-enrollment` API** — corrected imported model names (`StudentsEnrollment` → `StudentEnrollment`, `FacultyCourses` → `FacultyCourse`, `Courses` → `Course`) so the route compiles against the renamed barrel.

### Changed

- **Documentation** — rewrote the README into a complete project guide: feature list, screenshots of every main page, tech-stack table, step-by-step setup, environment-variable reference, scripts, API overview, project structure, and contribution guide.
- **Dashboard has explicit dynamic rendering** — `export const dynamic = "force-dynamic"` matches the page's always-fresh `no-store` data.