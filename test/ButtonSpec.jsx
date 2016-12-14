/*global describe, it, assert */

var React          = require('react');
var ReactTestUtils = require('react/lib/ReactTestUtils');
var Button         = require('../lib/Button');

describe('Button', function () {
  it('Should output a button', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <Button>
        Title
      </Button>
    );
    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'BUTTON');
  });

  it('Should output a component with button classes', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <Button componentClass='input'>
        Title
      </Button>
    );
    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'INPUT');
    assert.equal(ReactDOM.findDOMNode(instance).getAttribute('class'), 'btn btn-default');
  });

  it('Should have type=button by default', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <Button>
        Title
      </Button>
    );
    assert.equal(ReactDOM.findDOMNode(instance).getAttribute('type'), 'button');
  });

  it('Should show the type if passed one', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <Button type='submit'>
        Title
      </Button>
    );
    assert.equal(ReactDOM.findDOMNode(instance).getAttribute('type'), 'submit');
  });

  it('Should output an anchor if called with a href', function () {
    var href = '/url';
    var instance = ReactTestUtils.renderIntoDocument(
      <Button href={href}>
        Title
      </Button>
    );
    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'A');
    assert.equal(ReactDOM.findDOMNode(instance).getAttribute('href'), href);
  });

  it('Should output an input if called with a href and an input component', function () {
    var href = '/url';
    var instance = ReactTestUtils.renderIntoDocument(
      <Button href={href} componentClass='input'>
        Title
      </Button>
    );
    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'INPUT');
    assert.equal(ReactDOM.findDOMNode(instance).getAttribute('href'), href);
  });

  it('Should output an anchor if called with a target', function () {
    var target = '_blank';
    var instance = ReactTestUtils.renderIntoDocument(
      <Button target={target}>
        Title
      </Button>
    );
    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'A');
    assert.equal(ReactDOM.findDOMNode(instance).getAttribute('target'), target);
  });

  it('Should call onClick callback', function (done) {
    var doneOp = function () {
      done();
    };
    var instance = ReactTestUtils.renderIntoDocument(
      <Button onClick={doneOp}>
        Title
      </Button>
    );
    ReactTestUtils.Simulate.click(ReactDOM.findDOMNode(instance));
  });

  it('Should be disabled', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <Button disabled>
        Title
      </Button>
    );
    assert.ok(ReactDOM.findDOMNode(instance).disabled);
  });

  it('Should be disabled link', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <Button disabled href='#'>
        Title
      </Button>
    );
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bdisabled\b/));
  });

  it('Should have block class', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <Button block>
        Title
      </Button>
    );
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bbtn-block\b/));
  });

  it('Should apply bsStyle class', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <Button bsStyle='danger'>
        Title
      </Button>
    );
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bbtn-danger\b/));
  });

  it('Should honour additional classes passed in, adding not overriding', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <Button className="bob" bsStyle="danger">
        Title
      </Button>
    );
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bbob\b/));
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bbtn-danger\b/));
  });

  it('Should default to bsStyle="default"', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <Button bsStyle='default'>
        Title
      </Button>
    );
    assert.equal(instance.props.bsStyle, 'default');
  });

  it('Should be active', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <Button active>
        Title
      </Button>
    );
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bactive\b/));
  });

  it('Should render an anchor in a list item when in a nav', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <Button navItem active>
        Title
      </Button>
    );

    var li = ReactDOM.findDOMNode(instance);
    var anchor = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a');
    assert.equal(li.nodeName, 'LI');
    assert.ok(li.className.match(/\bactive\b/));
    assert.ok(anchor.props.href, '#');
  });

  it('Should render an anchor when in a navDropdown', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <Button navDropdown>
        Title
      </Button>
    );

    var anchor = ReactDOM.findDOMNode(instance);
    assert.equal(anchor.nodeName, 'A');
    assert.ok(anchor.getAttribute('href'), '#');
  });
});
