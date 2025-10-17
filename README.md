# Microfrontends Fingerprint Prototype

This sandbox demonstrates two independent React microfrontends (App One and App Two) embedded into a host shell via Webpack Module Federation. Each microfrontend mounts its own instance of the FingerprintJS Pro React SDK and shows the detected `visitorId`, plus a button to re-fetch the identification.

## Prerequisites

- Node.js 18+
- Fingerprint Pro public API key exposed as `FPJS_PUBLIC_API_KEY` and optional Fingerprint region as `FPJS_REGION` (for example by exporting them in the shell before running the dev servers or by copying `.env.example` to `app-one/.env` and `app-two/.env`)

## Install

```bash
npm install
```

Copy `.env.example` into `app-one/.env` and `app-two/.env` (or export the same variables in your shell) and adjust the values for your Fingerprint workspace. The webpack configs load these files via `dotenv`; the region defaults to `us` if not provided.

## Run the dev servers

Start each bundle in its own terminal tab (ports 3001/3002 for the remotes, 3000 for the host):

```bash
npm run start:app-one
npm run start:app-two
npm run start:host
```

Then visit http://localhost:3000 to see both remotes in the host shell.

Prefer a single command? Use the bundled `npm-run-all` helper to launch the three servers in parallel:

```bash
npm run dev
```

This script fans out `start:app-one`, `start:app-two`, and `start:host` and aggregates their logs.

## Build and serve the production bundles

Produce all three builds at once:

```bash
npm run build:all
```

To preview the built assets with simple static servers on the usual ports (3000–3002):

```bash
npm run start:prod
```

This command serves the contents of `app-one/dist`, `app-two/dist`, and `host/dist` without using the dev servers.

## Build

Generate production bundles:

```bash
npm run build:app-one
npm run build:app-two
npm run build:host
```

Each command outputs to its respective `dist/` directory. Serve those folders with any static file server to preview the production build.
