var licenseKey = require('license-key-gen');

var userInfo = {company:"webisto.tech",street:"123 licenseKey ave", city:"city/town", state:"State/Province", zip:"postal/zip"}
var userLicense = {info:userInfo, prodCode:"LEN100120", appVersion:"1.5", osType:'IOS8'} 
try{
    var license = licenseKey.createLicense(licenseData)
    console.log(license);
     var license = licenseKey.validateLicense(licenseData, "W0247-4RXD3-6TW0F-0FD63-64EFD-38180");
    console.log(license);
}catch(err){
    console.log(err);
}
