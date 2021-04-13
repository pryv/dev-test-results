/**
 * @license
 * Copyright (C) 2012-2021 Pryv S.A. https://pryv.com - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */
const fs = require('fs');
const path = require('path');

const SERVICE_CORE_VERSION = fs.readlinkSync(path.join(__dirname, '..', 'service-core', 'latest'));
const SERVICE_CORE_LINK = fs.readlinkSync(path.join(__dirname, '..', 'service-core', SERVICE_CORE_VERSION, 'latest'));

const serviceCore = require(path.join(__dirname, '..', 'service-core', SERVICE_CORE_VERSION, SERVICE_CORE_LINK));

const testIDs = [];

serviceCore.forEach((component) => {
  component.passes.forEach(test => {
    testIDs.push({
      ref: extractRef(test.title),
      title: test.title
    });
  });
});

testIDs.forEach((keyA, i) => {

  const isValid = isValidRef(keyA.ref);
  if (!isValid) console.log('not valid', keyA);
  
  testIDs.forEach((keyB, j) => {
    if (j >= i) return;
    
    if (keyA.ref === keyB.ref) {
      console.log('duplicates:', keyA);
      console.log(keyA.title);
      console.log(keyB.title);
    }
  }); 
});

function isValidRef(txt) {
  const regexp = /^\[[A-Z0-9]{4}\]$/;
  return regexp.test(txt);
}

function extractRef(title) {
  return title.substring(0, 6);
}