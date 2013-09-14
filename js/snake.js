Number.prototype.m = function (n) {
    return ((this % n) + n) % n;
};

var snake = (function () {
    var x = 20,
        y = 20,
        z = 20,
        vx = 0,
        vy = 0,
        length = 0,
        body = [],
        canvas,
        ctx,
        dir = mdir = 2,
        moves = [[-1, 0], [0, -1], [1, 0], [0, 1]],
        hit,
        timeout,
        speed = 150,
        mq = [];

    function move(e) {
        var evt  = e || (event || null),
            newDir = (evt.keyCode - 37);
        if ((newDir - dir) % 2 && newDir <= 3 && newDir >= 0) {
            dir = newDir;
            mq.push(newDir);
        }
    }

    function placeFood() {
        var fx = (Math.floor((Math.random() * (x - 1)) + 1) * z) + (z / 2),
            fy = (Math.floor((Math.random() * (y - 1)) + 1) * z) + (z / 2);

        while(ctx.getImageData(fx, fy, 1, 1).data[3] === 255) {
            fx = (Math.floor((Math.random() * (x - 1)) + 1) * z) + (z / 2),
            fy = (Math.floor((Math.random() * (y - 1)) + 1) * z) + (z / 2);
        };


        ctx.fillStyle = '#F00';
        ctx.beginPath();
        ctx.arc(fx, fy, z / 2 - 1, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = '#000';
    }

    return {
        get timeout () {
            return timeout;
        },
        get speed () {
            return speed;
        },
        set speed (value) {
            speed = value;
        },
        init: function () {
            var self = this;

            canvas = document.getElementById('stage');
            ctx = canvas.getContext('2d');
            ctx.font = '12px "PhatoneRegular"';
            ctx.textAlign = 'right';
            mq.push(dir);
            document.onkeydown = move;

            timeout = setTimeout(self.tick.bind(self), speed);

            placeFood();
        },
        reset: function () {
            body = [];
            dir = 2;
            length = 0;
            vx = 0;
            vy = 0;
            timeout = null;
            ctx.clearRect(0, 0, x * z, y * z);
            mq.push(dir);
        },
        tick: function () {
            var self = this,
                part,
                c,
                a;

            if (mq.length > 0) {
                mdir = mq.shift();
            }
            vx = (vx + moves[mdir][0]).m(x);
            vy = (vy + moves[mdir][1]).m(y);

            for (part in body) {
                if (body.hasOwnProperty(part) && body[part][0] === vx && body[part][1] === vy) {
                    clearInterval(timeout);
                    a = confirm(body.length + ' pts! play again?');
                    if (a) {
                        self.reset();
                        timeout = setTimeout(self.tick.bind(self), speed);
                        placeFood();
                    }
                    return;
                }
            }

            if (body.length > length) {
                c = body.shift();
                ctx.clearRect(x * c[0], 20 + y * c[1], z, z);
            }

            hit = ctx.getImageData((x * vx) + (z / 2), 20 + (y * vy) + (z / 2), 1, 1);
            if (hit.data[0] === 255) {
                length += 1;
                placeFood();
                ctx.clearRect(0, 0, z * x, z);
                ctx.fillText(length.toString(), x * z - x, y);
            }

            body.push([vx, vy]);
            ctx.fillRect(x * vx + 1, 20 + y * vy + 1, z - 2, z - 2);
            timeout = setTimeout(self.tick.bind(self), speed);
        },
        speak: function() {
            console.log('Speading at: ' + speed);
        }
    };
}());
