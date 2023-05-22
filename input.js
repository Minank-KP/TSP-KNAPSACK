class Node {
    constructor(x,y) {
        this.x=x;
        this.y=y;
        this.time=Math.floor(Math.random() * 10) + 1;
        this.enj=Math.floor(Math.random() * 10) + 1;
    }
}

const nodes =[]


/**@type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 1200;
canvas.height = 800;
// Draw the map
const img = new Image();
img.src = "map2.png";
img.addEventListener("load", function() {
   ctx.drawImage(img, 0, 0, 1200, 800);
});
canvas.tabindex = 1;
canvas.addEventListener("click", function(event){
    let x = event.offsetX;
    let y = event.offsetY;
    let node = new Node(x,y);
    nodes.push(node)
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI*2);
    ctx.fill();
    ctx.stroke();
    console.log(nodes)
});

const Time_arr = []
function generateMatrix() {

    for (var i = 0; i < nodes.length(); i++) {
    var row = [];
    for (var j = 0; j < nodes.length(); j++) {
        if(i==j)
            row.push(0);
        else{
            var dx=nodes[i].x-nodes[j].x;
            var dy=nodes[i].y-nodes[j].y;
            var diff = Math.sqrt(dx*dx+dy*dy);
            row.push(diff+nodes[i].time);
        }   
    }
    Time_arr.push(row);
    }
}



function calculateOutput() {
    generateMatrix();
}


document.getElementById("calculate").onclick = () => {
    calculateOutput();
  };

