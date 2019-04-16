# Set Up Design Com By CDN

## CDN
Get and import the latest version of JavaScript and CSS in your page

```html
<!-- import CSS -->
<link href="//gcloudcdn.xxxxxx.com/dp/fixed-version/css/app.css" rel="stylesheet">
<!-- import Javascript -->
<script src="//gcloudcdn.xxxxxx.com/dp/fixed-version/js/vendor.js"></script>
<script src="//gcloudcdn.xxxxxx.com/dp/fixed-version/js/app.js"></script>
```
> We recommend our users to use HTTPS when using CDN.

## Hello world
if you are using CDN, a hello-world page is easy with design com.

```html
<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <!-- import CSS -->
  <link href="//gcloudcdn.xxxxxx.com/dp/fixed-version/css/app.css" rel="stylesheet">
</head>

<body>
  <div id="app">
    <dp-currency-input
      label="Hello world"
      :value="currency"
      @input="changeCurrency"></dp-currency-input>
  </div>

  <!-- import Vue before dp libraries -->
  <script src="https://cdn.jsdelivr.net/npm/vue"></script>
  <!-- import JavaScript -->
  <script src="//gcloudcdn.xxxxxx.com/dp/fixed-version/js/vendor.js"></script>
  <script src="//gcloudcdn.xxxxxx.com/dp/fixed-version/js/app.js"></script>
  <script>
    new Vue({
      el: '#app',
      data() {
        return {
          currency: 2000
        }
      },
      methods: {
        changeCurrency(value) {
          this.currency = value
        }
      }
    })
  </script>
</body>

</html>

```
