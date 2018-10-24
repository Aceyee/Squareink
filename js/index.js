var t = 1;
var breakpoints;
var strokeWidth = 5;
var screenWidth;
var screenHeight;
var ctx;
var detailPath;
var division = 25;

var drawBotLeft = function (svg, points, dash, deltaChipMainX, shiftDirection, moveCircleDirection) {
    var lastIndex = points.length - 1;
    for (var i = 0; i < 3; i++) {
        var newElement = document.createElementNS("http://www.w3.org/2000/svg", 'polyline'); //Create a path in SVG's namespace
        newElement.setAttribute("class", "draw");
        newElement.setAttribute("points", points);
        newElement.style.strokeDasharray = dash;
        newElement.style.strokeDashoffset = dash;
        svg.appendChild(newElement);

        newElement = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
        newElement.setAttribute("class", "socket");
        newElement.setAttribute("cx", points[lastIndex - 1]);
        newElement.setAttribute("cy", points[lastIndex] - moveCircleDirection * strokeWidth);
        newElement.setAttribute("r", strokeWidth);
        svg.appendChild(newElement);

        /*deprecated */
        // ctx.beginPath();
        // ctx.arc(points[lastIndex - 1], points[lastIndex] - moveCircleDirection*strokeWidth, strokeWidth, 0, 2 * Math.PI);
        // ctx.stroke();
        points = shiftPointsH(points, shiftDirection * deltaChipMainX);
    }
    // newElement.addEventListener("webkitAnimationEnd", this.myEndFunction);
}

var shiftPointsH = function (points, deltaChipMainX) {
    for (var i = 0; i < points.length; i++) {
        if (i % 2 == 0) {
            points[i] += deltaChipMainX;
        }
    }
    return points;
}

var calcWaypoints= function (vertices) {
    var waypoints = [];
    var end = false;
    for (var i = 0; i < vertices.length-2; i+=2) {
        var pt1X = vertices[i];
        var pt1Y = vertices[i+1];

        var pt2X = vertices[i+2];
        var pt2Y = vertices[i+3];

        var dx = pt2X- pt1X;
        var dy = pt2Y - pt1Y;

        for (var j = 0; j < division; j++) {
            var x = pt1X + dx * j / division;
            if(x<0){
                x=0;
                end=true;
            }
            waypoints.push(x);
            var y = pt1Y + dy * j / division;
            if(y<0){
                y=0;
                end=true;
            }
            waypoints.push(y);
            if(end){
                break;
            }
        
        }
        if(end){
            break;
        }
    }
    return (waypoints);
}

function Circle(x, y, dx, dy, radius, detailPath) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.detailPath = detailPath;
    this.index = 0;
    this.sequence;

    this.draw = function () {
        // var grd = ctx.createLinearGradient(75,50,5,90,60,100);
        var grd = ctx.createRadialGradient(this.x, this.y, this.radius / 2, this.x, this.y, this.radius);
        grd.addColorStop(0, 'hsla(180, 100%, 75%, 1)');
        grd.addColorStop(1, 'hsla(180, 100%, 75%, 0)');

        ctx.fillStyle = grd;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fill();

        var followRadius = this.radius-1;
        if(this.sequence.length>0){
            for(var i=0; i<this.sequence.length; i+=2){
                var grd2 = ctx.createRadialGradient(this.detailPath[this.sequence[i]], this.detailPath[this.sequence[i+1]], followRadius / 2,this.detailPath[this.sequence[i]], this.detailPath[this.sequence[i+1]], followRadius);
                grd2.addColorStop(0, 'hsla(180, 100%, 75%, 1)');
                grd2.addColorStop(1, 'hsla(180, 100%, 75%, 0)');

                ctx.fillStyle = grd2;
                ctx.arc(this.detailPath[this.sequence[i]],  this.detailPath[this.sequence[i+1]], followRadius, 0, Math.PI * 2, false);
                ctx.fill();
                followRadius -= 1;
            }
        }
            
        // ctx.lineTo(this.x-100, this.y+100);
    }

    this.update = function () {
        this.x = this.detailPath[this.index];
        this.y = this.detailPath[this.index+1];
        this.sequence = [];
        if(this.index<this.detailPath.length-2){
            for(var i=this.index-2; i>this.index-10; i-=2){
                if(i>=0 &&i<this.detailPath.length){
                    this.sequence.push(i);
                    this.sequence.push(i+1);
                }
            }
            this.draw();
            this.index+=2;
        }else{

        }
    }
}

