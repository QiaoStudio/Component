# Grid
Includes a responsive, mobile first fluid grid system that appropriately scales up to 12 columns as the device or viewport size increases. It includes predefined classes for easy layout options, as well as powerful mixins for generating more semantic layouts.

### Preview
<!-- STORY -->

## Introduction
Grid systems are used for creating page layouts through a series of rows and columns that house your content. Here's how the Design Com grid system works:

1. Rows must be placed within a `.container` (fixed-width) or `.container-fluid` (full-width) for proper alignment and padding.
2. Use rows to create horizontal groups of columns.
3. Content should be placed within columns, and only columns may be immediate children of rows.
4. Predefined grid classes like `.row` and `.col-xs-4` are available for quickly making grid layouts. Less mixins can also be used for more semantic layouts.
5. Columns create gutters (gaps between column content) via `padding`. That padding is offset in rows for the first and last column via negative margin on `.row`s.
6. The negative margin is why the examples below are outdented. It's so that content within grid columns is lined up with non-grid content.
7. Grid columns are created by specifying the number of twelve available columns you wish to span. For example, three equal columns would use three `.col-xs-4`.
8. If more than 12 columns are placed within a single row, each group of extra columns will, as one unit, wrap onto a new line.
9. Grid classes apply to devices with screen widths greater than or equal to the breakpoint sizes, and override grid classes targeted at smaller devices.
10. Therefore, e.g. applying any `.col-md-*` class to an element will not only affect its styling on medium devices but also on large devices if a `.col-lg-*` class is not present.

## SCSS mixins and variables

### Mixin
In addition to prebuilt grid classes for fast layouts.

```scss
@include xs {
  display: none;
}
```

| Name |  Screen Width |
|---------- | ------------ |
| xs |  less than or equal to 544px |
| sm |  greater than or equal to 768px |
| md |  greater than or equal to 992px |
| lg |  greater than or equal to 1200px |
| tabletAndMobile | less than 992px |
| onlyTablet | greater than or equal to 768px and less than 992px |

### Variables
Variables determine the number of columns, the gutter width, and the media query point at which to begin floating columns. We use these to generate the predefined grid classes documented above, as well as for the custom mixins listed below.

```scss
$grid-columns:              12;
$grid-gutter-width:         30px;
$container-sm:              (720px + $grid-gutter-width);
$container-md:              (940px + $grid-gutter-width);
$container-lg:              (1140px + $grid-gutter-width);
```

## Grid options

| Class prefix |  Screen Width |
|---------- | ------------ |
| .col-xs- |  less than or equal to 767px |
| .col-sm- |  greater than or equal to 768px |
| .col-md- |  greater than or equal to 992px |
| .col-lg- |  greater than or equal to 1200px |

## Examples

### Stacked-to-horizontal
Using a single set of `.col-md-*` grid classes, you can create a basic grid system that starts out stacked on mobile devices and tablet devices (the extra small to small range) before becoming horizontal on desktop (medium) devices. Place grid columns in any `.row`.

```html
<div class="row">
  <div class="col-md-1">.col-md-1</div>
  <div class="col-md-1">.col-md-1</div>
  <div class="col-md-1">.col-md-1</div>
  <div class="col-md-1">.col-md-1</div>
  <div class="col-md-1">.col-md-1</div>
  <div class="col-md-1">.col-md-1</div>
  <div class="col-md-1">.col-md-1</div>
  <div class="col-md-1">.col-md-1</div>
  <div class="col-md-1">.col-md-1</div>
  <div class="col-md-1">.col-md-1</div>
  <div class="col-md-1">.col-md-1</div>
  <div class="col-md-1">.col-md-1</div>
</div>
<div class="row">
  <div class="col-md-8">.col-md-8</div>
  <div class="col-md-4">.col-md-4</div>
</div>
<div class="row">
  <div class="col-md-4">.col-md-4</div>
  <div class="col-md-4">.col-md-4</div>
  <div class="col-md-4">.col-md-4</div>
</div>
<div class="row">
  <div class="col-md-6">.col-md-6</div>
  <div class="col-md-6">.col-md-6</div>
</div>
```

### Fluid container
Turn any fixed-width grid layout into a full-width layout by changing your outermost `.container` to `.container-fluid`.

