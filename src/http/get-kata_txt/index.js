// Add simple, fast, scalable persistence: https://docs.begin.com/en/data/begin-data/
// let data = require('@begin/data')

// Add secure sessions, middleware, and more: https://docs.begin.com/en/functions/http/
// let arc = require('@architect/functions')

const imports = require('esm')(module);
const {extractTextFromFile} = imports('test-stitcher');

// TODO: modify the body object!
const body = async (req) => {
  const kataUrl = req.queryStringParameters?.kata ?? '';
  const extracted = kataUrl ? await extractTextFromFile(kataUrl) : '';
  return printTestSuites(extracted);
}
const printTests = (tests, depth) => {
  const prefix = new Array(depth).fill('  ').join('');
  let text = '';
  tests.forEach(test => text = text + prefix + test.name);
  return text;
};
const printTestSuites = (all, depth = 0) => {
  const {suites} = all;
  const prefix = new Array(depth).fill('  ').join('');
  let text = '';
  suites.forEach(suite => {
    text = text + prefix + suite.name;
    text = text + printTests(suite.tests, depth + 1);
    text = text + (suite.suites ? printTestSuites(suite, depth + 1) : '');
  });
  return text;
};


exports.handler = async function http(req) {
  return {
    headers: {
      'content-type': 'text/plain',
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
    },
    body: await body(req)
  }
};
