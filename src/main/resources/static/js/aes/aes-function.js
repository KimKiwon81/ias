function fnAesEncrypt(str, passphrase){

	var iv = CryptoJS.lib.WordArray.random(128/8);
    var key = CryptoJS.enc.Hex.parse(CryptoJS.SHA1(passphrase).toString().substring(0,32));
    
    var ct = CryptoJS.AES.encrypt(str, key, {iv:iv});
    var encText = iv.concat(ct.ciphertext).toString();

	return encText;

}

function fnAesDecrypt(str, passphrase){

	var decText = CryptoJS.AES.decrypt({
		ciphertext: CryptoJS.enc.Hex.parse(str.substring(32))
	  }, CryptoJS.enc.Hex.parse(CryptoJS.SHA1(passphrase).toString().substring(0,32)),
	  {
		iv:CryptoJS.enc.Hex.parse(str.substring(0,32))
	  }).toString(CryptoJS.enc.Utf8);

	return decText;
}