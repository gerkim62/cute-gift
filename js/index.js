import runStartHtml from './zip-viewer.js'
import fetchZip from './zip-fetcher.js'
import decryptZip from './zip-decrypter.js'

async function runGame(gameUrl){
  //console.log("started function")
  const gameZip = await fetchZip(gameUrl)
  //console.log('obtanied gameZip', gameZip)
  const decryptedZip= await decryptZip(gameZip, 'h')
  console.log(decryptedZip, gameZip)
  runStartHtml(gameZip)
 // console.log(gameZip)
 
 downloadFile(decryptedZip)
}

runGame('/zips/f.zip')

//console.log(decryptZip)


function downloadFile(file) {
  // Create a link element
  const link = document.createElement("a");
  link.href = URL.createObjectURL(file);
  link.download = file.name;
  link.style.display = "none";
  document.body.appendChild(link);

  // Click the link to trigger the download
  link.click();

  // Clean up
  URL.revokeObjectURL(link.href);
  document.body.removeChild(link);
  console.log('downloaded', file)
}
