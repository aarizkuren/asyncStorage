/* globals asyncStorage */
/**
 * Created by asier on 19/11/14.
 */
describe("Testing asyncStorage", function () {
    beforeEach(function () {
    });

    afterEach(function () {

    });

    it("API", function () {
        expect(asyncStorage.getItem).to.be.a('function');
        expect(asyncStorage.setItem).to.be.a('function');
        expect(asyncStorage.removeItem).to.be.a('function');
        expect(asyncStorage.clear).to.be.a('function');
        expect(asyncStorage.length).to.be.a('function');
        expect(asyncStorage.key).to.be.a('function');
    });

    it('set, get, overwrite, get, remove, get', function (done) {
        // test basic set and get
        asyncStorage.setItem('foo', 'bar', function () {
            asyncStorage.getItem('foo', function (value) {
                expect(value).to.equal('bar');

                // now test overwrite and get
                asyncStorage.setItem('foo', 'overwritten', function () {
                    asyncStorage.getItem('foo', function (value) {
                        expect(value).to.equal('overwritten');

                        // now test remove and get
                        asyncStorage.removeItem('foo', function () {
                            asyncStorage.getItem('foo', function (value) {
                                expect(value).to.equal(null);
                                done();
                            });
                        });
                    });
                });
            });
        });
    });

    it('clear, length, key', function (done) {
        asyncStorage.clear(function () {
            asyncStorage.length(function (len) {
                // length should be 0 after clearing
                expect(len).to.be.equal(0);

                asyncStorage.setItem('key1', 'value1', function () {
                    asyncStorage.length(function (len) {
                        expect(len).to.be.equal(1);

                        asyncStorage.setItem('key2', 'value2', function () {
                            asyncStorage.length(function (len) {
                                expect(len).to.be.equal(2);

                                asyncStorage.setItem('key3', 'value3', function () {
                                    asyncStorage.length(function (len) {
                                        expect(len).to.be.equal(3);

                                        asyncStorage.key(0, function (key) {
                                            expect(key).to.be.equal('key1');

                                            asyncStorage.key(1, function (key) {
                                                expect(key).to.be.equal('key2');

                                                asyncStorage.key(2, function (key) {
                                                    expect(key).to.be.equal('key3');

                                                    asyncStorage.clear(function () {
                                                        asyncStorage.key(0, function (key) {
                                                            expect(key).to.be.equal(null);
                                                            asyncStorage.length(function (len) {
                                                                expect(len).to.be.equal(0);

                                                                done();
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});
