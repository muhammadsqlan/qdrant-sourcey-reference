# Qdrant API reference

Independent documentation generated with Sourcey from Qdrant's OpenAPI specification.
The unchanged source snapshot is pinned to
[`016542aa5deb6c66380bb137badf73d54f742bde`](https://github.com/qdrant/qdrant/tree/016542aa5deb6c66380bb137badf73d54f742bde).
It contains 69 HTTP operations. Qdrant has not endorsed this publication.

## Build

Requires Node.js 24 and the exact tool versions in `package.json`.

```sh
npm install --ignore-scripts
# Use an output directory that does not already exist.
npx sourcey build --config docs/sourcey.config.ts -o build-local
RUNX_INPUT_BUILD_DIR=build-local node validation/validate.mjs
```

Set `SOURCEY_SITE_URL` and `SOURCEY_BASE_URL` when building for a public host.
Keep the upstream specification unchanged. Sourcey regenerates its output;
preserve any existing output before selecting a new build directory.

The published-path build is:

```sh
SOURCEY_SITE_URL=https://muhammadsqlan.com SOURCEY_BASE_URL=/docs/qdrant \
  npx sourcey build --config docs/sourcey.config.ts -o site-new
RUNX_INPUT_BUILD_DIR=site-new RUNX_INPUT_BASE_URL=/docs/qdrant node validation/validate.mjs
npx runx skill validation -i build_dir=site-new -i base_url=/docs/qdrant -R receipts-new -j
```

The optional request-body check uses Python with `jsonschema` installed:
`python3 validation/examples.py`. It extracts the request bodies from the guide
and checks them against the pinned QueryRequest and ScrollRequest definitions.

## Scope

- All operations from the pinned specification, with generated curl, JavaScript,
  and Python examples, schemas, and search.
- A short guide to current query and scroll requests.
- Source attribution, license, and coverage notes.
- CSS corrections for long union types and schema names on narrow screens.

The three guide request bodies pass schema validation. No live Qdrant server
was used. Generated examples require real values for server variables and path
parameters; upstream introductory examples include legacy fields. See
`report.md` for details and validation limits.

## Evidence

`validation/validate.mjs` independently checks the source hash, endpoint coverage,
links and anchors, source attribution, license, assets, and landing-page size.
`validation/X.yaml` wraps that read-only validator in runx. A local receipt does
not prove upstream endorsement, hosting, acceptance, or payment.

The upstream source and documentation remain under the [Apache-2.0 license](upstream/LICENSE).
Sourcey's renderer retains its own published license and attribution.
