# Panel

### Usage

#### Basic HTML

```HTML
<div class="dp-panel">
    <div class="panel__wrapper">
        <div class="panel__title text-center">
            <h3 class="dp-title">Panel title</h3>
        </div>
        <div class="panel__icon text-center">
            <img src="https://picsum.photos/g/40/40">
        </div>
        <div class="panel__image text-center panel__image--full-width" style="background-image: url(&quot;https://picsum.photos/696/400&quot;);"></div>
        <div class="panel__subtitle text-center">
            <span>Subtitle</span>
        </div>
        <div class="panel__maintitle text-center">
            <h4 class="dp-title">Main title</h4>
        </div>
        <div class="panel__announcement panel__announcement--center">
            <div class="dp-announcement dp-announcement--linked">
                <a href="http://google.com" target="_blank">
                    <span class="announcement__label announcement__label--red">
                        <small>New</small>
                    </span>
                    <span class="announcement__content">Get an awesome Thai Milk Tea!</span>
                </a>
            </div>
        </div>
        <div class="panel__body">
            <p>Swag letterpress dreamcatcher, lomo ennui chicharrones mumblecore pork belly slow-carb four loko hot chicken subway tile put a bird on it. Sustainable health goth readymade lomo knausgaard art party. Humblebrag skateboard cronut chillwave 3 wolf moon.</p>
        </div>
        <div class="panel__cta">
            <a class="dp-button dp-button--block dp-button--sm dp-button--ghost-secondary">
                <div>Select</div>
            </a>
        </div>
    </div>
</div>
```

### Preview
<!-- STORY -->

### Classes

| className | isRequired | description |
|---------- |------------ | ------------ |
| dp-panel  |      √     |       Wrapped panel container     |
| dp-panel__wrapper  |      √     |       Panel content container; It is either an anchor or a div wrapper     |
| dp-panel__title  |      *     |       Panel title     |
| dp-panel__icon  |      *     |       Panel partner icon     |
| dp-panel__image  |      *     |       Panel main image     |
| dp-panel__subtitle  |      *     |       Panel content subtitle     |
| dp-panel__maintitle  |      *     |       Panel content title     |
| dp-panel__announcement  |      *     |       Panel content announcement     |
| dp-panel__body  |      *     |       Panel content body     |
| dp-panel__cta  |      *     |       Panel content button(s)     |
