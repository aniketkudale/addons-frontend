import createStore from 'amo/store';
import * as featuredActions from 'amo/actions/featured';
import * as landingActions from 'amo/actions/landing';
import * as api from 'core/api';
import { loadFeaturedAddons, loadLandingAddons } from 'amo/utils';


describe('amo/utils', () => {
  describe('loadFeaturedAddons()', () => {
    const addonType = 'extension';
    let ownProps;

    beforeEach(() => {
      ownProps = {
        params: {
          application: 'android',
          pluralAddonType: 'extensions',
        },
      };
    });

    it('requests a large page of featured add-ons', () => {
      const store = createStore({ application: 'android' });
      store.dispatch(featuredActions.getFeatured({ addonType }));
      const mockApi = sinon.mock(api);
      const entities = sinon.stub();
      const result = sinon.stub();

      mockApi
        .expects('featured')
        .once()
        .withArgs({ api: {}, filters: { addonType, page_size: 25 } })
        .returns(Promise.resolve({ entities, result }));

      return loadFeaturedAddons({ store, params: ownProps.params })
        .then(() => {
          mockApi.verify();
        });
    });
  });

  describe('loadLandingAddons()', () => {
    const addonType = 'theme';
    let ownProps;

    beforeEach(() => {
      ownProps = {
        params: {
          application: 'android',
          pluralAddonType: 'themes',
        },
      };
    });

    it('calls featured and search APIs to collect results', () => {
      const store = createStore({ application: 'android' });
      store.dispatch(landingActions.getLanding({ addonType }));
      const mockApi = sinon.mock(api);
      const entities = sinon.stub();
      const result = sinon.stub();

      mockApi
        .expects('featured')
        .once()
        .withArgs({ api: {}, filters: { addonType, page_size: 4 } })
        .returns(Promise.resolve({ entities, result }));
      mockApi
        .expects('search')
        .once()
        .withArgs({
          api: {},
          filters: { addonType, page_size: 4, sort: 'rating' },
          page: 1,
        })
        .returns(Promise.resolve({ entities, result }));
      mockApi
        .expects('search')
        .once()
        .withArgs({
          api: {},
          filters: { addonType, page_size: 4, sort: 'hotness' },
          page: 1,
        })
        .returns(Promise.resolve({ entities, result }));

      return loadLandingAddons({ store, params: ownProps.params })
        .then(() => {
          mockApi.verify();
        });
    });
  });
});
