var configure = (function (cfg, object) {
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
            };
        }
    }

    return {
        init: function () {
            var parent = document.getElementById(config.div),
                title = document.createElement('div');

            title.innerHTML = '<h4>Public properties</h4>';
            parent.appendChild(title);

            for (var prop in functions) {
                var button = document.createElement('button');
                button.onclick = function() {obj[prop]();};
                button.innerHTML = prop;
                parent.appendChild(button);
            }
        }
    };
});