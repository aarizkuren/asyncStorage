/* globals asyncStorage */
/**
 * Created by asier on 19/11/14.
 */
describe("Testing asyncStorage", function () {
    beforeEach(function () {

    });

    afterEach(function () {

    });

    it("API", function (done) {
        expect(asyncStorage.getItem).to.be.a('function');
        expect(asyncStorage.setItem).to.be.a('function');
        expect(asyncStorage.removeItem).to.be.a('function');
        expect(asyncStorage.clear).to.be.a('function');
        expect(asyncStorage.length).to.be.a('function');
        expect(asyncStorage.key).to.be.a('function');
        done();
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
        done();
    });
});
