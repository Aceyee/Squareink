/**
 *  Name: canvas2.js
 *  Author: Zihan Ye
 *  Description: draw lines, circles, and poligons on canvas element
 */

/* get screen height and screen width*/
var screenWidth = $(window).width();
var screenHeight = $(window).height();

/* set stroke width for drawing */
var strokeWidth = 5;

/* get the svg element on block2*/
var svg2 = document.getElementById("svg2"); // get svg1 element

/* create new Chip class: chipMain*/
var chipMain = new Chip('chipMain', 0);

/* divide the width by 9 for drawing socket (circle) */
var division = 9;
var deltaChipMainX = chipMain.width / division;

/* create new Chip class: chipProject*/
var chipProject = new Chip('chipProject', 1);
// alert(chipProject.top);

/* method for drawing polygons on bottom side */
var drawBottomSide = {
    /* include three straght lines, use for loop to draw line, and shift X to draw next */
    draw: function () {
        var dash = screenHeight - chipProject.bottom - chipProject.border;
        var points = [screenWidth / 2 - deltaChipMainX, screenHeight,
        screenWidth / 2 - deltaChipMainX, chipProject.bottom + chipProject.border];
        for (var count = 0; count < 3; count++) {
            draw2Vertices(svg2, points, dash, 1);
            points = shiftPointsH(points, deltaChipMainX);
        }
    }
}

/* method for drawing polygons on top side */
var drawTopSide = {
    draw: function () {
        // alert(chipProject.top);
        var dash = chipProject.top - chipProject.border;
        var points = [screenWidth / 2 - deltaChipMainX, 0,
        screenWidth / 2 - deltaChipMainX, chipProject.top - chipProject.border];
        for (var count = 0; count < 3; count++) {
            draw2Vertices(svg2, points, dash, -1);
            points = shiftPointsH(points, deltaChipMainX);
        }
    }
}

drawBottomSide.draw();
drawTopSide.draw();