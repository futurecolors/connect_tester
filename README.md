# connect_tester.js


Testing connection of clientside application.

Sometimes you need to know if your user has slow connection and you want to suggest
gracefully degraded version of your app. ``connect_tester.js`` downloads a file
from server once in a while to allw you to determine how long did it take to make assumptions
on how slow it is.


# Usage


Create tester:
```js
var tester = new ConnectTester();
```

Set image url for testing, a callback for processing test results and run:
```js
tester.test('xxx.png').onChange(cb).run();
```

You can specify the timeout in milliseconds for the permanent checking:
```js
tester.test('xxx.png').every(40000).onChange(cb).run();
```

Enabling debug mode:
```js
tester.test('xxx.png').every(40000).onChange(cb).debug().run();
```

Сallback for processing test takes a delay getting the picture in milliseconds.
Based on it, you can calculate the download bandwidth:
```js
function(duration){
    var kbps = (image_size_in_bytes * 8) / (duration / 1000) / 1024;
}
```


# Full example


```js
(new ConnectTester)
    .test('xxx.png')
    .every(40000)
    .debug()
    .run()
    .onChange(function(duration){
        var kbps = (image_size_in_bytes * 8) / (duration / 1000) / 1024;
        // ...
    });
```
