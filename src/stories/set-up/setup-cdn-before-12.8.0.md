# Set Up Design Com By CDN

import CSS

```html
<link href="http://gcloudcdn.xxxxxx.com/dp/fixed-version/css/app.css" rel="stylesheet">
```

import JavaScript

```html
<script src="http://gcloudcdn.xxxxxx.com/dp/fixed-version/js/vendor.js"></script>
```

```html
<script src="http://gcloudcdn.xxxxxx.com/dp/fixed-version/js/app.js"></script>
```

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <!-- import CSS -->
    <link href="http://gcloudcdn.xxxxxx.com/dp/fixed-version/css/vendors~app.css" rel="stylesheet">
    <link href="http://gcloudcdn.xxxxxx.com/dp/fixed-version/css/app.css" rel="stylesheet">
</head>
<body>
<div class="dp-com">
    <dp-currency-input :value="currency" @input="changeCurrency"></dp-currency-input>
</div>

<!-- For now we use extenal Vue as reference, will packaged into vendor in feature. -->
<!-- Please include this file in system instead of using CDN -->
<script src="https://cdn.jsdelivr.net/npm/vue@2.5.16/dist/vue.js"></script>
<script src="http://gcloudcdn.xxxxxx.com/dp/fixed-version/js/vendor.js"></script>
<!-- import JavaScript -->
<script src="http://gcloudcdn.xxxxxx.com/dp/fixed-version/js/app.js"></script>
<script>
    new Vue({
        el: '.dp-com',
        data() {
            return {
                currency: 2000
            }
        },
        methods: {
            changeCurrency(e) {
                this.currency = e
            }
        }
    })
  </script>
</body>
</html>

```
