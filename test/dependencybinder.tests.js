
describe('DependencyBinder Tests', function() {

  var DependencyBinder;
  var dependencyBinder;

  var dependencyItemBuilder;

  var MyItem = function(myDependency) {
    this.name = 'myClass';
    this.myDependency = myDependency;
  };

  var MyDependency = function() {
    this.name = 'myDependency';
  };

  beforeEach(function() {
    MockItem = function() {};

    dependencyItemBuilder = {};
    dependencyItemBuilder.buildInjectorItem = function() {};

    sinon.stub(dependencyItemBuilder, "buildInjectorItem", function(item, dependencies) {
      return MyItem;
    });

    DependencyBinder = require('../lib/dependencybinder');
    dependencyBinder = new DependencyBinder(dependencyItemBuilder);

    global.dependencyInjectorItems = null;
  });

  describe('bind()', function() {

    it('is a function', function() {
      expect(dependencyBinder.bind).to.be.a('function');
    });

    it('should throw on null item', function() {
      var bindFunction = dependencyBinder.bind;
      var item = null;

      expect(bindFunction.bind(dependencyBinder, item, [ MyDependency ], 'singleton')).to.throw('Parameter "item" cannot be null or undefined');
    });

    it('should throw on undefined item', function() {
      var bindFunction = dependencyBinder.bind;
      var item;

      expect(bindFunction.bind(dependencyBinder, item, [ MyDependency ], 'singleton')).to.throw('Parameter "item" cannot be null or undefined');
    });

    it('should throw on null scope', function() {
      var bindFunction = dependencyBinder.bind;
      var scope = null;

      expect(bindFunction.bind(dependencyBinder, MyItem, [ MyDependency ], scope)).to.throw('Dependency scope cannot be null or undefined. Valid scope types are "singleton", "webrequest", and "transient".');
    });

    it('should throw on undefined scope', function() {
      var bindFunction = dependencyBinder.bind;
      var scope;

      expect(bindFunction.bind(dependencyBinder, MyItem, [ MyDependency ], scope)).to.throw('Dependency scope cannot be null or undefined. Valid scope types are "singleton", "webrequest", and "transient".');
    });

    it('should throw on empty scope', function() {
      var bindFunction = dependencyBinder.bind;
      var scope = '';

      expect(bindFunction.bind(dependencyBinder, MyItem, [ MyDependency ], scope)).to.throw('Dependency scope cannot be null or undefined. Valid scope types are "singleton", "webrequest", and "transient".');
    });

    it('should throw on bad scope', function() {
      var bindFunction = dependencyBinder.bind;
      var scope = 'scopedoesnotexist';

      expect(bindFunction.bind(dependencyBinder, MyItem, [ MyDependency ], scope)).to.throw('Invalid dependency scope. Valid scope types are "singleton", "webrequest", and "transient".');
    });

    it('should add item with singleton scope to parent injector items', function() {
      dependencyBinder.bind(MyItem, [ MyDependency ], 'singleton');
      var items = dependencyBinder.parentInjectorItems();

      expect(items[0]).to.equal(MyItem);
    });

    it('should not add item with singleton scope to child injector items', function() {
      dependencyBinder.bind(MyItem, [ MyDependency ], 'singleton');
      var items = dependencyBinder.childInjectorItems();

      expect(items.length).to.equal(0);
    });

    it('should add item with webrequest scope', function() {
      dependencyBinder.bind(MyItem, [ MyDependency ], 'webrequest');
      var items = dependencyBinder.childInjectorItems();

      expect(items[0]).to.equal(MyItem);
    });

    it('should not add item with webrequest scope to parent injector items', function() {
      dependencyBinder.bind(MyItem, [ MyDependency ], 'webrequest');
      var items = dependencyBinder.parentInjectorItems();

      expect(items.length).to.equal(0);
    });

    it('should add item with transient scope to parent injector items', function() {
      dependencyBinder.bind(MyItem, [ MyDependency ], 'transient');
      var items = dependencyBinder.parentInjectorItems();

      expect(items[0]).to.equal(MyItem);
    });

    it('should not add item with transient scope to child injector items', function() {
      dependencyBinder.bind(MyItem, [ MyDependency ], 'transient');
      var items = dependencyBinder.childInjectorItems();

      expect(items.length).to.equal(0);
    });

    it('should add item with null dependencies', function() {
      var dependencies = null;
      dependencyBinder.bind(MyItem, dependencies, 'singleton');
      var items = dependencyBinder.parentInjectorItems();

      expect(items[0]).to.equal(MyItem);
    });

    it('should add item with undefined dependencies', function() {
      var dependencies;
      dependencyBinder.bind(MyItem, dependencies, 'singleton');
      var items = dependencyBinder.parentInjectorItems();

      expect(items[0]).to.equal(MyItem);
    });

  });

  describe('childInjectorItems()', function() {

    it('is a function', function() {
      expect(dependencyBinder.childInjectorItems).to.be.a('function');
    });

    it('should return empty items when no items bound', function() {
      var items = dependencyBinder.childInjectorItems();

      expect(items.length).to.equal(0);
    });

    it('should return one item when one item bound', function() {
      dependencyBinder.bind(MyItem, [ MyDependency ], 'webrequest');
      var items = dependencyBinder.childInjectorItems();

      expect(items.length).to.equal(1);
    });
  });

  describe('parentInjectorItems()', function() {

    it('is a function', function() {
      expect(dependencyBinder.parentInjectorItems).to.be.a('function');
    });

    it('should return empty items when no items bound', function() {
      var items = dependencyBinder.parentInjectorItems();

      expect(items.length).to.equal(0);
    });

    it('should return one item when one item bound', function() {
      dependencyBinder.bind(MyItem, [ MyDependency ], 'singleton');
      var items = dependencyBinder.parentInjectorItems();

      expect(items.length).to.equal(1);
    });
  });
});
