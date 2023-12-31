document.addEventListener('DOMContentLoaded', function () {

    const canvasElement = document.querySelector("canvas");
    const canvasContext = canvasElement.getContext("2d");

    const mouse = { x: 0, y: 0 };

    const field = {
        w: window.innerWidth,
        h: window.innerHeight,

        drawn: function () {
            canvasContext.fillStyle = "#00205B";
            canvasContext.fillRect(0, 0, canvasContext.width, canvasContext.height);
        }
    }

    const rede = {
        //w: window.innerWidth,
        //h: window.innerHeight,
        lineWidth: 20,
        drawn: function () {
            canvasContext.fillStyle = 'white';
            canvasContext.fillRect(canvasContext.width / 2 - this.lineWidth, 0, this.lineWidth, canvasContext.height);
        }
    }

    const leftPaddle = {
        x: 10,
        y: 400,
        lineWidth: 20,
        raqueteSize: 20,
        raqueteHeight: 200,

        _move: function () {
            this.y = mouse.y - this.raqueteHeight / 2;
        },
        drawn: function () {
            canvasContext.fillStyle = 'white';
            canvasContext.fillRect(this.x, this.y, this.raqueteSize, this.raqueteHeight);
            this._move();
        }
    }

    const rigthPaddle = {
        raqueteSize: 20,
        x: 10,
        y: 200,
        lineWidth: 20,
        raqueteHeight: 200,
        speed: 2,
        directionY: 1,

        _move: function () {
            this.x += this.directionX * this.speed;
            this.y += this.directionY * this.speed;

            if (this.y > field.h - this.raqueteHeight) {
                this.directionY = -1;
            }
            if (this.y < 0) {
                this.directionY = 1;
            }
        },
        drawn: function () {
            canvasContext.fillStyle = 'white';
            canvasContext.fillRect(canvasContext.width - this.raqueteSize - 10, this.y, this.raqueteSize, this.raqueteHeight);
            this._move();
        }
    }

    const ball = {
        ballSize: 25,
        x: 0,
        y: 0,
        directionY: 1,
        directionX: 1,
        speed: 4,

        calcPosition: function () {
            if (this.y > field.h - this.ballSize) {
                this.directionY = -1;
            }
            if (this.y < 0) {
                this.directionY = 1;
            }

            //Pro lado Direito
            if (this.x > field.w - rigthPaddle.raqueteSize - this.ballSize) {
                if (this.y + this.ballSize > rigthPaddle.y && this.y - this.ballSize < rigthPaddle.y + rigthPaddle.raqueteHeight) {
                    this.directionX = -1;
                } else {
                    score.human++;
                    rigthPaddle.speed += 2;
                    this._pointUp();
                }
            }
            //Pro lado esquerdo - Descondo do tamanho lateral da raquete e da bola
            if (this.x < 0 + leftPaddle.raqueteSize + this.ballSize) {
                //bateu na raquete
                if (this.y + this.ballSize > leftPaddle.y && this.y - this.ballSize < leftPaddle.y + leftPaddle.raqueteHeight) {
                    this.directionX = 1;
                } else {
                    score.computer++;
                    this._pointUp();
                }
            }
        },
        _speedUp: function () {
            if (this.speed < 16) {
                this.speed += 3;
            }
        },
        _pointUp: function () {
            this._speedUp();
            this.y = field.h / 2;
            this.x = field.w / 2;
        },
        _move: function () {
            this.calcPosition();
            this.x += this.directionX * this.speed;
            this.y += this.directionY * this.speed;
        },
        drawn: function () {
            canvasContext.beginPath();
            canvasContext.arc(this.x, this.y, this.ballSize, 0, 2 * Math.PI);
            canvasContext.fill();
            canvasContext.closePath();
            this._move();
        }
    }

    const score = {
        human: 0,
        computer: 0,
        w: window.innerWidth / 4,

        drawn: function () {
            canvasContext.font = "bold 78px Arial";
            canvasContext.textAlign = "center";
            canvasContext.textBaseline = "top";
            canvasContext.fillStyle = "#ffffff";
            canvasContext.fillText(this.human, this.w, 40);
            canvasContext.fillText(this.computer, this.w + this.w * 2, 40);
        }
    }

    function setup() {
        canvasElement.width = window.innerWidth;
        canvasElement.height = window.innerHeight;
        canvasContext.width = window.innerWidth;
        canvasContext.height = window.innerHeight;
    }
    function drawn() {
        field.drawn();
        rede.drawn();
        leftPaddle.drawn();
        rigthPaddle.drawn();
        ball.drawn();
        score.drawn();
    }

    window.animateFrame = (function () {
        return (
            window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                return window.setTimeout(callback, 1000 / 60)
            }
        )
    })()

    function main() {
        animateFrame(main)
        drawn()
    }

    setup()
    main()

    canvasElement.addEventListener('mousemove', function (e) {
        mouse.x = e.pageX;
        mouse.y = e.pageY;
    })

    document.getElementById('resetButton').addEventListener('click', function () {
        window.location.reload(true);
        console.log("Botão de reset clicado!");
    });
});