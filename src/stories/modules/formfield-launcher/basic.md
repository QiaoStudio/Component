# Formfield launcher

### Usage

### No tab and button on the bottom
```js
    <div class="dp-field__launcher">
      <dp-tabs :is-tab-visible="false">
        <dp-tab-item label="tab 1">
          <div class="dp-field__group-wrap">
            <div class="dp-field__col">put something</div>
            <div class="dp-field__col hidden__mobile">put something</div>
            <div class="dp-field__col">put something</div>
          </div>
        </dp-tab-item>
      </dp-tabs>
      <div class="dp-button__cont">
        <dp-button class="dp-button--primary"><i class="fa fa-search"></i>SEARCH</dp-button>
      </div>
    </div>
```
### There are tabs and button on the right
```js
    <div class="dp-field__launcher">
      <dp-tabs>
        <dp-tab-item label="Single trip plan">
          <div class="dp-field__group-wrap">
            <div class="dp-field__col">put something</div>
            <div class="dp-field__col hidden__mobile">put something</div>
            <div class="dp-field__col">put something</div>
            <div class="dp-button__cont hidden__mobile">
              <dp-button class="dp-button--primary"><i class="fa fa-search"></i>SEARCH</dp-button>
            </div>
          </div>
        </dp-tab-item>
        <dp-tab-item label="Annual plan">
          <div class="dp-field__group-wrap">
            <div class="dp-field__col">put something</div>
            <div class="dp-field__col">put something</div>
            <div class="dp-field__col hidden__mobile">put something</div>
            <div class="dp-button__cont hidden__mobile">
              <dp-button class="dp-button--primary"><i class="fa fa-search"></i>SEARCH</dp-button>
            </div>
          </div>
        </dp-tab-item>
      </dp-tabs>
      <div class="dp-button__cont visible__mobile">
        <dp-button class="dp-button--primary"><i class="fa fa-search"></i>SEARCH</dp-button>
      </div>
    </div>
```
### No tabs and button on the right
```js
    <div class="dp-field__launcher">
      <dp-tabs :is-tab-visible="false">
        <dp-tab-item label="Single trip plan">
          <div class="dp-field__group-wrap clearfix">
            <div class="dp-field__col hidden__mobile">put something</div>
            <div class="dp-field__col">put something</div>
            <div class="dp-field__col">put something</div>
            <div class="dp-field__col hidden__mobile">put something</div>
            <div class="dp-button__cont hidden__mobile">
              <dp-button class="dp-button--primary"><i class="fa fa-search"></i>SEARCH</dp-button>
            </div>
          </div>
        </dp-tab-item>
      </dp-tabs>
      <div class="dp-button__cont visible__mobile">
        <dp-button class="dp-button--primary"><i class="fa fa-search"></i>SEARCH</dp-button>
      </div>
    </div>
```
### Preview
<!-- STORY -->
### Properties

| className | isRequired | description |
|---------- |------------ | ------------ |
| dp-field__launcher  |      √     |       Wrapped form container     |
| dp-field__group-wrap  |      ×     |      An outer container that displays the columns of the field     |
| dp-field__col  |      ×     |      Show column of field     |
| dp-button__cont  |      ×     |      An outer container that display the button     |
| visible__desktop |      ×     |      Only show on desktop (css compiled into "display:block;")     |
| visible__tablet  |      ×     |      Only show on tablet     |
| visible__mobile  |      ×     |      Only show on mobile     |
| visible__desktop--inline-block |      ×     |      Only show on desktop (css compiled into "display:inline-block;")     |
| visible__tablet--inline-block  |      ×     |      Only show on tablet     |
| visible__mobile--inline-block  |      ×     |      Only show on mobile     |
| visible__desktop--inline |      ×     |      Only show on desktop (css compiled into "display:inline;")     |
| visible__tablet--inline  |      ×     |      Only show on tablet     |
| visible__mobile--inline  |      ×     |      Only show on mobile     |
| hidden__desktop |      ×     |      Only hidden on desktop     |
| hidden__tablet  |      ×     |      Only hidden on tablet     |
| hidden__mobile  |      ×     |      Only hidden on mobile     |
