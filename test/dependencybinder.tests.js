
describe('DependencyBinder Tests', function() {

  var DependencyBinder;
  var dependencyBinder;

  var MyDependency = function() {
    this.name = 'mydependency';
  };

  var MyClass = function(myDependency) {
    this.name = 'myclass';
    this.myDependency = myDependency;
  };

  beforeEach(function() {
    DependencyBinder = require('../lib/dependencybinder');
    dependencyBinder = new DependencyBinder();
    dependencyBinder.clear();
  });

  describe('bind()', function() {

    it('is a function', function() {
      expect(dependencyBinder.bind).to.be.a('function');
    });

    it('should throw on null item', function() {
      var bindFunction = dependencyBinder.bind;
      var item = null;

      expect(bindFunction.bind(dependencyBinder, item, [MyDependency], 'singleton')).to.throw('Dependency item cannot be null or undefined');
    });

    it('should throw on undefined item', function() {
      var bindFunction = dependencyBinder.bind;
      var item;

      expect(bindFunction.bind(dependencyBinder, item, [MyDependency], 'singleton')).to.throw('Dependency item cannot be null or undefined');
    });

    it('should throw on null scope', function() {
      var bindFunction = dependencyBinder.bind;
      var scope = null;

      expect(bindFunction.bind(dependencyBinder, MyClass, [MyDependency], scope)).to.throw('Dependency scope cannot be null or undefined. Valid scope types are "singleton", "webrequest", and "transient".');
    });

    it('should throw on undefined scope', function() {
      var bindFunction = dependencyBinder.bind;
      var scope;

      expect(bindFunction.bind(dependencyBinder, MyClass, [MyDependency], scope)).to.throw('Dependency scope cannot be null or undefined. Valid scope types are "singleton", "webrequest", and "transient".');
    });

    it('should throw on empty scope', function() {
      var bindFunction = dependencyBinder.bind;
      var scope = '';

      expect(bindFunction.bind(dependencyBinder, MyClass, [MyDependency], scope)).to.throw('Dependency scope cannot be null or undefined. Valid scope types are "singleton", "webrequest", and "transient".');
    });

    it('should throw on bad scope', function() {
      var bindFunction = dependencyBinder.bind;
      var scope = 'scopedoesnotexist';

      expect(bindFunction.bind(dependencyBinder, MyClass, [MyDependency], scope)).to.throw('Invalid dependency scope. Valid scope types are "singleton", "webrequest", and "transient".');
    });

    it('should add item with singleton scope', function() {
      dependencyBinder.bind(MyDependency, [], 'singleton');
      var items = dependencyBinder.get('singleton');

      expect(items[0].item).to.equal(MyDependency);
    });

    it('should add item with webrequest scope', function() {
      dependencyBinder.bind(MyDependency, [], 'webrequest');
      var items = dependencyBinder.get('webrequest');

      expect(items[0].item).to.equal(MyDependency);
    });

    it('should add item with transient scope', function() {
      dependencyBinder.bind(MyDependency, [], 'transient');
      var items = dependencyBinder.get('transient');

      expect(items[0].item).to.equal(MyDependency);
    });

    it('should add item with dependencies', function() {
      dependencyBinder.bind(MyClass, [MyDependency], 'singleton');
      var items = dependencyBinder.get('singleton');

      expect(items[0].dependencies[0]).to.equal(MyDependency);
    });

    it('should add item with null dependencies', function() {
      var dependencies = null;
      dependencyBinder.bind(MyDependency, dependencies, 'singleton');
      var items = dependencyBinder.get('singleton');

      expect(items[0].item).to.equal(MyDependency);
      expect(items[0].dependencies.length).to.equal(0);
    });

    it('should add item with undefined dependencies', function() {
      var dependencies;
      dependencyBinder.bind(MyDependency, dependencies, 'singleton');
      var items = dependencyBinder.get('singleton');

      expect(items[0].item).to.equal(MyDependency);
      expect(items[0].dependencies.length).to.equal(0);
    });

  });

  describe('get()', function() {

    it('is a function', function() {
      expect(dependencyBinder.get).to.be.a('function');
    });

    it('should throw on null scope', function() {
      var getFunction = dependencyBinder.get;
      var scope = null;

      expect(getFunction.bind(dependencyBinder, scope)).to.throw('Dependency scope cannot be null or undefined. Valid scope types are "singleton", "webrequest", and "transient".');
    });

    it('should throw on undefined scope', function() {
      var getFunction = dependencyBinder.get;
      var scope;

      expect(getFunction.bind(dependencyBinder, scope)).to.throw('Dependency scope cannot be null or undefined. Valid scope types are "singleton", "webrequest", and "transient".');
    });

    it('should throw on empty scope', function() {
      var getFunction = dependencyBinder.get;
      var scope = '';

      expect(getFunction.bind(dependencyBinder, scope)).to.throw('Dependency scope cannot be null or undefined. Valid scope types are "singleton", "webrequest", and "transient".');
    });

    it('should throw on bad scope', function() {
      var getFunction = dependencyBinder.get;
      var scope = 'scopedoesnotexist';

      expect(getFunction.bind(dependencyBinder, scope)).to.throw('Invalid dependency scope. Valid scope types are "singleton", "webrequest", and "transient".');
    });

    it('should return empty items on valid scope', function() {
      var scope = 'singleton';
      var items = dependencyBinder.get(scope);

      expect(items.length).to.equal(0);
    });
  });

});
