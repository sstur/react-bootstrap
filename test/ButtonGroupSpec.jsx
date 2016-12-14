/*global describe, it, assert */

var React          = require('react');
var ReactTestUtils = require('react/lib/ReactTestUtils');
var ButtonGroup    = require('../lib/ButtonGroup');
var Button         = require('../lib/Button');

describe('ButtonGroup', function () {
  it('Should output a button group', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <ButtonGroup>
        <Button>
          Title
        </Button>
      </ButtonGroup>
    );
    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'DIV');
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bbtn-group\b/));
  });

  it('Should add size', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <ButtonGroup bsSize='large'>
        <Button>
          Title
        </Button>
      </ButtonGroup>
    );
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bbtn-group-lg\b/));
  });

  it('Should add vertical variation', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <ButtonGroup vertical>
        <Button>
          Title
        </Button>
      </ButtonGroup>
    );
    assert.equal(ReactDOM.findDOMNode(instance).className.trim(), 'btn-group-vertical');
  });

  it('Should add justified variation', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <ButtonGroup justified>
        <Button>
          Title
        </Button>
      </ButtonGroup>
    );
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bbtn-group-justified\b/));
  });
});
