const fs = require('fs');
const path = require('path');
const moment = require('moment');

const testSrcPath = path.resolve(__dirname, '../');

const services = ['service-core'];


const extractId = /\[([A-Z0-9]{4,})\]+(.*)/

function extractTitleIdAndTitle(testTitle) {
  const res =  extractId.exec(testTitle)
  if (!res) {
    console.log('Warning failed extracting id from test: ' + testTitle)
    return { id: 'XXXX', title: testTitle }
  }
  return { id: res[1], title: res[2] }
}

function loadTests() {
  const results = {};
  services.forEach(service => {
    
    const serviceVersion = fs.readlinkSync(path.join(testSrcPath, service, 'latest'));
    const serviceFileName = fs.readlinkSync(path.join(testSrcPath, service, serviceVersion, 'latest'));
    const date = moment(serviceFileName.substring(0, 15), 'YYYYMMDD-HHmmss').toDate();


    
    const components = require(path.join(testSrcPath, service, serviceVersion, serviceFileName));
    components.forEach(component => { 
      component.sets = {}
      component.tests.forEach(test => {
        
        const testContent = extractTitleIdAndTitle(test.title)
        testContent.duration = test.duration
        testContent.err = test.err

        const setTitle = test.fullTitle.slice(0, -1 * test.title.length)
        
        if (!component.sets[setTitle]) {
          component.sets[setTitle] = { tests:[] } 
        }
        component.sets[setTitle].tests.push(testContent)
      })
      delete component.tests;
    });

    
    results[service] = [{ 
      version: serviceVersion,
      date: date,
      components: components
    }]

  });

  return results;
}




module.exports = loadTests();