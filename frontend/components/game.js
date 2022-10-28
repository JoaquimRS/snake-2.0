class GameArea {
    constructor(player) {       
        this.canvas = document.createElement("canvas");
        this.player = player
        this.canvas.width = 500;
        this.canvas.height = 500;
        this.score = 0
        this.context = this.canvas.getContext("2d");
        this.lvl = 0
        this.userInfo = localStorage.getItem("token") ? JSON.parse(atob(localStorage.getItem("token"))) : null
    }

    async start() {
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.createScore()
        this.showModal()
        if (this.userInfo && this.player=="player") {
            userResetScore(this.userInfo.uuid)
            this.createRanking()
        }
    }

    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
    
    createScore() {
        let header = document.createElement("header")
        let lvlContainer = document.createElement("div")
        let scoreContainer = document.createElement("div")
        let p_score = document.createElement("p")
        let p_lvl = document.createElement("p")
        let pause = document.createElement("img")
        let play = document.createElement("img")
        
        scoreContainer.className = "score-container_"+this.player
        lvlContainer.className = "lvl-container_"+this.player
        
        p_score.className = "score_"+this.player
        p_score.id = "score_"+this.player
        p_score.appendChild(document.createTextNode("Score: 0"))

        p_lvl.className = "lvl_"+this.player
        p_lvl.id = "lvl_"+this.player
        p_lvl.appendChild(document.createTextNode("LVL: 1"))

        pause.src = "./img/pause.png"
        pause.className = "pause_"+this.player
        pause.id = "pause_"+this.player

        play.src = "./img/play.png"
        play.className = "play_"+this.player
        play.id = "play_"+this.player

        document.body.insertBefore(header, this.canvas);
        header.appendChild(scoreContainer)
        header.appendChild(lvlContainer)
        header.appendChild(pause)
        header.appendChild(play)
        scoreContainer.appendChild(p_score)
        lvlContainer.appendChild(p_lvl)

    }

    createRanking() {
        let rankingContainer = document.createElement('div');
        let list = document.createElement('ul')
        let first = document.createElement('li');
        let second = document.createElement('li');
        let third = document.createElement('li');
        let self = document.createElement('li')
        let value_first = document.createElement('label');
        let value_second = document.createElement('label');
        let value_third = document.createElement('label');
        let value_self = document.createElement('label')

        rankingContainer.className = "ranking-container"
        list.className= "ranking-list"
        first.appendChild(document.createTextNode("1 user"))
        first.id = "first_ranking"
        second.appendChild(document.createTextNode("2 user"))
        second.id = "second_ranking"
        third.appendChild(document.createTextNode("3 user"))
        third.id = "third_ranking"
        self.appendChild(document.createTextNode("X You"))
        self.id = "self_ranking"
        value_first.appendChild(document.createTextNode("X"))
        value_first.id = "first_ranking_value"
        value_second.appendChild(document.createTextNode("X"))
        value_second.id = "second_ranking_value"
        value_third.appendChild(document.createTextNode("X"))
        value_third.id = "third_ranking_value"
        value_self.appendChild(document.createTextNode("X"))
        value_self.id = "self_ranking_value"
        
        
        document.body.insertBefore(rankingContainer, this.canvas);
        rankingContainer.appendChild(list)
        list.append(first,second,third,self)
        first.appendChild(value_first)
        second.appendChild(value_second)
        third.appendChild(value_third)
        self.appendChild(value_self)
        
        this.updateRanking()
    }

    async updateRanking() {
        let rankingUsers = await users(this.userInfo.uuid)
        let first = document.getElementById("first_ranking")
        let second = document.getElementById("second_ranking")
        let third = document.getElementById("third_ranking")
        let self = document.getElementById("self_ranking")
        let value_first = document.getElementById("first_ranking_value")
        let value_second = document.getElementById("second_ranking_value")
        let value_third = document.getElementById("third_ranking_value")
        let value_self = document.getElementById("self_ranking_value")

        first.textContent = "1 "+rankingUsers[0].user
        second.textContent = "2 "+rankingUsers[1].user
        third.textContent = "3 "+rankingUsers[2].user
        self.textContent = ""+rankingUsers[3].user
        value_first.textContent = rankingUsers[0].maxscore
        value_second.textContent = rankingUsers[1].maxscore
        value_third.textContent = rankingUsers[2].maxscore
        value_self.textContent = rankingUsers[3].score

        first.appendChild(value_first)
        second.appendChild(value_second)
        third.appendChild(value_third)
        self.appendChild(value_self)


    }

    async showModal() {
        const delay = ms => new Promise(res => setTimeout(res,ms))
        
        let modal = document.getElementById("modal")
        modal.style.display = "block"
        let modalContent = document.createElement("div")
        let text = document.createElement("p")
        let img_1 = document.createElement("img")
        let img_2 = document.createElement("img")
        
       
        
        modalContent.className = "modal-content"
        text.appendChild(document.createTextNode("HOW TO PLAY"))
        text.className="how-to-play"
        img_1.src = "./img/arrows.png"
        img_2.src = "./img/wasd.png"

        if (this.player != "player") {
            img_1.className = "rigth-img"    
            img_2.className = "left-img"
            text.className = "how-to-play-dp"
        }
          
        modal.appendChild(modalContent)
        modalContent.appendChild(text)
        modalContent.appendChild(img_2)
        modalContent.appendChild(img_1)
        

        await delay(4000)
        modal.style.display = "none"
    }

    async addScore() {
        if (this.userInfo && this.player=="player") {
            await userAddScore(this.userInfo.uuid)
            this.updateRanking()
        }
        this.score += 1
        switch (this.score) {
            case 5:
                this.lvl = 1
                break;
            case 10:
                this.lvl = 2
                break;
            case 15:
                this.lvl = 3
                break;
            case 20:
                this.lvl = 4
                break;
            case 25:
                this.lvl = 5
                break;
            case 30:
                this.lvl = 6
                break;
        }

        document.getElementById("score_"+this.player).innerHTML = "Score: "+this.score
        document.getElementById("lvl_"+this.player).innerHTML = "LVL: "+(this.lvl+1)
    }
    restart() {
        this.score = 0
        this.lvl = 0
    }

}
