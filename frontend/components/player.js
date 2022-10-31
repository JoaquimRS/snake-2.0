class Player {
    constructor(name,color,bodyColor,ctx) {
        this.name = name
        this.width = 20;
        this.height = 20;
        this.x = 0;
        this.y = 0;
        this.l_x = 0
        this.l_y = 0
        this.dead = false
        this.color = color;
        this.ctx = ctx
        this.direction = "RIGHT"
        this.bodies = []
        this.bodyColor = bodyColor
        
        
        
    }
    spawn() {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x,this.y,this.width, this.height)
    }

    spawnSecond() {
        this.x = 480;
        this.y = 480;
        this.direction = "LEFT"
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x,this.y,this.width, this.height)
    }

    move(vel) {
        this.l_x = this.x
        this.l_y = this.y
        switch (this.direction) {
            case "UP":
                (this.y>0) ? (this.y-=vel) : (this.y = 0, this.dead = true);
                break;
            case "LEFT":
                (this.x>0) ? (this.x-=vel) : (this.x = 0, this.dead = true);
                break;
            case "DOWN":
                (this.y<480) ? (this.y+=vel) : (this.y = 480, this.dead=true);
                break;
            case "RIGHT":
                (this.x<480) ? (this.x+=vel) : (this.x = 480, this.dead = true);
                break
        }
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x,this.y,this.width, this.height)
    }

    setDir(direction) {
        directions[direction] == this.direction ? null : this.direction = direction        
    }

    addBody(name) {
        let body = new Body(this.bodyColor,this.ctx,name,this.l_x,this.l_y)
        this.bodies.push(body)
    }
    die() {
        this.ctx.fillStyle = "grey";
        this.ctx.fillRect(this.x,this.y,this.width, this.height)
        this.bodies.forEach(body => {
            body.dead()
        });
    }
    restart() {
        this.x = 0;
        this.y = 0;
        this.l_x = 0
        this.l_y = 0
        this.dead = false
        this.direction = "RIGHT"
        this.bodies = []
    }
    restartSecond() {
        this.x = 480;
        this.y = 480;
        this.l_x = 0
        this.l_y = 0
        this.dead = false
        this.direction = "LEFT"
        this.bodies = []
    }
}