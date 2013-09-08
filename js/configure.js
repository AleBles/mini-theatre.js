var configure = function (cfg, obj) {
    config = {
        div: "#configure"
    };

    for(var key in config) {
        if(config.hasOwnProperty(key) && cfg.hasOwnProperty(key)) {
            config[key] = cfg[key];
        }
    }

    for(var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            console.log(typeof obj[prop]);
        }
    }
};