var circle;
var animate = function(){
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, screenWidth, screenHeight);
    circle.update();
}

var createPath = function (startX, startY, directionH, directionV) {
    // alert(startX+" "+stratY);
    var points = [];
    // console.log(length);
    points.push(startX,startY);
    startCreatePath(points, startX, startY, directionH, directionV);
    points = reverse(points);
    return points;
}

var reverse = function(points){
    var reversePoints = [];
    for(var i=0; i<points.length-1; i+=2){
        var x = points[i];
        var y = points[i+1];
        reversePoints.unshift(y);
        reversePoints.unshift(x);
    }
    return reversePoints;
}

var startCreatePath = function (points, currX, currY, directionH, directionV) {
    var length = 50;
    var moveX = Math.random()>0.5 ? true:false;
    var moveY = Math.random()>0.5 ? true:false;
    var end = false;
    var zeroX=0;
    var zeroY=0;

    if(!moveX && !moveY){
        moveX=true;
        moveY=true;
    }

    if(moveX){
        var nextX = currX + directionH * length;
        if (nextX>0 && nextX<screenWidth) {
            currX = nextX;
        }else{
            if(directionH>0){
                zeroX = screenWidth - currX;
                currX = screenWidth;
            }else{
                zeroX = currX;  
                currX = 0;
            }
            end = true;
        }
    }

    if(moveY){
        var nextY = currY + directionV * length;
        if(nextY>0 && nextY<screenHeight){
            currY = nextY;
        }else{
            if(directionV>0){
                zeroY = screenHeight-currY;
                currY = screenHeight;
            }else{
                zeroY = currY;
                currY = 0;
            }
            end = true;
        }
    }

    
    if(moveX && moveY){
        if(zeroX>0){
            currY = currY + directionV* length - zeroX;
        }
    
        if(zeroY>0){
            currX = currX - directionH* length - zeroY;
        }
    }

    points.push(currX, currY);
    if(!end){
        startCreatePath(points, currX, currY, directionH, directionV);
    }
}

