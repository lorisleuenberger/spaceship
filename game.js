const player = {
    position: 280,
}

function draw() {
    const canvas = document.getElementById("canvas");
    if (!canvas.getContext) {
        alert("Canvas not found!");
        return;
    }
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "rgb(200 0 0)";
    ctx.fillRect(280,740,40,40);
}
window.addEventListener("load", draw);
