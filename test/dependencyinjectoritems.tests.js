describe('DependencyItemBuilder Tests', function() {

  var MockItem;
  var MockDependency;
  var MockDependencyTwo;

  var di;

  var DependencyItemBuilder;
  var dependencyItemBuilder;

  beforeEach(function() {
    MockItem = function() {};
    MockDependency = function() {};
    MockDependencyTwo = function() {};

    di = {};
    di.Inject = function() {};
    di.annotate = function() {};

    sinon.stub(di, "Inject", function() { this.tokens = []; });
    sinon.stub(di, "annotate", function(item, inject) { });

    DependencyItemBuilder = require('../lib/dependencyitembuilder');
    dependencyItemBuilder = new DependencyItemBuilder(di);
  });

  describe('buildInjectorItem()', function() {

    it('is a function', function() {
      expect(dependencyItemBuilder.buildInjectorItem).to.be.a('function');
    });

    it('should throw on undefined item', function() {
      var buildInjectorItemFunction = dependencyItemBuilder.buildInjectorItem;
      var item;

      expect(buildInjectorItemFunction.bind(dependencyItemBuilder, item, [ MockDependency ])).to.throw('Parameter "item" cannot be null or undefined');
    });

    it('should throw on null item', function() {
      var buildInjectorItemFunction = dependencyItemBuilder.buildInjectorItem;
      var item = null;

      expect(buildInjectorItemFunction.bind(dependencyItemBuilder, item, [ MockDependency ])).to.throw('Parameter "item" cannot be null or undefined');
    });

    it('should return item when valid input', function() {
      var injectorItem = dependencyItemBuilder.buildInjectorItem(MockItem, [ MockDependency ]);

      expect(injectorItem).to.equal(MockItem);
    });

    it('should return item when undefined dependencies', function() {
      var dependencies;
      var injectorItem = dependencyItemBuilder.buildInjectorItem(MockItem, dependencies);

      expect(injectorItem).to.equal(MockItem);
    });

    it('should return item when null dependencies', function() {
      var dependencies = null;
      var injectorItem = dependencyItemBuilder.buildInjectorItem(MockItem, dependencies);

      expect(injectorItem).to.equal(MockItem);
    });

    it('should not call di.Inject() when null dependencies are passed', function() {
      var dependencies = null;
      var injectorItem = dependencyItemBuilder.buildInjectorItem(MockItem, dependencies);

      expect(di.Inject.callCount).to.equal(0);
    });

    it('should call di.Inject() once when one dependency is passed', function() {
      var injectorItem = dependencyItemBuilder.buildInjectorItem(MockItem, [ MockDependency ]);

      expect(di.Inject.callCount).to.equal(1);
    });

    it('should call di.Inject() once when two dependencies are passed', function() {
      var injectorItem = dependencyItemBuilder.buildInjectorItem(MockItem, [ MockDependency, MockDependencyTwo ]);

      expect(di.Inject.callCount).to.equal(1);
    });

    it('should not call di.annotate() when null dependecies are passed', function() {
      var dependencies = null;
      var injectorItem = dependencyItemBuilder.buildInjectorItem(MockItem, dependencies);

      expect(di.annotate.callCount).to.equal(0);
    });

    it('should call di.annotate() once when one dependecy is passed', function() {
      var dependencies = null;
      var injectorItem = dependencyItemBuilder.buildInjectorItem(MockItem, [ MockDependency ]);

      expect(di.annotate.callCount).to.equal(1);
    });

    it('should call di.annotate() once when two dependecies are passed', function() {
      var dependencies = null;
      var injectorItem = dependencyItemBuilder.buildInjectorItem(MockItem, [ MockDependency, MockDependencyTwo ]);

      expect(di.annotate.callCount).to.equal(1);
    });

  });

});
