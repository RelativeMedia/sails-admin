import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
export class UserListTable extends React.Component {
  static propTypes = {
    columns: PropTypes.array,
    data: PropTypes.array
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
  }

  render () {
    const {
      data
    } = this.props;

    const _columns = [
      {
        Header: 'Name',
        id: 'name',
        headerClassName: 'text-center',
        className: 'text-center',
        accessor: (row) => (<span>{`${row.firstName} ${row.lastName}`}</span>)
      },
      {
        Header: 'Username',
        accessor: 'username',
        headerClassName: 'text-center',
        className: 'text-center'
      },
      {
        Header: 'Email',
        accessor: 'email',
        headerClassName: 'text-center',
        className: 'text-center'
      },
      {
        Header: 'accountType',
        accessor: 'accountType',
        headerClassName: 'text-center',
        className: 'text-center'
      },
      {
        Header: '',
        id: 'actions',
        headerClassName: 'text-center',
        className: 'text-center',
        Cell: () => (<div className='btn-group'>
          <button className='btn btn-sm btn-info'><i className='fa fa-sm fa-info' /></button>
          <button className='btn btn-sm btn-danger'><i className='fa fa-sm fa-trash' /></button>
          <button className='btn btn-sm btn-warning'><i className='fa fa-sm fa-pencil' /></button>
        </div>)
      }
    ];

    return (<div className='UserListTableComponent'>
      <ReactTable
        data={data}
        columns={_columns}
        defaultPageSize={5}
        className='-striped -highlight'
      />
    </div>);
  }
}

export default UserListTable;
