
http = require 'http'

options = 
  method: 'put'
  path: '/api/watches/update'
  port: 3000

update = () ->
  console.log 'update', Date.now()
  req = http.request options, (res) ->
    console.log 'request success'
  req.on 'error', (e) ->
    console.log 'problem with request: ' + e.message
  req.end()

update()

interval = setInterval () ->
  update()
, 60 * 1000

console.log 'end'