import React from 'react';
import PropTypes from 'prop-types';
import assign from 'object-assign';
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
    const {
      scrollX,
      scrollY,
      content,
      style,
    } = this.props;
    return (
      <td
        style={
          assign({}, style || {}, {
            transform: `translate3d(${scrollX}px, ${scrollY}px, 0)`,
          })
         }>
        {
          content || ''
        }
      </td>
    );
  }
}

Index.propTypes = {
};

export default Index;
