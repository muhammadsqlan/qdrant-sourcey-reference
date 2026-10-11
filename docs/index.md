---
title: Qdrant API
description: Collections, points, queries, and operations at a pinned Qdrant source revision.
---

69 HTTP operations from Qdrant's OpenAPI specification.

- [Query points](query.md)
- [API reference](api.html)
- [Source and coverage](source.md)
- [Official documentation](https://qdrant.tech/documentation/)

Independent reference maintained by Muhammad Saqlain. This site is not an official Qdrant publication.

## Read a collection

For a local Qdrant instance with an existing `notes` collection:

```sh
curl 'http://localhost:6333/collections/notes'
```

Use the API tab for request parameters, response schemas, and language examples. The source snapshot describes the development branch; check your deployed version before using an endpoint.
