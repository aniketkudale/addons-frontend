import classNames from 'classnames';
import React, { PropTypes } from 'react';
import { compose } from 'redux';

import SearchSortLink from 'amo/components/SearchSortLink';
import translate from 'core/i18n/translate';

import './SearchSort.scss';


export class SearchSortBase extends React.Component {
  static propTypes = {
    _searchToggle: PropTypes.object.isRequired,
    filters: PropTypes.object.isRequired,
    i18n: PropTypes.object.isRequired,
    pathname: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = { sortVisible: false };
  }

  onClick = (event) => {
    event.preventDefault();
    this.toggleSort(this.props._searchToggle || this.searchToggle);
  }

  sortOptions() {
    const { i18n } = this.props;

    return [
      { sort: 'updated', text: i18n.gettext('Recently Updated') },
      { sort: 'relevance', text: i18n.gettext('Relevance') },
      { sort: 'users', text: i18n.gettext('Most Users') },
      { sort: 'rating', text: i18n.gettext('Top Rated') },
    ];
  }

  toggleSort(searchToggle) {
    // const searchToggle = _searchToggle || this.searchToggle;
    // Blur the search sort toggle if we're closing it.
    if (this.state.sortVisible) {
      searchToggle.blur();
    }
    this.setState({ sortVisible: !this.state.sortVisible });
  }

  render() {
    const { filters, i18n, pathname } = this.props;
    const { sortVisible } = this.state;
    const currentSort = filters.sort || 'relevance';

    return (
      <div className={classNames('SearchSort', {
        'SearchSort--visible': sortVisible,
      })}>
        <a className="SearchSort-toggle" href="#SearchSortOptions"
          ref={(ref) => { this.searchToggle = ref; }} onClick={this.onClick}>
          {i18n.gettext('Sort')}
        </a>
        <ul id="SearchSortOptions" className="SearchSort-list">
          {this.sortOptions().map((option) => (
            <li className="SearchSort-list-item">
              <SearchSortLink currentSort={currentSort} filters={filters}
                pathname={pathname} sort={option.sort}>
                {option.text}
              </SearchSortLink>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default compose(
  translate({ withRef: true }),
)(SearchSortBase);
