import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  Simulate,
  findRenderedComponentWithType,
  renderIntoDocument,
} from 'react-addons-test-utils';
import { Provider } from 'react-redux';

import createStore from 'amo/store';
import I18nProvider from 'core/i18n/Provider';
import SearchSort from 'amo/components/SearchSort';
import { getFakeI18nInst } from 'tests/client/helpers';


function render(props) {
  const initialState = { api: { clientApp: 'android', lang: 'en-GB' } };

  return findRenderedComponentWithType(renderIntoDocument(
    <Provider store={createStore(initialState)}>
      <I18nProvider i18n={getFakeI18nInst()}>
        <SearchSort {...props} />
      </I18nProvider>
    </Provider>
  ), SearchSort);
}

describe('<SearchSortBase />', () => {
  it('toggles the search sort options when clicking "sort" link', () => {
    const root = render({ filters: { query: 'test' }, pathname: '/search/' });
    const rootNode = findDOMNode(root);

    assert.notInclude(rootNode.className, 'SearchSort--visible');

    Simulate.click(rootNode.querySelector('.SearchSort-toggle'));

    assert.include(rootNode.className, 'SearchSort--visible');
  });

  it('blurs the search sort toggle when closing the sort options', () => {
    const searchToggle = { blur: sinon.stub() };
    const root = render({
      _searchToggle: searchToggle,
      filters: { query: 'test' },
      pathname: '/search/',
    });
    const rootNode = findDOMNode(root);

    assert.ok(searchToggle.blur.notCalled);

    // Open the sort options.
    Simulate.click(rootNode.querySelector('.SearchSort-toggle'));
    assert.ok(searchToggle.blur.notCalled);

    // Close the sort options, which should blur the toggle link.
    Simulate.click(rootNode.querySelector('.SearchSort-toggle'));
    assert.ok(searchToggle.blur.called);
  });
  //
  // it('is expanded by default', () => {
  //   const root = render({ children: 'Hello I am description' });
  //   assert.strictEqual(root.state.expanded, true);
  // });
  //
  // it('truncates the contents if they are too long', () => {
  //   const root = render({ children: 'Hello I am description' });
  //   root.truncateToMaxHeight({ clientHeight: 101 });
  //   assert.strictEqual(root.state.expanded, false);
  // });
  //
  // it('renders className', () => {
  //   const root = render({
  //     children: <p>Hi</p>,
  //     className: 'test',
  //   });
  //   const rootNode = findDOMNode(root);
  //   assert.include(rootNode.className, 'test');
  // });
  //
  // it('renders header and footer', () => {
  //   const root = render({ header: 'What is up', footer: 'I am down' });
  //   const rootNode = findDOMNode(root);
  //   assert.equal(rootNode.querySelector('h2').textContent, 'What is up');
  //   assert.equal(
  //     rootNode.querySelector('.Card-footer').textContent, 'I am down');
  // });
  //
  // it('renders children', () => {
  //   const root = render({ children: 'Hello I am description' });
  //   const rootNode = findDOMNode(root);
  //   assert.include(rootNode.textContent, 'Hello I am description');
  // });
});
