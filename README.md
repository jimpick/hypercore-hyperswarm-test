hypercore-hyperswarm-test
=========================

Just trying out [hypercore](https://github.com/mafintosh/hypercore) +
[hyperswarm](https://github.com/hyperswarm/network)...

In one terminal:

```
$ node publish.js
Key: 2a4f37f9ae3c154b5c90b9b7317de8078886b024d4f4c8b2da8fa28176e0d8cc
0 'a'
1 'b'
2 'c'
Waiting for connections...
```

In another one (perhaps on a different computer):

```
$ node subscribe.js 2a4f37f9ae3c154b5c90b9b7317de8078886b024d4f4c8b2da8fa28176e0d8cc
Waiting for connections...
new connection! { type: 'tcp',
  client: true,
  peer:
   { host: '10.0.1.11',
     port: 49304,
     local: true,
     referrer: null,
     topic:
      <Buffer ef c8 a4 74 5a 79 70 f0 5e 25 3f cf 60 80 d9 82 80 ba ef 24 0c cc bc fe b2 08 95 2e 79 6c f3 9e>} }
Key: 2a4f37f9ae3c154b5c90b9b7317de8078886b024d4f4c8b2da8fa28176e0d8cc
0 'a'
1 'b'
2 'c'
Finished
```

# License

MIT
