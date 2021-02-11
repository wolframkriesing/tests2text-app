@app
begin-app

@http
get /
get /kata.txt

@tables
data
  scopeID *String
  dataID **String
  ttl TTL
