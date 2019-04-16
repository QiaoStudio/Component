# SCSS Usage

### File Structure
  We have exposed its scss file in assets directory, user can access it through npm package. And each component has it's own scss file in corresponding directory.
  Each scss file is named after corresponding Vue file directory name. For example, Vue file ```src/components/elements/promotion/promotion.vue```, SCSS file ```src/assets/css/elements/promotion.scss```.

```
your-project/
├── scss
│   └── custom.scss
└── node_modules/
    └── @xxxxxx
         └── some-component
             └── src
                 └── assets
                     └── css
                         └── base // Default style of Design Com
                         └── demo
                         └── elements // Element components style
                         └── globals // Global components style
                         └── modules // Module components style
                         └── settings // Variables essential for whole Design Com project
                         │   └── mixins // Utility, Component & etc. mixins
                         │   └── themes // Component theme custom variables
                         │   └── animations // Com custom animations
                         │   └── colors // Color variables
                         │   └── fonts // Font family & Font sizes variables
                         │   └── functions // ()
                         │   └── responsives // Grid, Responsive variables
                         │   └── variables // Global variables
                         └── utilities // Utility classes
                         │   └── alignment // Assist with general alignment problems
                         │   └── animation // Utility classes for animation within Com
                         │   └── border // Adjust border style by applying border helpers
                         │   └── box // A box theme applies spacing, a border, and rounded corners to areas of content
                         │   └── float // To pull an element out of the document’s normal flow and to align it with the left or right side of the container
                         │   └── grid // Classes to adjust column, row and container, Grid System based from Bootstrap 3.4
                         │   └── layout // Utility classes will help you achieve layouts found within Com
                         │   └── margin // Adjust whitespace by applying horizontal and vertical margin helpers
                         │   └── padding // Adjust whitespace by applying horizontal and vertical padding helpers
                         │   └── text // For consistent typography throughout the application, we created text helper classes for headings and body text
                         │   └── theme // Themes apply a set of color styles to an area
                         │   └── truncation // Utility classes for text truncation
                         │   └── visibility // Specify the visibility of elements by showing and hiding
                         └── com.scss // Entry file include default style
```

### Importing
Before using DesignCom components, please make sure you import ```com.scss```first. ```com.scss``` includes some basic styles necessary for use DesignCom variables.

#### Usage
include all base styles of some-component and some element styles
```
// custom.scss
@import "./../node_modules/@somecomponent/some-component/src/assets/css/app.scss"; //import base style
@import "./../node_modules/@somecomponent/some-component/src/assets/css/elements/badge"; //import element style
```

partly import styles of some-component
```
// custom.scss
@import "./../node_modules/@somecomponent/some-component/src/assets/css/settings/colors"; //import color variable
@import "./../node_modules/@somecomponent/some-component/src/assets/css/settings/fonts"; //import font variable
@import "./../node_modules/@somecomponent/some-component/src/assets/css/settings/mixins"; //import mixins
@import "./../node_modules/@somecomponent/some-component/src/assets/css/elements/badge"; //import element badge style
```

### Color Variables
Basic Color variables were defined in color.scss. We have set two layers of color variables, basic layer to define color value , second layer to add reference of basic color value.You can find all color variables in ```node_modules/@somecomponent/some-component/src/assets/css/settings/colors```

#### Colors
<details>
  <summary>Color Variables</summary>

