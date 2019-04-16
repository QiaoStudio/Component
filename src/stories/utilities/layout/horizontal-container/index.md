# Horizontal Container
Implement a horizontal layout

### Preview
<!-- STORY -->

### Usage
```HTML
<div class="dp-horizontal-container dp-horizontal-container--proximity">
  <div class="dp-horizontal-container__item">
      <div class="dp-panel dp-panel--linked">
          <div class="dp-panel__wrapper">
              <div class="dp-panel__image text-center" style="background-image: url(&quot;https://picsum.photos/696/400&quot;);"></div>
              <div class="dp-panel__maintitle text-center">
                  <h4 class="dp-title">City Cash Back Card</h4>
              </div>
              <div class="dp-panel__announcement text-center">
                  <div class="dp-announcement">
                      <span class="dp-label dp-announcement__label dp-label--red"><small> Offer</small></span>
                      <span class="dp-announcement__content">Get awesome Thai Milk</span>
                  </div>
              </div>
              <div class="dp-panel__body"></div>
              <div class="dp-panel__cta">
                  <a href="#" class="dp-button dp-button--block dp-button--sm dp-button--primary" target="_blank"><span>Apply Now</span></a>
              </div>
          </div>
      </div>
  </div>
  <div class="dp-horizontal-container__item">
      <div class="dp-panel dp-panel--linked">
          <div class="dp-panel__wrapper">
              <div class="dp-panel__image text-center" style="background-image: url(&quot;https://picsum.photos/696/400&quot;);"></div>
              <div class="dp-panel__maintitle text-center">
                  <h4 class="dp-title">City Cash Back Card</h4>
              </div>
              <div class="dp-panel__announcement text-center">
                  <div class="dp-announcement">
                      <span class="dp-label dp-announcement__label dp-label--red"><small> Offer</small></span>
                      <span class="dp-announcement__content">Get awesome Thai Milk</span>
                  </div>
              </div>
              <div class="dp-panel__body"></div>
              <div class="dp-panel__cta">
                  <a href="#" class="dp-button dp-button--block dp-button--sm dp-button--primary" target="_blank"><span>Apply Now</span></a>
              </div>
          </div>
      </div>
  </div>
  <!--
  ... more items
  -->
</div>
```

### Classes

| className                             | isRequired | description                                      |
| ------------------------------------- | ---------- | ------------------------------------------------ |
| dp-horizontal-container               | √          | Wrapped horizontal container                     |
| dp-horizontal-container__item         | √          | Wrapped horizontal container item                |
| dp-horizontal-container--proximity    | ×          | Set snap-type to proximity. Default is mandatory |
| dp-horizontal-container--align-center | ×          | Set snap-align to center. Default is end         |
