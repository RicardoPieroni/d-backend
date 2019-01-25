const mongoose =require('mongoose');
const Promise =require('bluebird');
const sinon =require('sinon');
const mocha =require('mocha');
const chai =require('chai');
const sinonChai =require('sinon-chai');
const config = require('../../../config');
const chaiHttp = require("chai-http");
 
mongoose.Promise = Promise;

const testCommons = {
};

testCommons.clearTestDB = () => {
    const connection = mongoose.createConnection(config.mongo.uri);
    return new Promise((resolve, reject) => {
        connection.once('open', () => {
            connection.db.dropDatabase(() => {
                connection.close(() => {
                    mongoose.connection.removeAllListeners('open');
                    resolve();
                });
            });
        });
    });
};
testCommons.resetTestDB = () =>

    testCommons.clearTestDB().then(() =>
        mongoose.connect(config.mongo.uri),
    );

testCommons.closeTestDB = () => mongoose.disconnect();

testCommons.init = () => {
    
    chai.use(sinonChai);
    chai.should();
    global.chai = chai;
    global.sinon = sinon;
    chai.use(chaiHttp);
    global.should = chai.should();
    global.specify = testCommons.specify;
    global.expect = chai.expect;
    global.it = testCommons.it;
};

testCommons.it = (arg1, arg2) => {
    if (typeof arg1 === 'function') {
        const code = arg1;
        const source = code.toString();
        const sourceFn = source.replace(/^.*=> *(.*)/, '$1');
        mocha.it(sourceFn, code);
    } else {
        mocha.it(arg1, arg2);
    }
};
testCommons.specify = testCommons.it;

export default testCommons;
