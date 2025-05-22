const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

class Motorbike {
    constructor(x, y, color, controls, direction) {
        this.x = x;
        this.y = y;
        this.size = 10;
        this.color = color;
        this.speed = 2;
        this.direction = direction;
        this.trail = [];
        this.controls = controls;
        this.alive = true;
        this.started = false; // Флаг начала движения
    }

    draw() {
        if (!this.alive) return;
        
        // След
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.size;
        ctx.beginPath();
        
        if (this.trail.length > 1) {
            ctx.moveTo(this.trail[0].x, this.trail[0].y);
            for (let i = 1; i < this.trail.length; i++) {
                ctx.lineTo(this.trail[i].x, this.trail[i].y);
            }
            ctx.stroke();
        }
        
        // Мотоцикл
        ctx.save();
        ctx.translate(this.x, this.y);
        
        switch(this.direction) {
            case 'up': ctx.rotate(-Math.PI/2); break;
            case 'down': ctx.rotate(Math.PI/2); break;
            case 'left': ctx.rotate(Math.PI); break;
        }
        
        // Корпус
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.moveTo(0, -this.size/2);
        ctx.lineTo(this.size, -this.size/4);
        ctx.lineTo(this.size, this.size/4);
        ctx.lineTo(0, this.size/2);
        ctx.closePath();
        ctx.fill();
        
        // Фара
        ctx.fillStyle = '#ffff00';
        ctx.beginPath();
        ctx.arc(this.size, 0, this.size/4, -Math.PI/2, Math.PI/2);
        ctx.fill();
        
        // Сиденье
        ctx.fillStyle = '#ff0000';
        ctx.beginPath();
        ctx.moveTo(0, -this.size/3);
        ctx.lineTo(-this.size/3, -this.size/4);
        ctx.lineTo(-this.size/3, this.size/4);
        ctx.lineTo(0, this.size/3);
        ctx.closePath();
        ctx.fill();
        
        ctx.restore();
    }

    moveUp() {
        if (this.direction !== 'down' && this.alive) {
            this.direction = 'up';
            this.y -= this.speed;
            this.recordTrail();
        }
    }

    moveDown() {
        if (this.direction !== 'up' && this.alive) {
            this.direction = 'down';
            this.y += this.speed;
            this.recordTrail();
        }
    }

    moveLeft() {
        if (this.direction !== 'right' && this.alive) {
            this.direction = 'left';
            this.x -= this.speed;
            this.recordTrail();
        }
    }

    moveRight() {
        if (this.direction !== 'left' && this.alive) {
            this.direction = 'right';
            this.x += this.speed;
            this.recordTrail();
        }
    }

    recordTrail() {
        if (!this.alive) return;
        this.trail.push({x: this.x, y: this.y});
        if (this.trail.length > 1000) {
            this.trail.shift();
        }
    }

    update() {
        if (!this.alive) return;
        
        // Если движение еще не начато, ждем первого нажатия
        if (!this.started) {
            if (this.controls.up || this.controls.down || 
                this.controls.left || this.controls.right) {
                this.started = true;
            } else {
                return; // Не двигаемся пока не нажата клавиша
            }
        }
        
        // После старта продолжаем движение в текущем направлении
        if (this.controls.up) this.moveUp();
        else if (this.controls.down) this.moveDown();
        else if (this.controls.left) this.moveLeft();
        else if (this.controls.right) this.moveRight();
        else {
            // Продолжаем движение в текущем направлении
            switch(this.direction) {
                case 'up': this.moveUp(); break;
                case 'down': this.moveDown(); break;
                case 'left': this.moveLeft(); break;
                case 'right': this.moveRight(); break;
            }
        }
    }
}

const player1Controls = {
    up: false,
    down: false,
    left: false,
    right: false
};

const player2Controls = {
    up: false,
    down: false,
    left: false,
    right: false
};

const player1Bike = new Motorbike(10, 10, 'blue', player1Controls, 'right');
const player2Bike = new Motorbike(canvas.width - 10, canvas.height - 10, 'orange', player2Controls, 'left');

document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp': player1Controls.up = true; break;
        case 'ArrowDown': player1Controls.down = true; break;
        case 'ArrowLeft': player1Controls.left = true; break;
        case 'ArrowRight': player1Controls.right = true; break;
    }

    switch (e.key.toLowerCase()) {
        case 'w': player2Controls.up = true; break;
        case 's': player2Controls.down = true; break;
        case 'a': player2Controls.left = true; break;
        case 'd': player2Controls.right = true; break;
    }
});

document.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'ArrowUp': player1Controls.up = false; break;
        case 'ArrowDown': player1Controls.down = false; break;
        case 'ArrowLeft': player1Controls.left = false; break;
        case 'ArrowRight': player1Controls.right = false; break;
    }
    
    switch (e.key.toLowerCase()) {
        case 'w': player2Controls.up = false; break;
        case 's': player2Controls.down = false; break;
        case 'a': player2Controls.left = false; break;
        case 'd': player2Controls.right = false; break;
    }
});

// Проверка столкновений
function checkCollisions() {
    [player1Bike, player2Bike].forEach(bike => {
        if (!bike.alive) return;
        
        if (bike.x < 0 || bike.x > canvas.width || bike.y < 0 || bike.y > canvas.height) {
            crashBike(bike);
        }
    });
    
    checkTrailCollisions();
}

function checkTrailCollisions() {
    if (player1Bike.alive) {
        if (isCollidingWithTrail(player1Bike, player2Bike.trail) || 
            isCollidingWithOwnTrail(player1Bike)) {
            crashBike(player1Bike);
        }
    }
    
    if (player2Bike.alive) {
        if (isCollidingWithTrail(player2Bike, player1Bike.trail) || 
            isCollidingWithOwnTrail(player2Bike)) {
            crashBike(player2Bike);
        }
    }
}

function isCollidingWithTrail(bike, trail) {
    for (let i = 0; i < trail.length - 5; i++) {
        const point = trail[i];
        const distance = Math.sqrt(Math.pow(bike.x - point.x, 2) + Math.pow(bike.y - point.y, 2));
        if (distance < bike.size) {
            return true;
        }
    }
    return false;
}

function isCollidingWithOwnTrail(bike) {
    for (let i = 0; i < bike.trail.length - 10; i++) {
        const point = bike.trail[i];
        const distance = Math.sqrt(Math.pow(bike.x - point.x, 2) + Math.pow(bike.y - point.y, 2));
        if (distance < bike.size) {
            return true;
        }
    }
    return false;
}

function crashBike(bike) {
    bike.alive = false;
    if (!player1Bike.alive || !player2Bike.alive) {
        setTimeout(() => {
            const winner = player1Bike.alive ? "игрок Синей команды" : "игрок Оранжевой команды";
            alert(`Игра окончена! Победил ${winner}`);
            document.location.reload();
        }, 100);
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    player1Bike.update();
    player2Bike.update();
    
    player1Bike.draw();
    player2Bike.draw();
    
    checkCollisions();
    
    requestAnimationFrame(gameLoop);
}

gameLoop();
