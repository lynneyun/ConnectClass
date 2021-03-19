//from Shawn's example in NYU 'connect' class

var drawingData = [];

function setup() {
    createCanvas(400, 400);
    httpGet("/data", 'json', false, function(response) {
        console.log("get success!")
        console.log(response);
        fill(255, 0, 0);
        for (var i = 0; i < response.length; i++) {
            ellipse(response[i].x, response[i].y, 10, 10);
        }
    });

}

function draw() {
    //background(220);
    fill(0, 255, 0);
    ellipse(mouseX, mouseY, 10, 10);
    drawingData.push({ x: mouseX, y: mouseY });
}

function mousePressed() {
    // Send the data to the server
    // drawingData
    httpPost("/save", 'json', drawingData, function(result) {
        console.log("posted");
    });
}