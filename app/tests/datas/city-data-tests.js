/* globals require describe it beforeEach afterEach*/

'use strict';

const chai = require('chai');
const sinonModule = require('sinon');

let expect = chai.expect;

describe('Test environment', () => {
    it('Expect to pass', () => {
        expect(1).to.equal(1);
    });
});

