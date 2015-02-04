var self = require('sdk/self');
var { ToggleButton } = require('sdk/ui/button/toggle');
var panels = require('sdk/panel');
var pwd = require('sdk/passwords');

var button = ToggleButton({
    id: "ssopwd-button",
    label: "Change SSO Password",
    icon: {
        "16": "./icon-16.png",
        "32": "./icon-32.png",
        "64": "./icon-64.png"
    },
    onChange: handleChange
});

var panel = panels.Panel({
    contentURL: self.data.url("panel.html"),
    contentScriptFile: self.data.url("script.js"),
    onHide: handleHide,
    height: 250
});

function handleChange(state) {
    if (state.checked) {
        panel.show({
            position: button
        });
    }
}

panel.port.on('cancel', function () {
    panel.hide();
});

function handleHide() {
    panel.port.emit('reset', 1);
    button.state('window', {checked: false});
}

panel.port.on('update', function (data) {
    pwd.search({
        username: data.username,
        onComplete: function (credentials) {
            var num = 0;
            var re = new RegExp('[/.]' + data.domain + '\\b', 'i');
            credentials.forEach(function (credential) {
                if (re.test(credential.url)) {
                    credential.onComplete = function () {
                        credential.password = data.password;
                        credential.onComplete = function () {
                            panel.port.emit('credentials', ++num);
                        };
                        pwd.store(credential);
                    };
                    pwd.remove(credential);
                }
            });
            panel.port.emit('complete', num);
        }
    });
});
