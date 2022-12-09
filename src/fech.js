const HtmlLoader     = require('./maintenance_checker/htmlLoader')
const HtmlParser     = require('./maintenance_checker/htmlParser')

function fetch(){
  try{
    Object.entries(gameList).forEach(async (item) => {
      const loader = new HtmlLoader(item[1]).load()
      loader.then((data)=>{
          HtmlParser(data)
      })
    })
    returnMessage = '성공!'
  }catch(err){
    console.error(err)
  }
}

module.exports = fetch

