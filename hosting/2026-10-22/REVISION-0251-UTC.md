# Frantic #33 revision: public docs availability

The submitted Qdrant reference is live at https://muhammadsqlan.com/docs/qdrant/.
This revision responds to the human reviewer's 2026-10-22 00:53 UTC report of a 404.
The original assets have been restored behind a separate, narrowly routed static
Worker so that later homepage deployments do not overwrite the documentation.
No homepage Docs link was added and the homepage content is unchanged.

Fresh checks at 2026-10-22 02:51 UTC:

- All 14 public files return HTTP 200 and exactly match the original submitted SHA-256 hashes.
- All 69 API-operation anchors are present. Search for Query points navigates to the correct operation.
- Desktop 1365 px and mobile 390 px have no horizontal overflow.
- No browser console, page or request errors were observed.
- Homepage bytes equal the pre-restoration baseline under the same request headers.
- The slashless URL redirects to the canonical trailing-slash page.

Public restoration evidence and route isolation:
https://github.com/muhammadsqlan/qdrant-sourcey-reference/tree/1530440004dd009c49dcdfa6d0311e48a8381763/hosting/2026-10-22

The original source, report, evidence and runx receipt remain pinned to
88d85a4b76d4bab9f0d497884ffd5178a3e069f5; no generation or provenance claim was changed.
The original report's limitations still apply, including lack of a live Qdrant-server test.

Availability caveat: ordinary browser, curl and Node fetch requests return 200.
A stock Python urllib user agent receives Cloudflare error 1010 (403), a user-agent
filter response rather than a missing page. No domain security setting was changed.
This observation is disclosed so the reviewer can distinguish it from a 404.

## Fresh verification data

```json
{
  "at": "2026-10-22T02:51:23.343Z",
  "public_url": "https://muhammadsqlan.com/docs/qdrant/",
  "http": [
    {
      "name": "_og/api.png",
      "status": 200,
      "final_url": "https://muhammadsqlan.com/docs/qdrant/_og/api.png",
      "bytes": 59540,
      "sha256": "7992bac38b235f4545487d53edc9c96382ffc58b4a1c76fb4048ac24403fa8e0",
      "matches_submission": true
    },
    {
      "name": "_og/index.png",
      "status": 200,
      "final_url": "https://muhammadsqlan.com/docs/qdrant/_og/index.png",
      "bytes": 65857,
      "sha256": "15f473e0d642749495f72f7c5b222a055dba23c6e98e0db8c1de105346061dbe",
      "matches_submission": true
    },
    {
      "name": "_og/query.png",
      "status": 200,
      "final_url": "https://muhammadsqlan.com/docs/qdrant/_og/query.png",
      "bytes": 63938,
      "sha256": "1e7749fd174d31aa1a090ebd393d764fa54fdac64954a46dec299d39bfdec796",
      "matches_submission": true
    },
    {
      "name": "_og/source.png",
      "status": 200,
      "final_url": "https://muhammadsqlan.com/docs/qdrant/_og/source.png",
      "bytes": 67211,
      "sha256": "a3690303bb7ce9772a32fae51d274587d38b78fa7d7308d668e5472e34adb079",
      "matches_submission": true
    },
    {
      "name": "api.html",
      "status": 200,
      "final_url": "https://muhammadsqlan.com/docs/qdrant/api",
      "bytes": 9842212,
      "sha256": "48269a8f1f7614ba806798ca885684805e3813c90dd2611b1723f7bf4af733ed",
      "matches_submission": true
    },
    {
      "name": "index.html",
      "status": 200,
      "final_url": "https://muhammadsqlan.com/docs/qdrant/",
      "bytes": 21311,
      "sha256": "a0e61f44260de466578da1aa3bc9a35944e906ac5c924b0dc627abc50b5a954e",
      "matches_submission": true
    },
    {
      "name": "llms-full.txt",
      "status": 200,
      "final_url": "https://muhammadsqlan.com/docs/qdrant/llms-full.txt",
      "bytes": 63173,
      "sha256": "eb48a596d45d74c8987cd3b3da3452b07ca71677ca4ec58b9ecff2629e194512",
      "matches_submission": true
    },
    {
      "name": "llms.txt",
      "status": 200,
      "final_url": "https://muhammadsqlan.com/docs/qdrant/llms.txt",
      "bytes": 15576,
      "sha256": "690d2a8f6d75ffb9c43a6bfd3f3557ead718e878a7e891dacb4e3ebfcc37a88c",
      "matches_submission": true
    },
    {
      "name": "query.html",
      "status": 200,
      "final_url": "https://muhammadsqlan.com/docs/qdrant/query",
      "bytes": 28825,
      "sha256": "55e60cc4dcf8f412659070c7b8082f651eacf56c869fcf3be4ba910c5fe3e198",
      "matches_submission": true
    },
    {
      "name": "search-index.json",
      "status": 200,
      "final_url": "https://muhammadsqlan.com/docs/qdrant/search-index.json",
      "bytes": 86889,
      "sha256": "a23ea1a30302cd1425ac0eb085362539c6f730b643c9bb97fc38eb855d33eaba",
      "matches_submission": true
    },
    {
      "name": "sitemap.xml",
      "status": 200,
      "final_url": "https://muhammadsqlan.com/docs/qdrant/sitemap.xml",
      "bytes": 440,
      "sha256": "b57e466093fb10474674112e4c1bd56c49680b2fca8a8ed4c3bee9323f2b8d6e",
      "matches_submission": true
    },
    {
      "name": "source.html",
      "status": 200,
      "final_url": "https://muhammadsqlan.com/docs/qdrant/source",
      "bytes": 19847,
      "sha256": "fd17ea2d41a3c0cf12b5b0a03d8a5712610c349bc7a515e34baa033e6b4fedeb",
      "matches_submission": true
    },
    {
      "name": "sourcey.css",
      "status": 200,
      "final_url": "https://muhammadsqlan.com/docs/qdrant/sourcey.css",
      "bytes": 123261,
      "sha256": "f9f770f849e2ab5b0b8438e78cb3f47c822f8c0ca366606dcc0395884a4637a6",
      "matches_submission": true
    },
    {
      "name": "sourcey.js",
      "status": 200,
      "final_url": "https://muhammadsqlan.com/docs/qdrant/sourcey.js",
      "bytes": 17809,
      "sha256": "70a6cacc6871c28ae8b0418dfacff6b7c991443865a3c682fccaf86abd43df59",
      "matches_submission": true
    }
  ],
  "browser": {
    "title": "Qdrant API - Qdrant API reference",
    "desktop": {
      "viewport": 1365,
      "content": 1365
    },
    "search_url": "https://muhammadsqlan.com/docs/qdrant/api#operation-collections-collection-name-points-query-post",
    "operation_count": 69,
    "query_present": true,
    "mobile": {
      "viewport": 390,
      "content": 390
    }
  },
  "errors": [],
  "homepage": {
    "status": 200,
    "unchanged": true,
    "before_sha256": "decb9cd551c0f6cefc5b31a11f2b0bf50ee5ed2f8efffc826f0dd39f98749225",
    "after_sha256": "decb9cd551c0f6cefc5b31a11f2b0bf50ee5ed2f8efffc826f0dd39f98749225"
  },
  "passed": true
}
```
