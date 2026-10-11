---
title: Query points
description: Query an existing collection and paginate filtered points.
---

## Nearest vectors

For an existing collection with four-dimensional unnamed vectors:

```sh
curl 'http://localhost:6333/collections/notes/points/query' \
  -H 'Content-Type: application/json' \
  --data '{"query":[0.2,0.1,0.9,0.7],"limit":3,"with_payload":true}'
```

Set `using` to the vector name for a collection with named vectors. Match the query vector's dimension to the collection configuration.

## Filter results

```json
{
  "query": [0.2, 0.1, 0.9, 0.7],
  "filter": {
    "must": [{"key": "city", "match": {"value": "London"}}]
  },
  "limit": 3,
  "with_payload": true
}
```

Send this body to the same query endpoint. Use `limit` for the result count.

## Scroll points

```sh
curl 'http://localhost:6333/collections/notes/points/scroll' \
  -H 'Content-Type: application/json' \
  --data '{"limit":10,"with_payload":true,"with_vector":false}'
```

Pass `result.next_page_offset` as the next request's `offset`. A null offset marks the final page. Scrolling enumerates points; it does not rank by vector similarity.

## Source

These request bodies use `QueryRequest` and `ScrollRequest` from the [pinned specification](https://github.com/qdrant/qdrant/blob/016542aa5deb6c66380bb137badf73d54f742bde/docs/redoc/master/openapi.json). They require an existing collection and are not a record of requests executed against a live server.
