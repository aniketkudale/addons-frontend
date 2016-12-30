import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { compose } from 'redux';

import SearchResults from 'amo/components/SearchResults';
import { loadFeaturedAddons } from 'amo/utils';
import { EXTENSION_TYPE, THEME_TYPE } from 'core/constants';
import translate from 'core/i18n/translate';

import './FeaturedAddons.scss';


export class FeaturedAddonsBase extends React.Component {
  static propTypes = {
    addonType: PropTypes.string.isRequired,
    hasSearchParams: PropTypes.bool.isRequired,
    i18n: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    results: PropTypes.array,
  }

  headerForAddonType(addonType) {
    const { i18n } = this.props;

    switch (addonType) {
      case EXTENSION_TYPE:
        return i18n.gettext('More Featured Extensions');
      // TODO: Change this to API_THEME_TYPE once
      // https://github.com/mozilla/addons-frontend/issues/1545 is fixed.
      case THEME_TYPE:
        return i18n.gettext('More Featured Themes');
      default:
        throw new Error(`Invalid addonType: "${addonType}"`);
    }
  }

  render() {
    const { addonType, hasSearchParams, loading, results } = this.props;

    return (
      <div className="FeaturedAddons">
        <h2 className="FeaturedAddons-header">
          {this.headerForAddonType(addonType)}
        </h2>
        <SearchResults count={results.length} hasSearchParams={hasSearchParams}
          loading={loading} results={results} />
      </div>
    );
  }
}

export function mapStateToProps(state) {
  return { hasSearchParams: true, ...state.featured };
}

export default compose(
  asyncConnect([
    { deferred: true, promise: loadFeaturedAddons },
  ]),
  connect(mapStateToProps),
  translate(),
)(FeaturedAddonsBase);
