const fs = require('fs');
const path = require('path');
const moment = require('moment');

const testSrcPath = path.resolve(__dirname, '../');

const services = ['service-core'];

function loadTests() {
  const tests = {};
  services.forEach(service => {
    
    const serviceVersion = fs.readlinkSync(path.join(testSrcPath, service, 'latest'));
    const serviceFileName = fs.readlinkSync(path.join(testSrcPath, service, serviceVersion, 'latest'));
    const date = moment(serviceFileName.substring(0, 15), 'YYYYMMDD-HHmmss').toDate();

    tests[service] = { 
      version: serviceVersion,
      date: date,
      tests: require(path.join(testSrcPath, service, serviceVersion, serviceFileName))
    }
  });
  return tests;
}




module.exports = loadTests();