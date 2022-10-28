class Food {
    constructor(ctx, name) {
        this.name = name
        this.width = 20;
        this.height = 20;
        this.x = this.getRandomX();
        this.y = this.getRandomY();
        this.l_x = 0;
        this.l_y = 0;
        this.color = "green";
        this.ctx = ctx
        
        
    }

    spawn() {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x,this.y,this.width, this.height)
    }

    changePosition() {
        this.x = this.getRandomX()
        this.y = this.getRandomY()
    }

    getRandomX() {
        var random = Math.floor(Math.random() * 480)
        return random+20 - (random % 20)
    }
    getRandomY() {
        var random = Math.floor(Math.random() * 480)
        return random+20 - (random % 20)
    }

}