#/bin/bash

curl -X POST -H 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiSm9obiIsInBhc3MiOiIxMjM0NTYifSwiaWF0IjoxNjExOTIxODQ4LCJleHAiOjE2MTE5MjM2NDh9.7EuSj-2-T8BUZcUq3cCApZNBPwhMEJ3CxG6wiP0IB3s' -H 'Content-Type: application/json' -d '{ "personId": "1" }' http://localhost:3355/tracking/
