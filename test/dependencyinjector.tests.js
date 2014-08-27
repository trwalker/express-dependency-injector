describe('DependencyInjector Tests', function() {

  var di;
  var req;
  var dependencyBinder;

  var DependencyInjector;
  var dependencyInjector;

  beforeEach(function() {
    var MockItem = function() {};

    global.dependencyInjector = null;
    global.dependencyInjectorItems = null;

    di = {};
    di.Injector = function() { this.createChild = function() { } };

    sinon.stub(di, "Injector", function() { this.createChild = function() { return {}; }; });

    req = {};

    dependencyBinder = {};
    dependencyBinder.get = function() {};

    sinon.stub(dependencyBinder, "get", function(scope) {
      if(scope) {
        return [ MockItem ];
      }
      else {
        throw 'null scope exception';
      }
    });

    DependencyInjector = require('../lib/dependencyinjector');
    dependencyInjector = new DependencyInjector(di, dependencyBinder);    
  });

  describe('initialize()', function() {

    it('is a function', function() {
      expect(dependencyInjector.initialize).to.be.a('function');
    });

    it('should create dependency injectors', function() {
      dependencyInjector.initialize(req);

      expect(global).to.have.property('dependencyInjector');
      expect(req).to.have.property('dependencyInjector');
    });

    it('should throw error when req is undefined', function() {
      var initializeMethod = dependencyInjector.initialize;
      var request;

      expect(initializeMethod.bind(dependencyInjector, request)).to.throw('Express request object must be passed to initialize() and cannot be null or undefined');
    });

    it('should call dependencyBinder get() twice on first call', function() {
      dependencyInjector.initialize(req);

      expect(dependencyBinder.get.callCount).to.equal(2);
    });

    it('should call dependencyBinder get() once after first call', function() {
      dependencyInjector.initialize(req);
      dependencyInjector.initialize(req);

      expect(dependencyBinder.get.callCount).to.equal(3);
    });
  });

});
