describe('DependencyInjectorItems Tests', function() {

  var di;
  var dependencyBinder;

  var DependencyInjectorItems;
  var dependencyInjectorItems;

  beforeEach(function() {
    var MockItem = function() {};

    global.dependencyInjectorItems = null;

    di = {};
    di.Inject = function() {};
    di.annotate = function() {};

    sinon.stub(di, "Inject", function() { this.tokens = []; });
    sinon.stub(di, "annotate", function(item, inject) { });

    dependencyBinder = {};
    dependencyBinder.get = function() {};

    sinon.stub(dependencyBinder, "get", function(scope) {
      if(scope) {
        return [ { item: MockItem, dependencies: [] }];
      }
      else {
        throw 'null scope exception';
      }
    });

    DependencyInjectorItems = require('../lib/dependencyinjectoritems');
    dependencyInjectorItems = new DependencyInjectorItems(di, dependencyBinder);
  });

  describe('get()', function() {

    it('is a function', function() {
      expect(dependencyInjectorItems.get).to.be.a('function');
    });

    it('should throw on null scope', function() {
      var getFunction = dependencyInjectorItems.get;
      var scope = null;

      expect(getFunction.bind(dependencyInjectorItems, scope)).to.throw('null scope exception');
    });

    it('should throw on undefined scope', function() {
      var getFunction = dependencyInjectorItems.get;
      var scope;

      expect(getFunction.bind(dependencyInjectorItems, scope)).to.throw('null scope exception');
    });

    it('should return items when valid scope', function() {
      var items = dependencyInjectorItems.get('singleton');

      expect(items.length).to.equal(1);
    });

    it('should call dependencyBinder get when valid scope', function() {
      var items = dependencyInjectorItems.get('singleton');

      expect(dependencyBinder.get.calledOnce).to.equal(true);
    });

    it('should return items from cache', function() {
      var CacheItem = function() { this.cacheItem = true; };

      global.dependencyInjectorItems = {};
      global.dependencyInjectorItems['singleton'] = [ CacheItem ];

      var items = dependencyInjectorItems.get('singleton');
      expect(items[0]).to.equal(CacheItem);
      expect(dependencyBinder.get.calledOnce).to.equal(false);
    });

  });

});
