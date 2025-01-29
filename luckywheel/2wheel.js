function randomColor() {
    r = Math.floor(Math.random() * 255);
    g = Math.floor(Math.random() * 255);
    b = Math.floor(Math.random() * 255);
    return {r, g, b}
}

function toRad(deg) {
    return deg * (Math.PI / 180.0);
}

function randomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function easeOutSine(x) {
    return Math.sin((x * Math.PI) / 2);
}

function getPercent(input, min, max) {
    return (((input - min) * 100) / (max - min)) / 100
}

const canvas = document.getElementById("canvas")
const ctx1 = canvas.getContext("2d")
const width = document.getElementById("canvas").width
const height = document.getElementById("canvas").height
const centerX = width/2
const centerY = height/2
const radius = width/2

let items = document.getElementById("textarea2").value.split("\n");
let currentDeg = 0
let step = 360/items.length
let colors = []
let itemDegs = {}
let items1 = document.getElementById("textarea1").value.split("\n");
let currentDeg1 = 0
let step1 = 360/items1.length
let colors1 = []
let itemDegs1 = {}

for(let i = 0 ; i < items.length + 1; i++){
    colors.push(randomColor())
}
for(let i = 0 ; i < items1.length + 1; i++){
    colors1.push(randomColor())
}

function createWheel(){
    items = document.getElementById("textarea2").value.split("\n");
    step = 360/items.length
    colors = []
    for(let i = 0 ; i < items.length + 1;i++){
        colors.push(randomColor())
    }
    draw()
}

function createWheel1(){
    items1 = document.getElementById("textarea1").value.split("\n");
    step1 = 360/items1.length
    colors1 = []
    for(let i = 0 ; i < items1.length + 1;i++){
        colors1.push(randomColor())
    }
    draw1()
}

draw()
draw1()

function draw(){
    ctx1.beginPath();
    ctx1.arc(centerX, centerY, radius, toRad(0), toRad(360))
    ctx1.fillStyle = `rgb(${33},${33},${33})`
    ctx1.lineTo(centerX, centerY);
    ctx1.fill()

    let startDeg = currentDeg;
    for(let i = 0 ; i < items.length; i++, startDeg += step){
        let endDeg = startDeg + step

        color = colors[i]
        let colorStyle = `rgb(${color.r},${color.g},${color.b})`

        ctx1.beginPath();
        rad = toRad(360/step);
        ctx1.arc(centerX, centerY, radius, toRad(startDeg), toRad(endDeg))
        ctx1.fillStyle = colorStyle
        ctx1.lineTo(centerX, centerY);
        ctx1.fill()

        ctx1.save();
        ctx1.translate(centerX, centerY);
        ctx1.rotate(toRad((startDeg + endDeg)/2));
        ctx1.textAlign = "center";
        if(color.r > 150 || color.g > 150 || color.b > 150){
            ctx1.fillStyle = "#000";
        } else {
            ctx1.fillStyle = "#fff";
        }
        ctx1.font = 'bold 24px serif';
        ctx1.fillText(items[i], 330, 10);
        ctx1.restore();

        itemDegs[items[i]] = 
            {
            "startDeg": startDeg,
            "endDeg" : endDeg
            }
    }
}


let speed = 0
let speed1 = 0
let maxRotation = randomRange(1080, 2160)
let maxRotation1 = randomRange(1080, 2160)
let pause = false
function animate(){
    if(pause){
        return
    }
    speed = easeOutSine(getPercent(currentDeg, maxRotation, 0)) * Math.random() * 20
    if(speed < 0.01){
        speed = 0
        pause = true
    }
    currentDeg += speed
    draw()
    window.requestAnimationFrame(animate);
}

function spin(){
    if(speed != 0){
        return
    }

    maxRotation = 0;
    currentDeg = 0
    createWheel()
    draw();

    
    maxRotation = (360 * 6) - itemDegs['output1'].endDeg + 10
    itemDegs = {}
    console.log("max", maxRotation)
    console.log(itemDegs);
    pause = false
    window.requestAnimationFrame(animate);
}

function draw1(){
    ctx1.beginPath();
    ctx1.arc(centerX, centerY, radius / 2, toRad(0), toRad(360))
    ctx1.fillStyle = `rgb(${33},${33},${33})`
    ctx1.lineTo(centerX, centerY);
    ctx1.fill()

    let startDeg1 = currentDeg1;
    for(let i = 0 ; i < items1.length; i++, startDeg1 += step1){
        let endDeg1 = startDeg1 + step1

        color1 = colors1[i]
        let colorStyle1 = `rgb(${color1.r},${color1.g},${color1.b})`

        ctx1.beginPath();
        rad1 = toRad(360/step1);
        ctx1.arc(centerX, centerY, radius / 2, toRad(startDeg1), toRad(endDeg1))
        ctx1.fillStyle = colorStyle1
        ctx1.lineTo(centerX, centerY);
        ctx1.fill()

        ctx1.save();
        ctx1.translate(centerX, centerY);
        ctx1.rotate(toRad((startDeg1 + endDeg1)/2));
        ctx1.textAlign = "center";
        if(color1.r > 150 || color1.g > 150 || color1.b > 150){
            ctx1.fillStyle = "#000";
        } else {
            ctx1.fillStyle = "#fff";
        }
        ctx1.font = 'bold 24px serif';
        ctx1.fillText(items1[i], 130, 10);
        ctx1.restore();

        itemDegs1[items1[i]] = 
            {
            "startDeg1": startDeg1,
            "endDeg1" : endDeg1
            }
    }
}

function animate1(){
    if(pause){
        draw1()
        return
    }
    speed1 = easeOutSine(getPercent(currentDeg1 ,maxRotation1 ,0)) * Math.random() * 20
    console.log(speed, speed1)
    if(speed1 < 0.01){
        speed1 = 0
    }
    currentDeg1 += speed1
    draw1()
    window.requestAnimationFrame(animate1);
}

function spin1(){
    if(speed1 != 0){
        return
    }

    maxRotation = 0;
    currentDeg1 = 0
    createWheel1()
    draw1();

    
    maxRotation = (360 * 6) - itemDegs1['output1'].endDeg1 + 10
    itemDegs1 = {}
    console.log("max", maxRotation)
    console.log(itemDegs1);
    pause1 = false
    window.requestAnimationFrame(animate1);
}