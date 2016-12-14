/*global describe, beforeEach, afterEach, it, assert */

var ReactDOM       = require('react-dom');
var ReactTestUtils = require('react/lib/ReactTestUtils');
var DropdownButton = require('../lib/DropdownButton');
var MenuItem       = require('../lib/MenuItem');
var DropdownMenu   = require('../lib/DropdownMenu');
var Button         = require('../lib/Button');

describe('DropdownButton', function () {
  var instance;

  afterEach(function() {
    if (instance && ReactTestUtils.isCompositeComponent(instance) && instance.isMounted()) {
      ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(instance).parent);
    }
  });

  it('Should render button correctly', function () {
    instance = ReactTestUtils.renderIntoDocument(
      <DropdownButton title="Title" className="test-class">
        <MenuItem eventKey="1">MenuItem 1 content</MenuItem>
        <MenuItem eventKey="2">MenuItem 2 content</MenuItem>
      </DropdownButton>
    );

    var button = ReactTestUtils.findRenderedComponentWithType(instance, Button).getDOMNode();
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bbtn-group\b/));
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\btest-class\b/));
    assert.ok(button.className.match(/\bbtn\b/));
    assert.equal(button.nodeName, 'BUTTON');
    assert.equal(button.type, 'button');
    assert.ok(button.className.match(/\bdropdown-toggle\b/));
    assert.ok(button.lastChild.className.match(/\bcaret\b/));
    assert.equal(button.innerText.trim(), 'Title');
  });

  it('Should render menu correctly', function () {
    instance = ReactTestUtils.renderIntoDocument(
      <DropdownButton title="Title">
        <MenuItem eventKey="1">MenuItem 1 content</MenuItem>
        <MenuItem eventKey="2">MenuItem 2 content</MenuItem>
      </DropdownButton>
    );

    var menu = ReactTestUtils.findRenderedComponentWithType(instance, DropdownMenu);
    var allMenuItems = ReactTestUtils.scryRenderedComponentsWithType(menu, MenuItem);
    assert.equal(allMenuItems.length, 2);
  });

  it('Should pass props to button', function () {
    instance = ReactTestUtils.renderIntoDocument(
      <DropdownButton title="Title" bsStyle="primary" id="testId" disabled>
        <MenuItem eventKey="1">MenuItem 1 content</MenuItem>
        <MenuItem eventKey="2">MenuItem 2 content</MenuItem>
      </DropdownButton>
    );

    var button = ReactTestUtils.findRenderedComponentWithType(instance, Button).getDOMNode();
    assert.ok(button.className.match(/\bbtn-primary\b/));
    assert.equal(button.getAttribute('id'), 'testId');
    assert.ok(button.disabled);
  });

  it('Should be closed by default', function () {
    instance = ReactTestUtils.renderIntoDocument(
      <DropdownButton title="Title">
        <MenuItem eventKey="1">MenuItem 1 content</MenuItem>
        <MenuItem eventKey="2">MenuItem 2 content</MenuItem>
      </DropdownButton>);

    assert.notOk(ReactDOM.findDOMNode(instance).className.match(/\bopen\b/));
  });

  it('Should open when clicked', function () {
    instance = ReactTestUtils.renderIntoDocument(
      <DropdownButton title="Title">
        <MenuItem eventKey="1">MenuItem 1 content</MenuItem>
        <MenuItem eventKey="2">MenuItem 2 content</MenuItem>
      </DropdownButton>
    );

    ReactTestUtils.SimulateNative.click(ReactDOM.findDOMNode(instance.refs.dropdownButton));
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bopen\b/));
  });

  it('should call onSelect with eventKey when MenuItem is clicked', function (done) {
    function handleSelect(eventKey) {
      assert.equal(eventKey, '2');
      assert.equal(instance.state.open, false);
      done();
    }

    instance = ReactTestUtils.renderIntoDocument(
      <DropdownButton title="Title" onSelect={handleSelect}>
        <MenuItem eventKey='1'>MenuItem 1 content</MenuItem>
        <MenuItem eventKey='2'>MenuItem 2 content</MenuItem>
      </DropdownButton>
    );

    var menuItems = ReactTestUtils.scryRenderedComponentsWithType(instance, MenuItem);
    assert.equal(menuItems.length, 2);
    ReactTestUtils.SimulateNative.click(
      ReactTestUtils.findRenderedDOMComponentWithTag(menuItems[1], 'a')
    );
  });

  it('should call MenuItem onSelect with eventKey when MenuItem is clicked', function (done) {
    function handleSelect(eventKey) {
      assert.equal(eventKey, '2');
      assert.equal(instance.state.open, false);
      done();
    }

    instance = ReactTestUtils.renderIntoDocument(
      <DropdownButton title="Title">
        <MenuItem eventKey='1'>MenuItem 1 content</MenuItem>
        <MenuItem eventKey='2' onSelect={handleSelect}>MenuItem 2 content</MenuItem>
      </DropdownButton>
    );

    var menuItems = ReactTestUtils.scryRenderedComponentsWithType(instance, MenuItem);
    assert.equal(menuItems.length, 2);
    ReactTestUtils.SimulateNative.click(
      ReactTestUtils.findRenderedDOMComponentWithTag(menuItems[1], 'a')
    );
  });

  it('should not set onSelect to child with no onSelect prop', function () {
    instance = ReactTestUtils.renderIntoDocument(
      <DropdownButton title="Title">
        <MenuItem eventKey={1}>MenuItem 1 content</MenuItem>
        <MenuItem eventKey={2}>MenuItem 2 content</MenuItem>
      </DropdownButton>
    );

    var menuItems = ReactTestUtils.scryRenderedComponentsWithType(instance, MenuItem);
    assert.notOk(menuItems[0].props.onSelect);
  });

  describe('when open', function () {
    beforeEach(function () {
      instance = ReactTestUtils.renderIntoDocument(
        <DropdownButton title="Title">
          <MenuItem eventKey={1}>MenuItem 1 content</MenuItem>
          <MenuItem eventKey={2}>MenuItem 2 content</MenuItem>
        </DropdownButton>
      );

      instance.setDropdownState(true);
    });

    it('should close on click', function () {
      var evt = document.createEvent('HTMLEvents');
      evt.initEvent('click', true, true);
      document.documentElement.dispatchEvent(evt);

      assert.notOk(ReactDOM.findDOMNode(instance).className.match(/\bopen\b/));
    });
  });

  it('Should render li when in nav', function () {
    instance = ReactTestUtils.renderIntoDocument(
      <DropdownButton title="Title" className="test-class" navItem>
        <MenuItem eventKey="1">MenuItem 1 content</MenuItem>
        <MenuItem eventKey="2">MenuItem 2 content</MenuItem>
      </DropdownButton>
    );

    var li = ReactDOM.findDOMNode(instance);
    var button = ReactTestUtils.findRenderedComponentWithType(instance, Button).getDOMNode();
    assert.equal(li.nodeName, 'LI');
    assert.ok(li.className.match(/\bdropdown\b/));
    assert.ok(li.className.match(/\btest-class\b/));
    assert.equal(button.nodeName, 'A');
    assert.ok(button.className.match(/\bdropdown-toggle\b/));
    assert.ok(button.lastChild.className.match(/\bcaret\b/));
    assert.equal(button.innerText.trim(), 'Title');
  });

  it('should render a caret by default', function() {
    instance = ReactTestUtils.renderIntoDocument(
        <DropdownButton title="Title">
          <MenuItem eventKey="1">MenuItem 1 content</MenuItem>
          <MenuItem eventKey="2">MenuItem 2 content</MenuItem>
        </DropdownButton>
    );

    var button = ReactTestUtils.findRenderedComponentWithType(instance, Button).getDOMNode();
    var carets = button.getElementsByClassName('caret');
    assert.equal(carets.length, 1);
  });

  it('should not render a caret if noCaret prop is given', function() {
    instance = ReactTestUtils.renderIntoDocument(
        <DropdownButton title="Title" noCaret>
          <MenuItem eventKey="1">MenuItem 1 content</MenuItem>
          <MenuItem eventKey="2">MenuItem 2 content</MenuItem>
        </DropdownButton>
    );

    var button = ReactTestUtils.findRenderedComponentWithType(instance, Button).getDOMNode();
    var carets = button.getElementsByClassName('caret');
    assert.equal(carets.length, 0);
  });
});
