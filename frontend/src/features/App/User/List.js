import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Helmet } from 'react-helmet';
import Layouts from 'layouts';
import {Services} from 'services';
import {denormalizer} from 'reducers/data';
import {PageTitle, IsLoading, NoResults} from 'components/Common';

import UserListTable from './components/UserListTable';

export class ListContainer extends React.Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    hasResults: PropTypes.bool.isRequired,
    hasErrors: PropTypes.bool.isRequired,
    router: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    loadUsers: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
  }

  componentDidMount () {
    const {
      loadUsers
    } = this.props;

    loadUsers();
  }

  render () {
    const {
      users,
      isLoading,
      hasResults
    } = this.props;

    return (
      <Layouts.Base>
        <div className='UserListContainer'>
          <Helmet>
            <title>List of Users</title>
          </Helmet>
          <PageTitle title='List of Users' />
          <IsLoading visible={(isLoading || (isLoading && !hasResults))} />
          <NoResults visible={!isLoading && !hasResults} />
          {(!isLoading && hasResults) &&
            <UserListTable
              data={users}
            />
          }
        </div>
      </Layouts.Base>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  isLoading: state.isLoading['DATA'],
  hasResults: state.hasResults['DATA'],
  hasErrors: state.hasErrors['DATA'],
  users: denormalizer('users', state)
});

const mapDispatchToProps = (dispatch) => ({
  loadUsers: () => dispatch(Services.Data.find('user'))
});
export default connect(mapStateToProps, mapDispatchToProps)(ListContainer);
