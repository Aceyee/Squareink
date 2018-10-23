var mainPage = {
    onCreate: function () {
        var screenWidth = $(window).width();
        var screenHeight = $(window).height();

        var chipMainBorder = 50;
        var chipMainOffset = $('#chipMain').offset();
        var chipMainWidth = $('#chipMain').width();
        var chipMainHeight = $('#chipMain').height();

        var chipMainX1 = chipMainOffset.left;
        var chipMainX2 = screenWidth - chipMainOffset.left;
        var chipMainY1 = chipMainOffset.top + chipMainHeight + chipMainBorder;
        var chipMainY2 = chipMainY1;

        var svg = document.getElementsByTagName('svg')[0]; //Get svg element


        var c = document.getElementById("myCanvas");
        c.setAttribute('width', screenWidth);
        c.setAttribute('height', screenHeight);
        var ctx = c.getContext("2d");
        ctx.strokeStyle = "aqua";
        var strokeWidth = 5;


        // alert(c.width);


        var d = 20;
        /*Bottom Circuit*/

        var botX1 = chipMainX1 - d;
        var botY1 = screenHeight;

        var count = 9;
        var deltaChipMainX = chipMainWidth / count;
        var deltaX = screenWidth / count;
        var middlePointX = botX1;
        var middlePointY = botY1 - (botY1 - chipMainY1 - d) / 2;

        var svg = document.getElementsByTagName('svg')[0]; //Get svg element

        var points = [botX1, botY1,
            middlePointX, middlePointY,
            middlePointX + d, middlePointY - d,
            chipMainX1, chipMainY1];
        var lastIndex = points.length - 1;
        var dash = (botY1 - middlePointY) + (Math.sqrt(2) * d) + ((middlePointY - d) - chipMainY1);
        // alert(dash);

        var newElement;
        for (var i = 0; i < 3; i++) {
            newElement = document.createElementNS("http://www.w3.org/2000/svg", 'polyline'); //Create a path in SVG's namespace
            newElement.setAttribute("class", "draw");
            newElement.setAttribute("points", points);
            newElement.style.strokeDasharray = dash;
            newElement.style.strokeDashoffset = dash;
            svg.appendChild(newElement);

            ctx.beginPath();
            ctx.arc(points[lastIndex - 1], points[lastIndex] - strokeWidth, strokeWidth, 0, 2 * Math.PI);
            ctx.stroke();

            points = this.shiftPointsH(points, deltaChipMainX);
        }

        var botX2 = screenWidth - botX1;
        var botY2 = botY1;
        middlePointX = screenWidth - middlePointX;
        points = [botX2, botY2,
            middlePointX, middlePointY,
            middlePointX - d, middlePointY - d,
            chipMainX2, chipMainY2
        ];
        for (var i = 0; i < 3; i++) {
            newElement = document.createElementNS("http://www.w3.org/2000/svg", 'polyline'); //Create a path in SVG's namespace
            newElement.setAttribute("class", "draw");
            newElement.setAttribute("points", points);
            newElement.style.strokeDasharray = dash;
            newElement.style.strokeDashoffset = dash;
            svg.appendChild(newElement);

            ctx.beginPath();
            ctx.arc(points[lastIndex - 1], points[lastIndex] - strokeWidth, strokeWidth, 0, 2 * Math.PI);
            ctx.stroke();

            points = this.shiftPointsH(points, -1 * deltaChipMainX);
        }

        newElement.addEventListener("webkitAnimationEnd", this.myEndFunction);


        /*Top Circuit*/
        var topX1 = chipMainX1 - d;
        var topY1 = 0;
        var chipMainTopY1 = chipMainOffset.top - d;

        var middlePointX = topX1;
        var middlePointY = (chipMainOffset.top - d) / 2;
        // var middlePointY = (botY1 - chipMainY1 - d) / 2;


        var points = [topX1, topY1,
            middlePointX, middlePointY,
            middlePointX + d, middlePointY + d,
            chipMainX1, chipMainTopY1];
        // var dash = (botY1 - middlePointY)+(Math.sqrt(2)*d)+( (middlePointY - d)-chipMainY1);
        // alert(dash);

        var newElement;
        for (var i = 0; i < 3; i++) {
            newElement = document.createElementNS("http://www.w3.org/2000/svg", 'polyline'); //Create a path in SVG's namespace
            newElement.setAttribute("class", "draw");
            newElement.setAttribute("points", points);
            newElement.style.strokeDasharray = dash;
            newElement.style.strokeDashoffset = dash;
            svg.appendChild(newElement);

            ctx.beginPath();
            ctx.arc(points[lastIndex - 1], points[lastIndex] + strokeWidth, strokeWidth, 0, 2 * Math.PI);
            ctx.stroke();

            points = this.shiftPointsH(points, deltaChipMainX);
        }


        var topX2 = screenWidth - topX1;
        var topY2 = 0;
        var chipMainTopY2 = chipMainTopY1;

        var middlePointX = topX2;
        var middlePointY = (chipMainOffset.top - d) / 2;
        // var middlePointY = (botY1 - chipMainY1 - d) / 2;


        var points = [topX2, topY2,
            middlePointX, middlePointY,
            middlePointX - d, middlePointY + d,
            chipMainX2, chipMainTopY2];
        // var dash = (botY1 - middlePointY)+(Math.sqrt(2)*d)+( (middlePointY - d)-chipMainY1);
        // alert(dash);

        var newElement;
        for (var i = 0; i < 3; i++) {
            newElement = document.createElementNS("http://www.w3.org/2000/svg", 'polyline'); //Create a path in SVG's namespace
            newElement.setAttribute("class", "draw");
            newElement.setAttribute("points", points);
            newElement.style.strokeDasharray = dash;
            newElement.style.strokeDashoffset = dash;
            svg.appendChild(newElement);

            ctx.beginPath();
            ctx.arc(points[lastIndex - 1], points[lastIndex] + strokeWidth, strokeWidth, 0, 2 * Math.PI);
            ctx.stroke();

            points = this.shiftPointsH(points, -1 * deltaChipMainX);
        }
    },

    onCreate2: function () {
        /* super inefficient right now, could be improved */
        var c = document.getElementById('myCanvas'),
            ctx = c.getContext('2d'),
            cw = c.width = 400,
            ch = c.height = 300,
            rand = function (a, b) { return ~~((Math.random() * (b - a + 1)) + a); },
            dToR = function (degrees) {
                return degrees * (Math.PI / 180);
            },
            circle = {
                x: (cw / 2) + 5,
                y: (ch / 2) + 22,
                radius: 90,
                speed: 2,
                rotation: 0,
                angleStart: 270,
                angleEnd: 90,
                hue: 220,
                thickness: 18,
                blur: 25
            },
            particles = [],
            particleMax = 100,
            updateCircle = function () {
                if (circle.rotation < 360) {
                    circle.rotation += circle.speed;
                } else {
                    circle.rotation = 0;
                }
            },
            renderCircle = function () {
                ctx.save();
                ctx.translate(circle.x, circle.y);
                ctx.rotate(dToR(circle.rotation));
                ctx.beginPath();
                ctx.arc(0, 0, circle.radius, dToR(circle.angleStart), dToR(circle.angleEnd), true);
                ctx.lineWidth = circle.thickness;
                ctx.strokeStyle = gradient1;
                ctx.stroke();
                ctx.restore();
            },
            renderCircleBorder = function () {
                ctx.save();
                ctx.translate(circle.x, circle.y);
                ctx.rotate(dToR(circle.rotation));
                ctx.beginPath();
                ctx.arc(0, 0, circle.radius + (circle.thickness / 2), dToR(circle.angleStart), dToR(circle.angleEnd), true);
                ctx.lineWidth = 2;
                ctx.strokeStyle = gradient2;
                ctx.stroke();
                ctx.restore();
            },
            renderCircleFlare = function () {
                ctx.save();
                ctx.translate(circle.x, circle.y);
                ctx.rotate(dToR(circle.rotation + 185));
                ctx.scale(1, 1);
                ctx.beginPath();
                ctx.arc(0, circle.radius, 30, 0, Math.PI * 2, false);
                ctx.closePath();
                var gradient3 = ctx.createRadialGradient(0, circle.radius, 0, 0, circle.radius, 30);
                gradient3.addColorStop(0, 'hsla(330, 50%, 50%, .35)');
                gradient3.addColorStop(1, 'hsla(330, 50%, 50%, 0)');
                ctx.fillStyle = gradient3;
                ctx.fill();
                ctx.restore();
            },
            renderCircleFlare2 = function () {
                ctx.save();
                ctx.translate(circle.x, circle.y);
                ctx.rotate(dToR(circle.rotation + 165));
                ctx.scale(1.5, 1);
                ctx.beginPath();
                ctx.arc(0, circle.radius, 25, 0, Math.PI * 2, false);
                ctx.closePath();
                var gradient4 = ctx.createRadialGradient(0, circle.radius, 0, 0, circle.radius, 25);
                gradient4.addColorStop(0, 'hsla(30, 100%, 50%, .2)');
                gradient4.addColorStop(1, 'hsla(30, 100%, 50%, 0)');
                ctx.fillStyle = gradient4;
                ctx.fill();
                ctx.restore();
            },
            createParticles = function () {
                if (particles.length < particleMax) {
                    particles.push({
                        x: (circle.x + circle.radius * Math.cos(dToR(circle.rotation - 85))) + (rand(0, circle.thickness * 2) - circle.thickness),
                        y: (circle.y + circle.radius * Math.sin(dToR(circle.rotation - 85))) + (rand(0, circle.thickness * 2) - circle.thickness),
                        vx: (rand(0, 100) - 50) / 1000,
                        vy: (rand(0, 100) - 50) / 1000,
                        radius: rand(1, 6) / 2,
                        alpha: rand(10, 20) / 100
                    });
                }
            },
            updateParticles = function () {
                var i = particles.length;
                while (i--) {
                    var p = particles[i];
                    p.vx += (rand(0, 100) - 50) / 750;
                    p.vy += (rand(0, 100) - 50) / 750;
                    p.x += p.vx;
                    p.y += p.vy;
                    p.alpha -= .01;

                    if (p.alpha < .02) {
                        particles.splice(i, 1)
                    }
                }
            },
            renderParticles = function () {
                var i = particles.length;
                while (i--) {
                    var p = particles[i];
                    ctx.beginPath();
                    ctx.fillRect(p.x, p.y, p.radius, p.radius);
                    ctx.closePath();
                    ctx.fillStyle = 'hsla(0, 0%, 100%, ' + p.alpha + ')';
                }
            },
            clear = function () {
                ctx.globalCompositeOperation = 'destination-out';
                ctx.fillStyle = 'rgba(0, 0, 0, .1)';
                ctx.fillRect(0, 0, cw, ch);
                ctx.globalCompositeOperation = 'lighter';
            }
        loop = function () {
            clear();
            updateCircle();
            renderCircle();
            renderCircleBorder();
            renderCircleFlare();
            renderCircleFlare2();
            createParticles();
            updateParticles();
            renderParticles();
        }

        /* Append Canvas */
        //document.body.appendChild(c);

        /* Set Constant Properties */
        ctx.shadowBlur = circle.blur;
        ctx.shadowColor = 'hsla(' + circle.hue + ', 80%, 60%, 1)';
        ctx.lineCap = 'round'

        var gradient1 = ctx.createLinearGradient(0, -circle.radius, 0, circle.radius);
        gradient1.addColorStop(0, 'hsla(' + circle.hue + ', 60%, 50%, .25)');
        gradient1.addColorStop(1, 'hsla(' + circle.hue + ', 60%, 50%, 0)');

        var gradient2 = ctx.createLinearGradient(0, -circle.radius, 0, circle.radius);
        gradient2.addColorStop(0, 'hsla(' + circle.hue + ', 100%, 50%, 0)');
        gradient2.addColorStop(.1, 'hsla(' + circle.hue + ', 100%, 100%, .7)');
        gradient2.addColorStop(1, 'hsla(' + circle.hue + ', 100%, 50%, 0)');

        /* Loop It, Loop It Good */
        setInterval(loop, 16);

    },

    myEndFunction: function () {
        // alert("end");
    },

    shiftPointsH: function (points, deltaChipMainX) {
        for (var i = 0; i < points.length; i++) {
            if (i % 2 == 0) {
                points[i] += deltaChipMainX;
            }
        }
        return points;
    }
}