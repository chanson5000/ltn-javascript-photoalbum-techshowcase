import chai, {expect} from 'chai';
import sinonChai from 'sinon-chai';
import sinon from 'sinon';
import axios from 'axios';
import {getAllPhotos} from '../src/photo-album-service';

chai.use(sinonChai);

const sandbox = sinon.createSandbox();

describe('Photo Test', () => {
    let catchStub;
    let thenStub;
    let callback;

    beforeEach(() => {
        catchStub = sandbox.stub();
        callback = sandbox.stub();
        thenStub = sandbox.stub().returns({catch: catchStub});
        sandbox.stub(axios, 'get').returns({then: thenStub});
        getAllPhotos(callback);
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('when Album Service Is Called', () => {

        beforeEach(() => {
            thenStub.yield('tacos');

        });

        it('album service should call out', () => {
            expect(axios.get).to.have.callCount(1);
            expect(axios.get).to.be.calledWith('http://jsonplaceholder.typicode.com/photos')
        });
        it('get all photos should yield tacos', () => {
            expect(callback).to.be.calledWith(null, 'tacos');
        });

    })

    describe('When album service returns an error', () => {
        beforeEach(() => {
            catchStub.yield('taco');
        });

        it('Should yield taco error', () => {
            expect(callback).to.be.calledWith('taco');
        });

    })
});

