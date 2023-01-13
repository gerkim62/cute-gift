
export default async function runStartHtml(zipFile, manifestFileName = 'manifest.json') {
  console.log('run', zipFile)
  const zip = await JSZip.loadAsync(zipFile);
  const manifestFile = zip.file(manifestFileName);
 console.log(manifestFile)
  if (!manifestFile) {
    throw new Error(`${manifestFileName} not found in the archive. Make sure you include ${manifestFileName} in the root directory of the archive`);
  }
  const manifestContent = await manifestFile.async("string");
  const manifest = JSON.parse(manifestContent);
////console.log(manifest)
  if (!manifest.file_list.start_html) {
    throw new Error("start_html not found in manifest file. Make sure the start_html file name provided in the manifest file matches the root HTML file name in the archive");
  }

  let startHtml = await zip.file(manifest.file_list.start_html).async("string");
  
  for (const file of manifest.file_list.files) {
    //console.log(file,)
    const fileData = await zip.file(file).async("blob");
    const fileUrl = URL.createObjectURL(fileData);
    startHtml = startHtml.replace(file, fileUrl);
    //console.log(fileUrl)
  }

  const iframe = document.createElement("iframe");
  iframe.srcdoc = startHtml;
  document.body.appendChild(iframe);
}

//I wonder whether JsZip provides a way to extract encrypted zip, ChatGPT gave me this code but I doubt it
/*export default async function runStartHtml(zipFile, manifestFileName = 'manifest.json', password) {
  let zip;
  try {
    if (password) {
      zip = await JSZip.loadAsync(zipFile, {password: password});
    } else {
      zip = await JSZip.loadAsync(zipFile);
    }
  } catch (error) {
    throw new Error(`Error: Failed to load zip file - ${error}`);
  }
  const manifestFile = zip.file(manifestFileName);
  if (!manifestFile) {
    throw new Error(`${manifestFileName} not found in the archive. Make sure you include ${manifestFileName} in the root directory of the archive`);
  }
  const manifestContent = await manifestFile.async("string");
  const manifest = JSON.parse(manifestContent);
  if (!manifest.file_list.start_html) {
    throw new Error("start_html not found in manifest file. Make sure the start_html file name provided in the manifest file matches the root HTML file name in the archive");
  }

  let startHtml = await zip.file(manifest.file_list.start_html).async("string");
  
  for (const file of manifest.file_list.files) {
    //console.log(file,)
    const fileData = await zip.file(file).async("blob");
    const fileUrl = URL.createObjectURL(fileData);
    startHtml = startHtml.replace(file, fileUrl);
    //console.log(fileUrl)
  }

  const iframe = document.createElement("iframe");
  iframe.srcdoc = startHtml;
  document.body.appendChild(iframe);
}
*/