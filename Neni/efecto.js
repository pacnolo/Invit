// confetti.js
var confetti = {
  maxCount: 150, // máximo número de confetis
  speed: 2,
  frameInterval: 15,
  alpha: 1.0,
  gradient: false,
  start: function () {
    var colors = ["DodgerBlue", "OliveDrab", "Gold", "Pink", "SlateBlue", "LightBlue", "Violet", "PaleGreen", "SteelBlue", "SandyBrown"];
    var canvas = document.getElementById("confetti-canvas");
    var context = canvas.getContext("2d");
    var width = window.innerWidth;
    var height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    var confettiParticles = [];
    for (var i = 0; i < this.maxCount; i++) {
      confettiParticles.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        r: Math.random() * 6 + 4,
        d: Math.random() * this.speed + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.floor(Math.random() * 10) - 10,
        tiltAngle: 0
      });
    }

    function draw() {
      context.clearRect(0, 0, width, height);
      for (var i = 0; i < confettiParticles.length; i++) {
        var p = confettiParticles[i];
        context.beginPath();
        context.lineWidth = p.r;
        context.strokeStyle = p.color;
        context.moveTo(p.x + p.tilt + p.r / 2, p.y);
        context.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
        context.stroke();
      }
      update();
    }

    function update() {
      for (var i = 0; i < confettiParticles.length; i++) {
        var p = confettiParticles[i];
        p.y += p.d;
        p.tiltAngle += 0.05;
        p.tilt = Math.sin(p.tiltAngle - i / 3) * 15;

        if (p.y > height) {
          p.y = -10;
          p.x = Math.random() * width;
        }
      }
    }

    setInterval(draw, confetti.frameInterval);
  }
};
