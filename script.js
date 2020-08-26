const h1 = document.getElementById("aud");
const audio = "./LastDance.mp3";
const player = new Audio(audio);
player.loop = true;

let intv;

draw(1, player.duration);

document.addEventListener("keydown", e => {
    switch (e.keyCode) {
        case 32:
        case 75:
            if (player.paused) {
                player.play();
                let full = player.duration;
                intv = setInterval(() => {
                    let time = player.currentTime;
                    draw(time, full);
                }, 1000);
            } else {
                if (intv) clearInterval(intv);
                player.pause();
            }
            break;
        case 37:
            if (!player.paused) {
                player.currentTime -= 10;
                draw(player.currentTime, player.duration);
            }
            break;
        case 39:
        case 76:
            if (!player.paused) {
                player.currentTime += 10;
                draw(player.currentTime, player.duration);
            }
            break;
        case 96:
            if (!player.paused) {
                player.currentTime = 0;
                draw(player.currentTime, player.duration);
            }
    }
});

player.onended = () => {
    clearInterval(intv);
};

function draw(progress, total) {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const getProgress = () => {
        let prg = (progress / total) * canvas.clientWidth;
        if (isNaN(prg) || prg < 0) return 0;
        if (prg > canvas.clientWidth) return canvas.clientWidth;
        return prg;
    };

    // track
    ctx.beginPath();
    ctx.fillStyle = "#919191";
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    ctx.closePath();

    // progress
    ctx.beginPath();
    ctx.fillStyle = "#23ff00";
    ctx.fillRect(0, 0, getProgress(), canvas.clientHeight);
    ctx.closePath();
};