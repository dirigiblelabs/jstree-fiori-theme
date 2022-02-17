# Fiori theme for jstree

## How to see demo

Start a local server. For example:

```sh
python3 -m http.server
```

Then go to http://localhost:8000/demo.html (replace the port with the correct one for other servers).

## Theme

The theme and it's resources are located in the fiori folder. It comes with two modes - "normal" and "compact". There is partial support for RTL.

You can use custom icons from SAP or Font Awesome but note that with this theme, they can only be a single color which will be the text color from the theme.

Include in your headers:
```html
<!-- SAP icons from Fundamental-styles -->
<link href="https://unpkg.com/fundamental-styles@0.21.1/dist/icon.css" rel="stylesheet" />
<!-- SAP theming. Replace 'sap_fiori_3' with 'sap_fiori_3_dark' for dark theme -->
<link href="https://unpkg.com/@sap-theming/theming-base-content@11.1.34/content/Base/baseLib/sap_fiori_3/css_variables.css" rel="stylesheet"/>
<!-- The jstree theme itself -->
<link rel="stylesheet" href="fiori/fiori.css" />
<!-- Font settings -->
<link rel="stylesheet" href="demo.css" />
```

Activate it:
```javascript
$('#jstree_demo').jstree({
    core: {
        themes: {
            name: "fiori",
            variant: "compact", // remove for normal
        }
    }
});
```

Activate RTL:
```html
<div id="jstree_demo" style="direction:rtl"></div>
```

Make it fill both width and height:
```html
<div id="jstree_demo" class="jstree-fiori--fill"></div>
```

Leave extra space after the last row for right clicking and activating the context menu:
```html
<div id="jstree_demo" class="jstree-fiori--context-menu"></div>
```

## Indicator plugin

The indicator jstree plugin can only be used with the provided jstree fiori theme, SAP 72 font, SAP icons, SAP Theming and "wholerow" plugin.

You can activate it by including the `indicator.plugin.js` file and then adding "indicator" in the `plugins` jstree configuration list.

In order for it to work, you must include `added`, `modified`, `deleted`, `untracked`, `conflict`, `renamed` or `submodule` booleans to the `state` object of every node that requires it.

In the case of a file/folder tree, you can also add `containsChanges` to the `state` object of every parent. That will create a colored dot next to the title, making it more easily visible that the folder contains changes. The only exception to this is the `submodule` indicator which is used to show the node type, so you shouldn't count it as a change.

Example:

```javascript
{
    text: "Project 1",
    type: "project",
    state: { containsChanges: true },
    children: [
        {
            text: "File 1",
            type: "file"
        },
        {
            text: "Folder 1",
            state: { containsChanges: true },
            type: "folder",
            children: [
                {
                    text: "File 2",
                    type: "file",
                    state: { added: true },
                },
            ],
        },
    ],
}
```

In cases where you add a new node, you must recursively find all parents and add "containsChanges: true" to the `state` object. Example functions that do that are `setParentStatus` and `checkChildrenForChanges` in the demo.js file.

By default, those are the indicator letters and their meaning:

* A - Added (A new file has been added to the repository)
* M - Modified (An existing file has been changed)
* D - Deleted (The file has been deleted but the change has not been committed to the repository yet)
* U - Untracked (The file is new or has been changed but has not been added to the repository yet)
* C - Conflict (There is a conflict in the file on repository pull/merge)
* R - Renamed (The file has been renamed, the change has been added to the repository but has not been committed)
* S - Submodule (Indicates a repository that exists inside another repository)

### Custom indicators

You can create your own custom indicators by passing your own custom function that will have control over each node.

Example:
```javascript
$('#jstree_demo').jstree({
    core: {...},
    plugins: ["indicator", ...],
    indicator: {
        rowIndicator: function(element, node) {
            // Custom stuff here
            // 'element' is the html node element
            // 'node' is the jstree node object
        }
    }
});
```