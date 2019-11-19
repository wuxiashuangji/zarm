import React from 'react';
import PropTypes from 'prop-types';
import assign from 'object-assign';
import Td from './tableCell';
import '../../styles/components/Table.scss';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.ele = null;
  }

  componentDidMount() {

  }

  componentWillUnmount() {
  }

  render() {
    return (
      <tr>
        <Td {...this.props} />
      </tr>
    );
  }
}


Index.propTypes = {
};

export default Index;
