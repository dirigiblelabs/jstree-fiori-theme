let data = [
    {
        text: "Project 1",
        type: "project",
        li_attr: { git: true },
        children: [
            {
                text: "File 1",
                type: "file"
            },
            {
                text: "Folder 1",
                state: { submodule: true },
                type: "folder",
                children: [
                    {
                        text: "File 2",
                        type: "file"
                    },
                    {
                        text: "File 3",
                        type: "file"
                    },
                ],
            },
        ],
    },
    {
        text: "Project 2",
        type: "project",
        li_attr: { git: true },
        children: [
            {
                text: "File 4",
                state: { added: true },
                type: "file"
            },
            {
                text: "Folder 2",
                type: "folder",
                children: [
                    {
                        text: "File 5",
                        state: { modified: true },
                        type: "file",
                    },
                    {
                        text: "File 6",
                        state: { conflict: true },
                        type: "file",
                    },
                ],
            },
        ],
    },
    {
        text: "Project 3",
        type: "project",
        children: [
            {
                text: "File 7",
                type: "file"
            },
            {
                text: "Folder 3",
                type: "folder",
                children: [
                    {
                        text: "File 8",
                        state: { deleted: true },
                        type: "file"
                    },
                    {
                        text: "File 9",
                        state: { renamed: true },
                        type: "file"
                    },
                    {
                        text: "File 10",
                        state: { untracked: true },
                        type: "file",
                    },
                ],
            },
            {
                text: "Folder 2",
                type: "folder",
                children: [
                    {
                        text: "File 80",
                        state: { deleted: true },
                        type: "file"
                    },
                    {
                        text: "File 8",
                        state: { deleted: true },
                        type: "file"
                    },
                    {
                        text: "File 9",
                        state: { renamed: true },
                        type: "file"
                    },
                    {
                        text: "File 7",
                        type: "file"
                    },
                    {
                        text: "File 10",
                        state: { untracked: true },
                        type: "file",
                    },
                ],
            },
        ],
    },
    {
        text: "Unknown file",
        type: "image-file"
    },
];

$('#jstree_demo').jstree({
    core: {
        themes: {
            name: "fiori",
            // variant: "compact",
        },
        data: data,
    },
    plugins: ["contextmenu", "wholerow", "dnd", "search", "checkbox", "types", "indicator"],
    types: {
        "default": {
            icon: "sap-icon--question-mark"
        },
        file: {
            icon: "jstree-file"
        },
        folder: {
            icon: "jstree-folder"
        },
        project: {
            icon: "jstree-project"
        },
    },
    contextmenu: {
        items: {
            "create": {
                "separator_before": false,
                "separator_after": true,
                "_disabled": false,
                "label": "New",
                "icon": "sap-icon--write-new-document",
                "submenu": {
                    "create_file": {
                        "label": "File",
                        "icon": "sap-icon--document"
                    },
                    "create_folder": {
                        "label": "Folder",
                        "icon": "sap-icon--folder-blank",
                    },
                }
            },
            "copy": {
                "separator_before": true,
                "label": "Copy",
                "icon": "sap-icon--copy"
            },
            "paste": {
                "_disabled": true,
                "separator_before": false,
                "label": "Paste",
                "icon": "sap-icon--paste"
            },
            "rename": {
                "separator_before": true,
                "separator_after": false,
                "_disabled": false,
                "label": "Rename",
                "shortcut": 113,
                "shortcut_label": "F2",
                "icon": "sap-icon--edit"
            },
            "remove": {
                "separator_before": false,
                "icon": false,
                "separator_after": false,
                "_disabled": false,
                "label": "Delete",
                "shortcut": 46,
                "shortcut_label": "Del",
                "icon": "sap-icon--delete"
            },
        }
    }
}).on('contextmenu', function (evt) {
    if (evt.target === evt.delegateTarget) {
        let inst = $.jstree.reference(evt.target);
        if (inst) {
            evt.preventDefault();
            $.vakata.context.show(evt.target, { 'x': evt.pageX, 'y': evt.pageY }, {
                "paste": {
                    "label": "Paste",
                    "icon": "sap-icon--paste"
                }
            });
            return false;
        }
    }
}.bind(this));