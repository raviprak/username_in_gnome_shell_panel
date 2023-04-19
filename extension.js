/*
    Add only the username in the gnome shell top panel.
    Trivial adaptation from https://extensions.gnome.org/extension/2633/user-id-in-top-panel/
    (c) fthx 2023
    License: GPL v3
*/

const { Clutter, GLib, GObject, St } = imports.gi;

const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;
const Util = imports.misc.util;


var UserIdMenu = GObject.registerClass(
class UserIdMenu extends PanelMenu.Button {
    _init() {
        super._init('UserIdMenu')
        this.box = new St.BoxLayout({style_class: 'panel-status-menu-box'});
        this.user_id = new St.Label({text: GLib.get_real_name(), y_align: Clutter.ActorAlign.CENTER, style_class: "user-label"});
        this.box.add_child(this.user_id);
        this.add_child(this.box);
    }
});

class Extension {
    constructor() {
    }

    enable() {
        this.user_id_indicator = new UserIdMenu();
        Main.panel.addToStatusArea('user-id-menu', this.user_id_indicator, 1);
        this.user_id_indicator.connect('button-release-event', (widget, event) => Util.trySpawnCommandLine("gnome-control-center user-accounts"));
    }

    disable() {
        this.user_id_indicator.destroy();
        this.user_id_indicator = null;
    }
}

function init() {
    return new Extension();
}
