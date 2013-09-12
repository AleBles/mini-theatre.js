var configure = (function (cfg, object) {
    "use strict";

    var config = {
            div: "configure"
        },
        obj = object,
        functions = {},
        numbers = {};

    for(var key in config) {
        if(config.hasOwnProperty(key) && cfg.hasOwnProperty(key)) {
            config[key] = cfg[key];
        }
    }

    for(var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            switch (typeof obj[prop]) {
                case "number":
                    numbers[prop] = obj[prop];
                    break;
                case "function":
                    functions[prop] = obj[prop];
                    break;
            }
        }
    }

    return {
        init: function () {
            var parent = document.getElementById(config.div),
                title = document.createElement('div'),
                prop = null;

            title.innerHTML = 'Configure.js';
            parent.appendChild(title);

            for (prop in functions) {
                var functionChange = document.createElement('div');
                functionChange.innerHTML = prop + ': ';
                var button = document.createElement('button');
                button.onclick = obj[prop].bind(obj);
                button.innerHTML = prop;
                functionChange.appendChild(button);
                parent.appendChild(functionChange);
            }

            for (prop in numbers) {
                var numberChange = document.createElement('div');
                numberChange.innerHTML = prop + ': ';
                var numberInput = document.createElement('input');
                numberInput.setAttribute('type', 'text');
                numberInput.setAttribute('id', prop);
                numberInput.setAttribute('value', obj[prop]);
                numberInput.onkeyup = function() {
                    var thingy = document.getElementById(prop);
                    obj[prop] = thingy.value;
                };
                numberChange.appendChild(numberInput);
                parent.appendChild(numberChange);
            }
        }
    };
});