```
$color-text-black-1: #000000;
$color-text-black-2: #181f22;
$color-text-white-1: #ffffff;
$color-text-orange-1: #f5b068;
$color-text-orange-5: #d58600;
$color-text-gray-3: #dddddd;
$color-text-gray-5: #93a4ac;
$color-text-gray-6: #627279;
$color-text-gray-7: #b6bdb9;
$color-text-blue-1: #227fed;
$color-text-blue-2: #296fc1;
$color-text-red-1: #f1485e;
$color-text-green-1: #00b84b;
$color-text-green-2: #0c9444;

/**
  * Border Colors
  */
$color-border-gray-2: #f1f3f4;
$color-border-gray-3: #dddddd;
$color-border-gray-4: #c4d0d5;
$color-border-gray-5: #93a4ac;
$color-border-gray-6: #627279;
$color-border-gray-7: #b6bdb9;
$color-border-black-1: #000000;
$color-border-black-2: #181f22;
$color-border-white-1: #ffffff;
$color-border-green-1: #00b84b;
$color-border-green-2: #0c9444;
$color-border-blue-1: #227fed;
$color-border-blue-2: #296fc1;
$color-border-red-1: #f1485e;
/**
  * Background Colors
  */
$color-background-gray-1: #f7f8f9;
$color-background-gray-2: #f1f3f4;
$color-background-gray-3: #dddddd;
$color-background-gray-5: #93a4ac;
$color-background-gray-6: #627279;
$color-background-gray-7: #b6bdb9;
$color-background-white-1: #ffffff;
$color-background-green-1: #00b84b;
$color-background-green-2: #0c9444;
$color-background-green-3: #ebf7e5;
$color-background-blue-1: #227fed;
$color-background-blue-2: #296fc1;
$color-background-orange-1: #f5b068;
$color-background-orange-3: #ffe6b3;
$color-background-red-1: #f1485e;
$color-background-red-3: #fdecee;
$color-background-black-1: #000000;
$color-background-black-2: #181f22;
$color-background-black-3: #2f3639;
/**
  * Box shadow Colors
  */
$color-box-shadow-black-1: #000000;
$color-box-shadow-green-1: #00b84b;
$color-box-shadow-white-1: #ffffff;
/**
  * Disable colors
  */
$color-background-gray-disabled: #b6bdb9;
$color-border-gray-disabled: #b6bdb9;
$color-text-gray-disabled: #b6bdb9;
```

</details>


#### Usage
```
// custom.scss
@import "./../node_modules/@somecomponent/some-component/src/assets/css/settings/colors"; //import color variable
.text {
    color: $color-text-gray-3;
    border: $color-border-black-2;
    background: $color-background-black-2;
}
```

### Mixins
We have exposed many mixins , you can refer to ```../node_modules/@somecomponent/some-component/src/assets/css/settings/mixins/style``` for more details

#### Detail
clearfix: Quickly and easily clear floated content within a container by include a clearfix mixin
```
@mixin clearfix() {...}
```
truncate: Easily truncate text with expect height and lines, and add ellipsis in the end of content
```
@mixin truncate($max-height, $lines: 2) {...}
```

#### Usage
```
//custom.scss
@import '../node_modules/@somecomponent/some-component/src/assets/css/settings/mixins/truncations';
.dp-title {
    @include truncate(40px, 3);
}
```

### BreakPoints
You can also use BreakPoint of DesignCom to keep mobile and desktop style align with DesignCom components.
For now we provide several break points.

#### Detail

When you want to use breakpoint as mixins please refer to ```../node_modules/@somecomponent/some-component/src/assets/css/settings/mixins/responsives```

```
@mixin xs {...} //mobile  (< 768px)
@mixin sm {...} //tablet and desktop  (>= 768px)
@mixin md {...} //desktop and large desktop (>= 992px)
@mixin lg {...} //lg (>=1200px)
@mixin tabletAndMobile {...} //lg (<992px)
```

#### Usage
```
//custom.scss
//Before you are using break point mixins , please make sure you have imported `responsives` first
@import './../node_modules/@somecomponent/some-component/src/assets/css/settings/responsives';
@import './../node_modules/@somecomponent/some-component/src/assets/css/settings/mixins/responsives';
@include xs {
    .dp-title {
        font-size: 16px;
    }
}
```

### Support for TH, HK and VN custom fonts
Always make sure the component support other custom fonts.

#### Detail
`$theme-fonts` variable contains specific font-family and font-size adapted to the custom font.

```
.dp-component {
  font-family: $font-family-primary;
  font-size: $font-size-16;
  ...

  @include themify($themes-fonts) {
    font-family: themed("font-family-primary");
    font-size: themed("font-size-16");
  }
}
```
