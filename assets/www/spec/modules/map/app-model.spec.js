/**
 * Tests for the AppModel
 */

describe('App model', function () {
  describe('instantiation', function () {
    beforeEach(function () {
      this.server = sinon.fakeServer.create();
      this.server.respondWith(
          "GET",
          Campuses.prototype.url(),
          this.validResponse(this.fixtures.Campuses.valid)
      );
      this.server.autoRespond = true;
    });

    it('should fetch campuses when menu==true', function () {
      var self = this;
      runs(function () {
        this.model = new AppModel({menu: true});
        self.server.respond();
      });

      waitsFor(function () {
        return self.model.campuses.length > 0;
      });

      runs(function () {
        expect(self.model.campuses).toBeDefined();
        expect(self.model.campuses.length).toEqual(2);
      });
    });
  });
});
