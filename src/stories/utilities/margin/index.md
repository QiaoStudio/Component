# Margin
Adjust whitespace by applying horizontal and vertical margin helpers

### Preview
<!-- STORY -->

### Usage
Add `dp-margin-[POSITION]-[SIZE]-[THICKNESS]`, e.g `dp-margin-left-lg-thin`

### Available Positions
You can use `top`, `right`, `bottom`, `left` or `x` for both left, right, `y` for both top, bottom and `all` for all sides

### Available Sizes
You can use `xs`, `sm`, `md`, `lg` and `xl`

| `xs` size | pixel value |
| --------- | ----------- |
| xs (thin) | 2px         |
| xs        | 4px         |
| xs (fat)  | 6px         |

| `sm` size | pixel value |
| --------- | ----------- |
| sm (thin) | 8px         |
| sm        | 12px        |
| sm (fat)  | 16px        |

| `md` size | pixel value |
| --------- | ----------- |
| md (thin) | 20px        |
| md        | 24px        |
| md fat    | 32px        |

| `lg` size | pixel value |
| --------- | ----------- |
| lg (thin) | 40px        |
| lg        | 60px        |
| lg (fat)  | 80px        |

| `xl` size | pixel value |
| --------- | ----------- |
| xl (thin) | 120px       |
| xl        | 160px       |
| xl (fat)  | 200px       |

### Available Classes

| className                        | isRequired | description             |
| -------------------------------- | ---------- | ----------------------- |
| dp-margin-[POSITION]-[SIZE]-thin | ×          | Thin style for margin   |
| dp-margin-[POSITION]-[SIZE]      | ×          | Base style for margin   |
| dp-margin-[POSITION]-[SIZE]-fat  | ×          | Fat style for margin    |
| dp-margin-[POSITION]-none        | ×          | Force zero margin style |

***NOTE***: [POSITION] and [SIZE] is referenced to **Available Positions** and **Available Sizes**. For example: `dp-margin-top-md-thin`, `dp-margin-x-md`


### Breakpoint

| className                                                | isRequired | description                       |
| -------------------------------------------------------- | ---------- | --------------------------------- |
| dp-margin-[POSITION]-[SIZE]--only-tablet                 | x          | only apply for tablet             |
| dp-margin-[POSITION]-[SIZE]--only-mobile-and-tablet      | x          | only apply for mobile and tablet  |
| dp-margin-[POSITION]-[SIZE]--only-tablet-up              | x          | only apply for tablet and larger  |
| dp-margin-[POSITION]-[SIZE]--only-desktop                | x          | only apply for desktop            |
| dp-margin-[POSITION]-[SIZE]--only-desktop-up             | x          | only apply for desktop and larger |
| dp-margin-[POSITION]-[SIZE]-thin--only-tablet            | x          | only apply for tablet             |
| dp-margin-[POSITION]-[SIZE]-thin--only-mobile-and-tablet | x          | only apply for mobile and tablet  |
| dp-margin-[POSITION]-[SIZE]-thin--only-tablet-up         | x          | only apply for tablet and larger  |
| dp-margin-[POSITION]-[SIZE]-thin--only-desktop           | x          | only apply for desktop            |
| dp-margin-[POSITION]-[SIZE]-thin--only-desktop-up        | x          | only apply for desktop and larger |
| dp-margin-[POSITION]-[SIZE]-fat--only-tablet             | x          | only apply for tablet             |
| dp-margin-[POSITION]-[SIZE]-fat--only-mobile-and-tablet  | x          | only apply for mobile and tablet  |
| dp-margin-[POSITION]-[SIZE]-fat--only-tablet-up          | x          | only apply for tablet and larger  |
| dp-margin-[POSITION]-[SIZE]-fat--only-desktop            | x          | only apply for desktop            |
| dp-margin-[POSITION]-[SIZE]-fat--only-desktop-up         | x          | only apply for desktop and larger |

***NOTE***: [POSITION] and [SIZE] is referenced to **Available Positions** and **Available Sizes**.
For example: `dp-margin-top-md-thin--only-tablet`, `dp-margin-x-md--only-mobile-and-tablet`
