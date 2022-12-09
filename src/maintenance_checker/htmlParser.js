//가져온 html 파일에서 쿼리를 이용하여 데이터를 추출한다.
// 최신데이터인지 검증한다. -> how?

const cheerio  = require('cheerio')
const parse = (config) => {
    try{
        if(config.use && config.html){
            const $ = cheerio.load(config.html)

            $($(`${config.query}`).get().reverse()).each((_, item) => {
                //read board title
                const title = ($(item).text())
                                .replace("\r", "")
                                .replace("\n", "")
                                .replace("\t", "");

                //title check and save game config
                getMainternace(config, title)
            })
        }
    }catch(error){
        console.error(error)
    }
}

const getMainternace = (config, title) => {
    const MAINTERNANCE_WORD         = '점검'
    
    if(title.indexOf(MAINTERNANCE_WORD) > 0){              
        //read config and filtering current game
        const targetGame = Object.values(gameList).find(game => game.code == config.code)
        
        //set title
        if(targetGame.latest != title){
            targetGame.latest = title
            targetGame.updateDate = new Date().getTime()

            //edit
            gameList[config.code] = targetGame
        }
    }
}

module.exports = parse