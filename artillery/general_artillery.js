'use strict';
 
let i = 0;

function setInformation(context, events, done) {
  context.vars.test = 11;
  return done();
}

function SignUpGenerateData(context, events, done){
  i=i+1
  context.vars.email = `test${i}@test.com`
  context.vars.password = `test${i}@test.com`
  context.vars.username = `test${i}@test.com`
  return done();
}

module.exports = {
  setInformation,
  SignUpGenerateData
};