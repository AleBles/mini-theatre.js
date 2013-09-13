var configure = (function (cfg, object) {
    "use strict";

    var config = {
            div: "configure"
        },
        obj = object,
        functions = {},
        numbers = {},
        booleans = {};

    for (var key in config) {
        if(config.hasOwnProperty(key) && cfg.hasOwnProperty(key)) {
            config[key] = cfg[key];
        }
    }

    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            switch (typeof obj[prop]) {
                case "number":
                    numbers[prop] = obj[prop];
                    break;
                case "function":
                    functions[prop] = obj[prop];
                    break;
                case "boolean":
                    booleans[prop] = obj[prop];
                    break;
            }
        }
    }

    return {
        init: function () {
            var parent = document.getElementById(config.div),
                title = document.createElement('div'),
                content = document.createElement('div'),
                prop = null;

            title.setAttribute('class', 'conf-title');
            content.setAttribute('class', 'conf-content');
            title.innerHTML = 'Configure.js';

            parent.appendChild(title);
            parent.appendChild(content);

            for (prop in functions) {
                var functionChange = document.createElement('div');
                functionChange.setAttribute('class', 'conf-function');
                functionChange.innerHTML = prop + ': ';
                var button = document.createElement('button');
                button.onclick = obj[prop].bind(obj);
                button.innerHTML = prop;
                functionChange.appendChild(button);
                content.appendChild(functionChange);
            }

            for (prop in numbers) {
                var numberChange = document.createElement('div');
                numberChange.setAttribute('class', 'conf-number');
                numberChange.innerHTML = prop + ': ';

                var numberInput = document.createElement('input');
                numberInput.setAttribute('type', 'range');
                numberInput.setAttribute('min', '0');
                numberInput.setAttribute('max', '1000');
                numberInput.setAttribute('step', '10');
                numberInput.setAttribute('id', prop);
                numberInput.setAttribute('value', obj[prop]);
                numberInput.onchange = function() {
                    var thingy = document.getElementById(prop);
                    var numval = document.getElementById('num_val_' + prop);
                    numval.innerHTML=thingy.value;
                    obj[prop] = thingy.value;
                };
                numberChange.appendChild(numberInput);
                content.appendChild(numberChange);
            }

            for (prop in booleans) {

            }
        }
    };
});
