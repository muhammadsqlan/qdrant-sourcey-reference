# Qdrant Sourcey reference: coverage and maintainer findings

This independent reference renders Qdrant's unchanged OpenAPI snapshot at
`016542aa5deb6c66380bb137badf73d54f742bde` with Sourcey 3.6.12. Its intended
audience is developers inspecting the HTTP contract at that revision, especially
those moving from older search examples to the query endpoint. It does not
replace Qdrant's official documentation or imply upstream endorsement.

Publication target: <https://qdrant.muhammadsqlan.com/>. The subdomain root is
dedicated to this documentation. The parent is the contributor's existing
registered personal domain; its homepage is unchanged and has no Docs link.
The owner explicitly authorized this subdomain. This is an independent reference,
not upstream adoption. The bounty reviewer determines whether this arrangement
meets its publication rule. The previous documentation path remains available.

## Useful findings

- **Legacy introductory requests:** the pinned specification's introductory
  search example still contains `top`, while the current query request schema
  exposes `limit`. The guide supplies schema-checked query and scroll examples
  and clearly separates them from the unchanged generated upstream material.
  Upstream maintainers could update the introduction and automatically validate
  its request bodies alongside the specification.
- **Server variables need substitution:** Sourcey preserves
  `{protocol}://{hostname}:{port}` in generated requests instead of resolving
  the specification's defaults. Copying a generated request requires editing
  these placeholders. The guide uses the explicit local origin
  `http://localhost:6333`; a useful renderer improvement would be a server
  selector that resolves defaults before producing code examples.
- **Large reference page:** Sourcey's OpenAPI tab emits all 69 operations and
  their schemas in one 9,842,192-byte HTML page. The landing page is only 21,291
  bytes, but the API page still costs time and memory on slower devices. A
  generator improvement would split by tag or operation and keep cross-page
  schema links and search entries consistent. No artificial coverage subset
  was used to hide this limitation.
- **Narrow-screen layout:** long union types and schema headings originally
  exceeded a 390-pixel viewport. The supplied CSS lets the type badges and
  schema headings wrap, while keeping code blocks horizontally scrollable.
  The corrected local build passes desktop and mobile document-width checks.
- **Coverage is a contract check, not a runtime guarantee:** all 69 path/method
  pairs occur in the generated search index, and their anchors resolve. The
  three guide bodies validate against QueryRequest or ScrollRequest. No live
  Qdrant server or collection was started, so successful requests, responses,
  authentication, collection dimensions, and version compatibility are not
  claimed. An upstream CI job with a disposable collection would close that gap.
- **Development and release drift:** the source page identifies the exact
  commit and warns that the development specification can differ from an
  installed server. Release-specific reference versions and a visible version
  selector would make this safer to use as a long-term API reference.
- **Navigation is inspectable:** the site includes a query guide, source and
  license page, generated API tab, endpoint search, and official upstream links.
  The validator checks local page links, asset references, and search anchors.
  Readers can follow the provenance directly to the public upstream commit.
- **First search-load race:** a fast automated interaction that typed while the
  search index was still loading did not produce the expected query result.
  Sourcey's load callback renders an empty query after fetching the index;
  replaying the current input value would avoid dropping an early query.
  The recorded successful live search check waits for the initial index load
  before typing. This renderer behavior remains a limitation of this snapshot.

## Reproduction and receipt

The repository contains the unmodified Apache-2.0 input, Sourcey configuration,
guide sources, CSS, and deterministic validator. Exact tool versions are pinned
in `package.json`. See `README.md` for the build and validation commands.

The exact CLI version output was `runx-cli 0.9.1`. The governed validation
command was:

```sh
runx skill validation -i build_dir=site-subdomain-20261022 -i base_url= -R runx-subdomain-receipts-20261022 -j
```

Receipt: `runx:receipt:sha256:62d86f49bf3cdbf36290d22ee07dad27bd758402ab2e4afa7e7ee99fff202da0`.
The receipt JSON and its verification verdict are included with the evidence.
It uses a **local-development signature**, not an external notary attestation.
The receipt records the governed command's successful closure; the separate
validation JSON supplies recomputable page hashes and individual checks.
Single-receipt verification does not establish receipt-tree lineage.

The local machine prohibits filesystem deletion. Cleanup hooks preserve affected
items intact in the owner's designated bin. This revision's runx command exited
successfully, wrote the sealed receipt, and returned `status: sealed`. Verification
with `runx verify --receipt receipt.json --allow-local-development-signatures
--json` returned `valid: true` for the signature, digest, and content address.
This fixture allowance does not turn a locally signed receipt into an
independent attestation.

This is a documentation delivery prepared with AI assistance. Acceptance and
payment remain decisions of the bounty reviewer.


## Dedicated-host verification, 2026-10-22

- All 14 generated public files returned HTTP 200 and matched the rebuilt bytes.
- The canonical URL and sitemap use `https://qdrant.muhammadsqlan.com/`.
- Search navigated to Query points; all 69 operation anchors were present.
- Desktop width was 1365/1365 pixels and mobile width was 390/390 pixels,
  with no horizontal document overflow or browser console/network errors.
- The main homepage byte hash, its Worker deployment list, and all preexisting
  Worker routes were unchanged after the new dedicated Worker was deployed.
- Browser, curl, and Node fetch checks returned 200. Stock Python-urllib receives
  Cloudflare 403, and browser-like requests may receive analytics injection.
  This client variation is disclosed; no global security settings were changed.

The current build, receipt, validation result, live verification, and screenshots
are archived together in this directory. Original generation evidence remains
in the repository history and original root files.
