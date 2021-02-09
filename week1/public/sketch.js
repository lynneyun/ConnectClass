// sketch code adapted from Dan Shiffman
// Code source #1 Object Oriented: https://editor.p5js.org/codingtrain/sketches/JDT5wrxVj
// Code source #2 L-System: https://editor.p5js.org/codingtrain/sketches/QmTx-Y_UP

var angle;
var axiom = "F";
var sentence = axiom;
var len = 100;
// var moveCount = 0;
var commands = [];
var rules = [];
var clickCount = 0;
var firstRule = "FF+[+F-F-F]-[-F+F+F]";

let status = false;

rules[0] = {
    a: "F",
    b: firstRule
}


function drawTree() {
    //background(15);
    stroke(255, 100);
    for (let command of commands) {
        command.jitter();
        command.run();
    }

}


function generate() {
    clickCount += 1;
    if (clickCount < 5) {
        commands = []
        len *= 0.5;
        var nextSentence = "";
        for (var i = 0; i < sentence.length; i++) {
            var current = sentence.charAt(i);
            var found = false;
            for (var j = 0; j < rules.length; j++) {
                if (current == rules[j].a) {
                    found = true;
                    nextSentence += rules[j].b;
                    break;
                }
            }
            if (!found) {
                nextSentence += current;
            }
        }
        sentence = nextSentence;
        // createP(sentence);

        for (var i = 0; i < sentence.length; i++) {
            var current = sentence.charAt(i);
            let newBranch = new Command(current, len, i);
            // console.log(newBranch);
            commands.push(newBranch);

        }
    }
}

function inputEvent() {
    firstRule = this.value();
    rules[0] = {
        a: "F",
        b: firstRule
    }
}

function showInfo() {
    console.log(status);
    if (status == true) {
        status = false;
    } else {
        status = true;
    }
}

function showInfoWindow() {
    if (status) {
        console.log('starting to draw!')
        noStroke();
        fill(255, 255, 255);
        let rectWidth = width / 2;
        let rectHeight = height / 2;
        rect(rectWidth / 2, rectHeight / 2, rectWidth, rectHeight, 20);
        let introText = 'This is a project created for Programming A-Z taught by Dan Shiffman @ITP. \n\nMany thanks to Dan and my generous classmates!\n\nCheers, Lynne';
        fill(50);
        let splitSentence = sentence.match(/.{1,50}/g);
        let newSentence = splitSentence.join('\n');
        text(introText + "\n\n" + "The current Axiom is: " + "\n" + newSentence, rectWidth / 2 + 20, rectHeight / 2 + 20, rectWidth - 20, rectHeight - 20);
    }
}



function setup() {
    angle = radians(25);
    createCanvas(windowWidth, windowHeight);
    // createP(axiom);
    let inp = createInput('FF+[+F-F-F]-[-F+F+F]');
    inp.position(20, 20);
    inp.input(inputEvent)
    var submitButton = createButton("generate");
    var infoButton = createButton("?");
    submitButton.position(inp.x + inp.width, inp.y);
    submitButton.mousePressed(generate);
    submitButton.style('font-size', '14px');
    submitButton.style('color', color(255));
    submitButton.style('background-color', color(50));
    infoButton.position(inp.x, height - inp.y);
    infoButton.mousePressed(showInfo);
}

function draw() {
    background(0)

    push();
    translate(width * 0.33, height);
    drawTree();
    pop();
    push();
    translate(width * 0.66, height);
    scale(-1, 1);
    drawTree();
    pop();
    showInfoWindow();

}