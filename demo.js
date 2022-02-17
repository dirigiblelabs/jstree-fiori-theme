let data = [
    {
        text: "Project 1",
        type: "project",
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
        state: { opened: false },
        type: "gitProject",
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
];

function checkChildrenForChanges(children) {
    for (let i = 0; i < children.length; i++) {
        if (
            children[i].state && (
                children[i].state.added
                || children[i].state.modified
                || children[i].state.deleted
                || children[i].state.untracked
                || children[i].state.conflict
                || children[i].state.renamed
            )
        ) {
            return true;
        } else if (children[i].children) {
            if (checkChildrenForChanges(children[i].children)) {
                if (children[i].state) children[i].state.containsChanges = true;
                else children[i].state = { containsChanges: true };
                return true;
            }
        }
    }
    return false;
}

function setParentStatus(parents) {
    // Determines if a child object has been modified. If it has, it sets 'containsChanges' to true
    // 'containsChanges' is used by the indicator plugin.
    for (let i = 0; i < parents.length; i++) {
        if (parents[i].children) {
            if (checkChildrenForChanges(parents[i].children)) {
                if (parents[i].state) parents[i].state.containsChanges = true;
                else parents[i].state = { containsChanges: true };
            };
        }
    }
    return parents;
}

$('#jstree_demo').jstree({
    core: {
        themes: {
            name: "fiori",
            // variant: "compact",
        },
        data: setParentStatus(data),
    },
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
            icon: "sap-icon--folder"
        },
        gitProject: {
            icon: "jstree-git"
        }
    },
    plugins: ["contextmenu", "wholerow", "dnd", "search", "checkbox", "sort", "types", "indicator"],
    sort: function (firstNodeId, secondNodeId) {
        firstNode = this.get_node(firstNodeId);
        secondNode = this.get_node(secondNodeId);
        if (firstNode.type == secondNode.type) {
            if (firstNode.text.length === secondNode.text.length)
                return (firstNode.text < secondNode.text) ? false : true;
            else if (firstNode.text.length > secondNode.text.length)
                return (firstNode.text.substring(0, secondNode.text.length - 1) < secondNode.text) ? true : false;
            else return (firstNode.text < secondNode.text.substring(0, firstNode.text.length - 1)) ? true : false;
        }
        else return (firstNode.type === "folder") ? false : true;
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
                    "create_folder": {
                        "label": "Folder",
                        "icon": "sap-icon--folder-blank",
                    },
                    "create_file": {
                        "separator_after": true,
                        "label": "File",
                        "icon": "sap-icon--file"
                    },
                    "javascript": {
                        "separator_after": false,
                        "label": "Javascript CJS Service",
                        "icon": "sap-icon--source-code"
                    },
                    "javascript-esm": {
                        "separator_after": false,
                        "label": "Javascript ESM Service",
                        "icon": "sap-icon--source-code"
                    },
                    "edm": {
                        "separator_after": false,
                        "label": "Entity Data Model"
                    },
                    "bpmn": {
                        "separator_after": true,
                        "label": "Business Process Model"
                    },
                    "access": {
                        "label": "Access Constraints"
                    },
                    "cvsim": {
                        "label": "CSVIM file"
                    },
                    "schema": {
                        "label": "Database Schema Model"
                    },
                    "database-table": {
                        "label": "Database Table"
                    },
                    "database-view": {
                        "label": "Database View"
                    },
                    "extension": {
                        "label": "Extension"
                    },
                    "extensionpoint": {
                        "label": "Extension Point"
                    },
                    "form": {
                        "label": "Form Definition"
                    },
                    "html": {
                        "label": "HTML5 Page"
                    },
                    "listener": {
                        "label": "Message Listener"
                    },
                    "roles": {
                        "label": "Roles Definitions"
                    },
                    "job": {
                        "label": "Scheduled Job"
                    },
                    "websocket": {
                        "label": "Websocket"
                    }
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
            "publish": {
                "separator_before": true,
                "label": "Publish",
                "icon": "sap-icon--arrow-top"
            },
            "unpublish": {
                "separator_before": false,
                "label": "Unpublish",
                "icon": "sap-icon--arrow-bottom"
            },
            "generate": {
                "separator_before": true,
                "label": "Generate",
                "icon": "sap-icon--generate-shortcut"
            },
            "upload": {
                "separator_before": true,
                "label": "Upload",
                "icon": "sap-icon--upload-to-cloud"
            },
            "exportProject": {
                "separator_before": true,
                "label": "Export",
                "icon": "sap-icon--download-from-cloud"
            }
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