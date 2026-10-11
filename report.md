# Qdrant Sourcey reference: coverage and maintainer findings

This independent reference renders Qdrant's unchanged OpenAPI snapshot at
`016542aa5deb6c66380bb137badf73d54f742bde` with Sourcey 3.6.12. Its intended
audience is developers inspecting the HTTP contract at that revision, especially
those moving from older search examples to the query endpoint. It does not
replace Qdrant's official documentation or imply upstream endorsement.

Publication target: <https://muhammadsqlan.com/docs/qdrant/>. The parent domain
is the existing personal website of the contributor publishing this reference.
The owner authorized this documentation path. The homepage is unchanged.

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
  their schemas in one 9,842,212-byte HTML page. The landing page is only 21,311
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
runx skill validation -i build_dir=site -i base_url=/docs/qdrant -R receipts-site -j
```

Receipt: `runx:receipt:sha256:e5760c8965833bb171389a1f6ec8d8c4c75bd79a53dfe6df7ca2c894d54defca`.
The receipt JSON and its verification verdict are included with the evidence.
It uses a **local-development signature**, not an external notary attestation.
The receipt records the governed command's successful closure; the separate
validation JSON supplies recomputable page hashes and individual checks.
Single-receipt verification does not establish receipt-tree lineage.

The local machine prohibits filesystem deletion. A macOS sandbox blocked the
CLI's final atomic rename after it wrote the sealed receipt. The original
temporary receipt was preserved, its bytes copied unchanged to
`receipt-site.json`, and `runx verify --receipt receipt-site.json
--allow-local-development-signatures --json` returned `valid: true` for the
signature, digest, and content address. This storage limitation does not turn
the locally signed receipt into an independent attestation.

This is a documentation delivery prepared with AI assistance. Acceptance and
payment remain decisions of the bounty reviewer.
