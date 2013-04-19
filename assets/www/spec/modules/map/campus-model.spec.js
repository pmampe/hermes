describe('Campus model', function () {
  describe('when creating an empty Campus', function () {
    beforeEach(function () {
      this.campus = new Campus();
    });

    it('should have id 0', function () {
      expect(this.campus.get('id')).toEqual(0);
    });

    it('should have name "Unknown"', function () {
      expect(this.campus.get('name')).toEqual('Unknown');
    });

    it('should have coords', function () {
      expect(this.campus.get('coords')).toBeDefined();
    });

    it('should have zoom', function () {
      expect(this.campus.get('zoom')).toBeDefined();
    });
  });

  describe('getLat', function () {
    it('should return latitude from coords', function () {
      this.campus = new Campus({ coords: [10, 20] });

      expect(this.campus.getLat()).toEqual(10);
    });
  });

  describe('getLng', function () {
    it('should return longitude from coords', function () {
      this.campus = new Campus({ coords: [10, 20] });

      expect(this.campus.getLng()).toEqual(20);
    });
  });
});

describe('Campus collection', function () {
  describe('creating an empty collection', function () {
    beforeEach(function () {
      this.campuses = new Campuses();
    });

    it('should have Campus for model', function () {
      expect(this.campuses.model).toBe(Campus);
    });

    it('should have a url from config', function () {
      expect(this.campuses.url()).toMatch(config.map.campuses.url);
    });
  });
});
