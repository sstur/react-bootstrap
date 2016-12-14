/*global describe, beforeEach, afterEach, it, assert */

var React          = require('react');
var ReactTestUtils = require('react/lib/ReactTestUtils');
var Glyphicon      = require('../lib/Glyphicon');

describe('Glyphicon', function () {
  it('Should have correct class', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <Glyphicon glyph='star' />
    );
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bglyphicon\b/));
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bglyphicon-star\b/));
  });
});
