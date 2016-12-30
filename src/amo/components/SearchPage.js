import React, { PropTypes } from 'react';

import Link from 'amo/components/Link';
import Paginate from 'core/components/Paginate';
import SearchResults from 'amo/components/SearchResults';
import { convertFiltersToQueryParams } from 'core/searchUtils';


export default class SearchPage extends React.Component {
  static propTypes = {
    LinkComponent: PropTypes.node.isRequired,
    count: PropTypes.number,
    filters: PropTypes.object,
    hasSearchParams: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    page: PropTypes.number,
    pathname: PropTypes.string,
    queryParams: PropTypes.object,
    results: PropTypes.array,
  }

  static defaultProps = {
    LinkComponent: Link,
    filters: {},
    pathname: '/search/',
  }

  render() {
    const {
      LinkComponent, count, filters, hasSearchParams, loading, page, pathname,
      results,
    } = this.props;
    const queryParams = this.props.queryParams ||
      convertFiltersToQueryParams(filters);
    const paginator = count > 0 && hasSearchParams ? (
      <Paginate LinkComponent={LinkComponent} count={count} currentPage={page}
        pathname={pathname} queryParams={queryParams} showPages={0} />
    ) : [];

    return (
      <div className="SearchPage">
        <SearchResults count={count} hasSearchParams={hasSearchParams}
          filters={filters} loading={loading} results={results} />
        {paginator}
      </div>
    );
  }
}