var mainPage = {
    onCreate: function () {
        screenWidth = $(window).width();
        screenHeight = $(window).height();
        var c = document.getElementById("myCanvas");
        c.setAttribute('width', screenWidth);
        c.setAttribute('height', screenHeight);
        ctx = c.getContext("2d");
        // ctx.strokeStyle = "aqua";

        this.drawTopDownLine();
        // this.drawTest(ctx);
        this.drawSideLine();
    },

    drawSideLine: function () {
        animate();
    },

    drawTopDownLine: function () {
        var chipMainBorder = 50;
        var chipMainOffset = $('#chipMain').offset();
        var chipMainWidth = $('#chipMain').width();
        var chipMainHeight = $('#chipMain').height();

        var chipMainX1 = chipMainOffset.left;
        var chipMainX2 = screenWidth - chipMainOffset.left;
        var chipMainY1 = chipMainOffset.top + chipMainHeight + chipMainBorder;
        var chipMainY2 = chipMainY1;

        var svg = document.getElementsByTagName('svg')[0]; //Get svg element

        var d = 20;
        var count = 9;

        /*Bottom Left Circuit*/
        var botX1 = chipMainX1 - d;
        var botY1 = screenHeight;

        var deltaChipMainX = chipMainWidth / count;
        var middlePointX = botX1;
        var middlePointY = botY1 - (botY1 - chipMainY1 - d) / 2;
        var dash = (botY1 - middlePointY) + (Math.sqrt(2) * d) + ((middlePointY - d) - chipMainY1);

        /*
        var points = [botX1, botY1,
            middlePointX, middlePointY,
            middlePointX + d, middlePointY - d,
            chipMainX1, chipMainY1];
        drawBotLeft(svg, points, dash, deltaChipMainX, 1, 1);*/

        /*Left Bottom Circuit */
        var LeftBotX = chipMainOffset.left - chipMainBorder;
        var LeftBotY = chipMainOffset.top + chipMainHeight;
        /*
        for (var i = 0; i < 3; i++) {
            var newElement = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
            newElement.setAttribute("class", "socket");
            newElement.setAttribute("cx", LeftBotX);
            newElement.setAttribute("cy", LeftBotY - deltaChipMainX * i);
            newElement.setAttribute("r", strokeWidth);
            svg.appendChild(newElement);
        }*/

        var pathPoints = createPath(LeftBotX, LeftBotY, -1, 1);
        
        detailPath = calcWaypoints(pathPoints);
        for(var i=0; i<detailPath.length; i++){
            // console.log(detailPath[i]);
        }
        circle = new Circle(0, 0, 1, 1, strokeWidth, detailPath);

        // for (var i = 0; i < pathPoints.length; i++) {
        //     // console.log(pathPoints[i]);
        // }
        /*
        var newElement = document.createElementNS("http://www.w3.org/2000/svg", 'polyline'); //Create a path in SVG's namespace
        newElement.setAttribute("class", "draw");
        newElement.setAttribute("points", pathPoints);
        // newElement.style.strokeDasharray = 1000;
        // newElement.style.strokeDashoffset = 1000;
        svg.appendChild(newElement);*/

        /*Bottom Right Circuit*/
        
        var botX2 = screenWidth - botX1;
        var botY2 = botY1;
        /*
        middlePointX = screenWidth - middlePointX;
        points = [botX2, botY2,
            middlePointX, middlePointY,
            middlePointX - d, middlePointY - d,
            chipMainX2, chipMainY2
        ];
        drawBotLeft(svg, points, dash, deltaChipMainX, -1, 1);
        */
        
        /* Right Bottom Circuit*/
        /*
        var RightBotX = screenWidth-LeftBotX;
        var RightBotY = LeftBotY;
        for (var i = 0; i < 3; i++) {
            var newElement = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
            newElement.setAttribute("class", "socket");
            newElement.setAttribute("cx", RightBotX);
            newElement.setAttribute("cy", RightBotY-deltaChipMainX*i);
            newElement.setAttribute("r", strokeWidth);
            svg.appendChild(newElement);
        }*/

        /*Top Left Circuit*/
        var topX1 = chipMainX1 - d;
        var topY1 = 0;
        var chipMainTopY1 = chipMainOffset.top - d;
        var middlePointX = topX1;
        var middlePointY = (chipMainOffset.top - d) / 2;

        var points = [topX1, topY1,
            middlePointX, middlePointY,
            middlePointX + d, middlePointY + d,
            chipMainX1, chipMainTopY1];

        drawBotLeft(svg, points, dash, deltaChipMainX, 1, -1);

        
        var LeftTopX = LeftBotX;
        var LeftTopY = screenHeight-LeftBotY;

        for (var i = 0; i < 3; i++) {
            var newElement = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
            newElement.setAttribute("class", "socket");
            newElement.setAttribute("cx", LeftTopX);
            newElement.setAttribute("cy", LeftTopY+deltaChipMainX*i);
            newElement.setAttribute("r", strokeWidth);
            svg.appendChild(newElement);
        }

        /*Top right Circuit*/
        var topX2 = screenWidth - topX1;
        var topY2 = 0;
        var chipMainTopY2 = chipMainTopY1;

        var middlePointX = topX2;
        var middlePointY = (chipMainOffset.top - d) / 2;

        var points = [topX2, topY2,
            middlePointX, middlePointY,
            middlePointX - d, middlePointY + d,
            chipMainX2, chipMainTopY2];

        drawBotLeft(svg, points, dash, deltaChipMainX, -1, -1);

        /*Right Top Circuit*/

        
        var RightTopX = screenWidth- LeftTopX;
        var RightTopY = LeftTopY;

        for (var i = 0; i < 3; i++) {
            var newElement = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
            newElement.setAttribute("class", "socket");
            newElement.setAttribute("cx", RightTopX);
            newElement.setAttribute("cy", RightTopY+deltaChipMainX*i);
            newElement.setAttribute("r", strokeWidth);
            svg.appendChild(newElement);
        }
    },

    calcWaypoints: function (vertices) {
        var waypoints = [];
        for (var i = 1; i < vertices.length; i++) {
            var pt0 = vertices[i - 1];
            var pt1 = vertices[i];
            var dx = pt1.x - pt0.x;
            var dy = pt1.y - pt0.y;
            for (var j = 0; j < 100; j++) {
                var x = pt0.x + dx * j / 100;
                var y = pt0.y + dy * j / 100;
                waypoints.push({
                    x: x,
                    y: y
                });
            }
        }
        return (waypoints);
    },

    myEndFunction: function () {
        // alert("end");
    },
}



