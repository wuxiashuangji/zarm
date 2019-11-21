import React from 'react';
import PropTypes from 'prop-types';
import assign from 'object-assign';
import Td from './td';

class Tr extends React.Component {
  constructor(props) {
    super(props);
    this.ele = null;
  }

  componentDidMount() {

  }

  componentWillUnmount() {
  }

  render() {
    const { data, ...other } = this.props;
    return (
      <tr>
        {
            data.map((item, index) => <Td {...this.props} />)
        }
      </tr>
    );
  }
}


Tr.propTypes = {
};
Tr.displayName = 'table-tr';

export default Tr;
