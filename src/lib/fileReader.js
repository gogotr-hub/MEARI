const fs = require('fs')

fs.readFile('./src/lib/gamelist.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err)
        return
    }

    //load data
    const gameDictionary = data.split("\n");

    //make config
    const gameConfig = gameDictionary.reduce((acc, item) => {
        if (item.indexOf('N/A') < 0) {
            const keyValue = item.split(',')
            acc[keyValue[1]] = {
                code: keyValue[1],
                name: keyValue[0],
                url: '',
                query: '',
                domain : '',
                use: false,
                latest: '',
                updateDate:''
            }
        }
        return acc
    }, {})


    fs.writeFileSync('game.json', JSON.stringify(gameConfig))
})