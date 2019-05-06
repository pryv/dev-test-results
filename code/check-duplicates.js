const fs = require('fs');
const path = require('path');

const SERVICE_CORE_VERSION = fs.readlinkSync(path.join(__dirname, '../service-core/latest'));
const SERVICE_CORE_LINK = fs.readlinkSync(path.join(__dirname, '../service-core', SERVICE_CORE_VERSION, 'latest'));

const serviceCore = require(path.join(__dirname, '../service-core', SERVICE_CORE_VERSION, SERVICE_CORE_LINK));

const testIDs = [];

serviceCore.forEach((component) => {
  component.tests.forEach((test) => {
    testIDs.push({
      ref: extractRef(test.title),
      title: test.title
    });
  });
});

testIDs.forEach((keyA, i) => {

  const isValid = isValidRef(keyA.ref);
  if (!isValid) console.log(keyA)
  

  return;
  testIDs.forEach((keyB, j) => {
    if (j >= i) return;
    
    if (keyA.ref === keyB.ref) {
      console.log('duplicates:', keyA);
      console.log(keyA.title);
      console.log(keyB.title)
    }
  }); 
});

function isValidRef(txt) {
  const regexp = /^\[[0-9A-Z]{4}\]$/;
  regexp.test(txt);
}

function extractRef(title) {
  return title.substring(0, 6);
}