// 게임 설정값에서 읽어온 주소대로 html 파일을 읽어온다.
// 단순 html 파일을 읽어서 파서로 넘긴다.
const axios = require('axios')
const https = require("https");

class HtmlLoader{
    constructor(gameConfig){        
        this.config = gameConfig
        this.html   = undefined
    }

    async load(){
        try{            
            const options = {
                method: "get",
                httpsAgent: new https.Agent({
                  rejectUnauthorized: false, //허가되지 않은 인증을 reject하지 않겠다!
                }),
              };
            const reponse = this.config.use ? await axios.get(this.config.url, options) : undefined
            this.html     = (reponse && reponse.data) ? reponse.data : undefined
        }catch(error){
            console.error(error)
        }

        return {...this.config, html: this.html};
    }
}

module.exports = HtmlLoader