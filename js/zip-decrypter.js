export default async function decryptZip(inputFile, password) {
  let form = new FormData();
  form.append("inputFile", inputFile, "file");
  form.append("password", password);

  try {
    const response = await fetch('https://api.cloudmersive.com/convert/edit/pdf/decrypt', {
      method: 'POST',
      headers: {
        'Apikey': '825f4663-c9eb-4e23-bb33-47d6d68e4797',
      },
      body: form
    });

    const blob = await response.blob();
    
    return new File([blob], 'decrypted.zip');
  } catch (error) {
    console.error(error);
  }
}
