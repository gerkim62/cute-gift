import runStartHtml from './zip-viewer.js'
import fetchZip from './zip-fetcher.js'

async function runGame(gameUrl){
  //console.log("started function")
  const gameZip = await fetchZip(gameUrl)
  //console.log('obtanied gameZip', gameZip)
  runStartHtml(gameZip)
 // console.log(gameZip)
}

runGame('/zips/f.zip')