"""Validate the actual guide request bodies against the unchanged OpenAPI schemas."""
from pathlib import Path
import json
import re
from jsonschema import Draft4Validator, RefResolver

root = Path(__file__).resolve().parent.parent
spec = json.loads((root / 'upstream/openapi.json').read_text())
guide = (root / 'docs/query.md').read_text()
inline = re.findall(r"--data '([^']+)'", guide)
filtered = re.search(r'```json\n(.*?)\n```', guide, re.S).group(1)
cases = [('nearest_vectors', 'QueryRequest', json.loads(inline[0])),
         ('filtered_query', 'QueryRequest', json.loads(filtered)),
         ('scroll', 'ScrollRequest', json.loads(inline[1]))]
results = []
for name, schema_name, body in cases:
    schema = spec['components']['schemas'][schema_name]
    errors = sorted(Draft4Validator(schema, resolver=RefResolver.from_schema(spec)).iter_errors(body), key=str)
    results.append({'name': name, 'schema': schema_name, 'body': body,
                    'valid': not errors, 'errors': [str(e) for e in errors]})
print(json.dumps({'scope': 'request-schema validation only; no server requests', 'examples': results}, indent=2))
if any(not item['valid'] for item in results):
    raise SystemExit(1)
