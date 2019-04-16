# Visibility
Specify the visibility of elements by showing and hiding

### Preview
<!-- STORY -->

### Available Classes
Use a single or combination of the available classes for toggling content across viewport breakpoints.

| className | Extra small devices (<768px) | Small devices (≥768px) | Medium devices (≥992px) | Large devices (≥1200px) |
| --------- | ---------------------------- | ---------------------- | ----------------------- | ----------------------- |
| visible-xs-* | Visible | Hidden | Hidden | Hidden |
| visible-sm-* | Hidden | Visible | Hidden | Hidden |
| visible-md-* | Hidden | Hidden | Visible | Hidden |
| visible-lg-* | Hidden | Hidden | Hidden | Visible |
| hidden-xs    | Hidden | Visible | Visible | Visible |
| hidden-sm    | Visible | Hidden | Visible | Visible |
| hidden-md    | Visible | Visible | Hidden | Visible |
| hidden-lg    | Visible | Visible | Visible | Hidden |

### Display
The `.visible-*-*` classes for each breakpoint come in three variations, one for each CSS display property value listed below.

| Group of classes | CSS display |
| ---------------- | ----------- |
| visible-*-flex	 | display: flex; |
| visible-*-block	 | display: block; |
| visible-*-inline | display: inline; |
| visible-*-inline-block | display: inline-block; |

So, for extra small (xs) screens for example, the available .visible-*-* classes are: .visible-xs-block, .visible-xs-inline, and .visible-xs-inline-block.
