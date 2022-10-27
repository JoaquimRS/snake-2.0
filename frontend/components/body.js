class Body {
    constructor(color,ctx, name, x, y) {
        this.name = name
        this.width = 10;
        this.x = x+10;
        this.y = y+10;
        this.l_x = 0;
        this.l_y = 0;
        this.color = color;
        this.ctx = ctx
    }

    move(x, y) {
        this.l_x = this.x-10
        this.l_y = this.y-10
        this.ctx.beginPath()
        this.x = x+10
        this.y = y+10
        this.ctx.fillStyle = this.color;
        this.ctx.arc(this.x,this.y,this.width, 0, 2 * Math.PI, false)
        this.ctx.fill()
    }
    dead() {
        this.ctx.fillStyle = "grey";
        this.ctx.arc(this.x,this.y,this.width, 0, 2 * Math.PI, false)
        this.ctx.fill()
    }
}