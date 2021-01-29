#/bin/bash

curl -X POST -H 'Content-Type: application/json' -d '{ "username": "John", "pass": "123456" }' http://localhost:3351/login/
curl -X GET -H 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiSm9obiIsInBhc3MiOiIxMjM0NTYifSwiaWF0IjoxNjExOTA5MzMyLCJleHAiOjE2MTE5MTExMzJ9.HGWcnRIAXrvhgC1Zz2S6DKkf2mjDxhu-iQEec1WZBY8' http://localhost:3351/login/
