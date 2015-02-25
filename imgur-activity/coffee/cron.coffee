
http = require 'http'

options = 
  method: 'put'
  path: '/api/watches/update'
  port: 3000

update = () ->
  console.log 'update', Date.now()
  http.request options, (res) ->
    console.log 'res', res

req = update()
req.on 'error', (e) ->
  console.log 'problem with request: ' + e.message

# to = setTimeout () ->
#   update()
# , 60 * 1000

console.log 'end'