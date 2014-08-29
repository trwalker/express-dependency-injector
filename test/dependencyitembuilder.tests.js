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
    di.TransientScope = function() {};
    di.annotate = function() {};

    sinon.stub(di, "Inject", function() { this.tokens = []; });
    sinon.stub(di, "TransientScope", function() {});
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

      expect(buildInjectorItemFunction.bind(dependencyItemBuilder, item, [ MockDependency ], 'webrequest')).to.throw('Parameter "item" cannot be null or undefined');
    });

    it('should throw on null item', function() {
      var buildInjectorItemFunction = dependencyItemBuilder.buildInjectorItem;
      var item = null;

      expect(buildInjectorItemFunction.bind(dependencyItemBuilder, item, [ MockDependency ], 'webrequest')).to.throw('Parameter "item" cannot be null or undefined');
    });

    it('should throw on undefined scope', function() {
      var buildInjectorItemFunction = dependencyItemBuilder.buildInjectorItem;
      var scope;

      expect(buildInjectorItemFunction.bind(dependencyItemBuilder, MockItem, [ MockDependency ], scope)).to.throw('Parameter "scope" cannot be null or undefined');
    });

    it('should throw on null scope', function() {
      var buildInjectorItemFunction = dependencyItemBuilder.buildInjectorItem;
      var scope = null;

      expect(buildInjectorItemFunction.bind(dependencyItemBuilder, MockItem, [ MockDependency ], scope)).to.throw('Parameter "scope" cannot be null or undefined');
    });

    it('should return item when valid input', function() {
      var injectorItem = dependencyItemBuilder.buildInjectorItem(MockItem, [ MockDependency ], 'webrequest');

      expect(injectorItem).to.equal(MockItem);
    });

    it('should return item when undefined dependencies', function() {
      var dependencies;
      var injectorItem = dependencyItemBuilder.buildInjectorItem(MockItem, dependencies, 'webrequest');

      expect(injectorItem).to.equal(MockItem);
    });

    it('should return item when null dependencies', function() {
      var dependencies = null;
      var injectorItem = dependencyItemBuilder.buildInjectorItem(MockItem, dependencies, 'webrequest');

      expect(injectorItem).to.equal(MockItem);
    });

    it('should not call di.Inject() when null dependencies are passed', function() {
      var dependencies = null;
      var injectorItem = dependencyItemBuilder.buildInjectorItem(MockItem, dependencies, 'webrequest');

      expect(di.Inject.callCount).to.equal(0);
    });

    it('should call di.Inject() once when one dependency is passed', function() {
      var injectorItem = dependencyItemBuilder.buildInjectorItem(MockItem, [ MockDependency ], 'webrequest');

      expect(di.Inject.callCount).to.equal(1);
    });

    it('should call di.Inject() once when two dependencies are passed', function() {
      var injectorItem = dependencyItemBuilder.buildInjectorItem(MockItem, [ MockDependency, MockDependencyTwo ], 'webrequest');

      expect(di.Inject.callCount).to.equal(1);
    });

    it('should call di.TransientScope() once when transient scope and no dependencies passed', function() {
      var injectorItem = dependencyItemBuilder.buildInjectorItem(MockItem, [], 'transient');

      expect(di.TransientScope.callCount).to.equal(1);
    });

    it('should call di.TransientScope() once when transient scope and dependencies passed', function() {
      var injectorItem = dependencyItemBuilder.buildInjectorItem(MockItem, [ MockDependency ], 'transient');

      expect(di.TransientScope.callCount).to.equal(1);
    });

    it('should not call di.TransientScope() when non transient scope and no dependencies passed', function() {
      var injectorItem = dependencyItemBuilder.buildInjectorItem(MockItem, [], 'webrequest');

      expect(di.TransientScope.callCount).to.equal(0);
    });

    it('should call di.annotate() twice when transient scope and dependencies passed', function() {
      var injectorItem = dependencyItemBuilder.buildInjectorItem(MockItem, [ MockDependency ], 'transient');

      expect(di.annotate.callCount).to.equal(2);
    });

    it('should call di.annotate() once when transient scope and no dependencies passed', function() {
      var injectorItem = dependencyItemBuilder.buildInjectorItem(MockItem, [], 'transient');

      expect(di.annotate.callCount).to.equal(1);
    });

    it('should call di.annotate() once when non transient scope and dependencies passed', function() {
      var injectorItem = dependencyItemBuilder.buildInjectorItem(MockItem, [ MockDependency ], 'webrequest');

      expect(di.annotate.callCount).to.equal(1);
    });

    it('should not call di.annotate() when non transient scope and no dependencies passed', function() {
      var injectorItem = dependencyItemBuilder.buildInjectorItem(MockItem, [], 'webrequest');

      expect(di.annotate.callCount).to.equal(0);
    });

  });

});