```html
<div class="container-fluid">
  <div class="row">
    ...
  </div>
</div>
```

### Mobile and desktop
Build on the previous example by creating even more dynamic and powerful layouts with tablet `.col-sm-*` classes.

```html
<!-- Stack the columns on mobile by making one full-width and the other half-width -->
<div class="row">
  <div class="col-xs-12 col-md-8">.col-xs-12 .col-md-8</div>
  <div class="col-xs-6 col-md-4">.col-xs-6 .col-md-4</div>
</div>

<!-- Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop -->
<div class="row">
  <div class="col-xs-6 col-md-4">.col-xs-6 .col-md-4</div>
  <div class="col-xs-6 col-md-4">.col-xs-6 .col-md-4</div>
  <div class="col-xs-6 col-md-4">.col-xs-6 .col-md-4</div>
</div>

<!-- Columns are always 50% wide, on mobile and desktop -->
<div class="row">
  <div class="col-xs-6">.col-xs-6</div>
  <div class="col-xs-6">.col-xs-6</div>
</div>
```

### Mobile, tablet, desktop
Build on the previous example by creating even more dynamic and powerful layouts with tablet `.col-sm-*` classes.

```html
<div class="row">
  <div class="col-xs-12 col-sm-6 col-md-8">.col-xs-12 .col-sm-6 .col-md-8</div>
  <div class="col-xs-6 col-md-4">.col-xs-6 .col-md-4</div>
</div>
<div class="row">
  <div class="col-xs-6 col-sm-4">.col-xs-6 .col-sm-4</div>
  <div class="col-xs-6 col-sm-4">.col-xs-6 .col-sm-4</div>
  <!-- Optional: clear the XS cols if their content doesn't match in height -->
  <div class="clearfix visible-xs-block"></div>
  <div class="col-xs-6 col-sm-4">.col-xs-6 .col-sm-4</div>
</div>
```

### Column wrapping
If more than 12 columns are placed within a single row, each group of extra columns will, as one unit, wrap onto a new line.

```html
<div class="row">
  <div class="col-xs-9">.col-xs-9</div>
  <div class="col-xs-4">.col-xs-4<br>Since 9 + 4 = 13 &gt; 12, this 4-column-wide div gets wrapped onto a new line as one contiguous unit.</div>
  <div class="col-xs-6">.col-xs-6<br>Subsequent columns continue along the new line.</div>
</div>
```

### Offsetting columns
Move columns to the right using `.col-md-offset-*` classes. These classes increase the left margin of a column by * columns. For example, `.col-md-offset-4` moves `.col-md-4` over four columns.

```html
<div class="row">
  <div class="col-md-4">.col-md-4</div>
  <div class="col-md-4 col-md-offset-4">.col-md-4 .col-md-offset-4</div>
</div>
<div class="row">
  <div class="col-md-3 col-md-offset-3">.col-md-3 .col-md-offset-3</div>
  <div class="col-md-3 col-md-offset-3">.col-md-3 .col-md-offset-3</div>
</div>
<div class="row">
  <div class="col-md-6 col-md-offset-3">.col-md-6 .col-md-offset-3</div>
</div>
```

### Nesting columns
To nest your content with the default grid, add a new `.row` and set of `.col-sm-*` columns within an existing `.col-sm-*` column. Nested rows should include a set of columns that add up to 12 or fewer (it is not required that you use all 12 available columns).

```html
<div class="row">
  <div class="col-sm-9">
    Level 1: .col-sm-9
    <div class="row">
      <div class="col-xs-8 col-sm-6">
        Level 2: .col-xs-8 .col-sm-6
      </div>
      <div class="col-xs-4 col-sm-6">
        Level 2: .col-xs-4 .col-sm-6
      </div>
    </div>
  </div>
</div>
```

### Column ordering
Easily change the order of our built-in grid columns with `.col-md-push-*` and `.col-md-pull-*` modifier classes.

```html
<div class="row">
  <div class="col-md-9 col-md-push-3">.col-md-9 .col-md-push-3</div>
  <div class="col-md-3 col-md-pull-9">.col-md-3 .col-md-pull-9</div>
</div>
```
