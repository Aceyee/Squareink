/**
 *  Name: canvas3.js
 *  Author: Zihan Ye
 *  Description: draw lines, circles, and poligons on canvas element
 */

/* get screen height and screen width*/
var screenWidth = $(window).width();
var screenHeight = $(window).height();

/* set stroke width for drawing */
var strokeWidth = 5;

/* get the svg element on block2*/
var svg3 = document.getElementById("svg3"); // get svg1 element

/* create new Chip class: chipMain*/
var chipMain = new Chip('chipMain', 0);

/* divide the width by 9 for drawing socket (circle) */
var division = 9;
var deltaChipMainX = chipMain.width / division;

/* create new Chip class: chipMessage*/
var chipMessage = new Chip('chipMessage', 2);
// alert(chipMessage.top);

/* method for drawing polygons on bottom side */
var drawBottomSide = {
    /* include three straght lines, use for loop to draw line, and shift X to draw next */
    draw: function () {
        var dash = screenHeight - chipMessage.bottom - chipMessage.border;
        var points = [screenWidth / 2 - deltaChipMainX, screenHeight,
        screenWidth / 2 - deltaChipMainX, chipMessage.bottom + chipMessage.border];
        for (var count = 0; count < 3; count++) {
            draw2Vertices(svg3, points, dash, 1);
            points = shiftPointsH(points, deltaChipMainX);
        }
    }
}

/* method for drawing polygons on top side */
var drawTopSide = {
    draw: function () {
        // alert(chipMessage.top);
        var dash = chipMessage.top - chipMessage.border;
        var points = [screenWidth / 2 - deltaChipMainX, 0,
        screenWidth / 2 - deltaChipMainX, chipMessage.top - chipMessage.border];
        for (var count = 0; count < 3; count++) {
            draw2Vertices(svg3, points, dash, -1);
            points = shiftPointsH(points, deltaChipMainX);
        }
    }
}

drawBottomSide.draw();
drawTopSide.draw();