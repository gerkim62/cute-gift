export default async function fetchZip(zipSource, filename='zipfile.zip') {
    let response;
    let zip;
    if (typeof zipSource === 'string') {
      if (zipSource.startsWith('http')) {
        response = await fetch(zipSource);
        zip = await response.arrayBuffer();
      } else {
        response = await fetch(zipSource);
        zip = await response.arrayBuffer();
      }
    } else {
      zip = await new Response(zipSource).arrayBuffer();
    }
    const file = new File([zip], filename, { type: 'application/zip' });
    return file;
}


//examples
/*

// using relative URL
let zipFile = await fetchZip('/zips/zip1.zip');
runZip(zipFile);

// using full URL
let zipFile = await fetchZip('https://example.com/zipfile.zip');
runZip(zipFile);

// using file upload
let input = document.getElementById('zip-input');
let zipFile = await fetchZip(input.files[0]);
runZip(zipFile);


*/