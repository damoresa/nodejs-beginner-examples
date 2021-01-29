#/bin/bash

curl -X GET http://localhost:3353/interactions/
curl -X GET http://localhost:3353/interactions/person/1
curl -X GET http://localhost:3353/interactions/person/5
curl -X POST -H 'Content-Type: application/json' -d '{ "persons": ["2", "1"] }' http://localhost:3353/interactions/
