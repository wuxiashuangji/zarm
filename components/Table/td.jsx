import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import assign from 'object-assign';
import { isFunc } from './../utils/is';
import './../../styles/components/Table.scss';


class Td extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      columns, setClassName, leftScroll, rightScroll,
      column, columnIndex,
      renderData, renderIndex,
    } = this.props;

    return (
      <td
        colSpan={column.colSpan || 1}
        className={[
          setClassName(columns, column, columnIndex),
        ].join(' ')}
        style={
          assign(
            {},
            column.style,
            column.fixed === 'left' && {
              transform: `translate3d(${-leftScroll}px, 0px, 0)`,
              zIndex: columns.length - columnIndex,
            },
            column.fixed === 'right' && {
              transform: `translate3d(-${(rightScroll)}px, 0px, 0)`,
              zIndex: columnIndex,
            }
          )}>
        {
          isFunc(column.render) ? column.render(renderData, renderIndex) : renderData[column.render]
        }
      </td>
    );
  }
}

Td.propTypes = {
  column: PropTypes.shape({
    style: PropTypes.shape(),
    fixed: PropTypes.oneOf(['left', 'right']),
    colSpan: PropTypes.number,
    render: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
  }),
  setClassName: PropTypes.func.isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape()),
  columnIndex: PropTypes.number,
  renderData: PropTypes.shape().isRequired,
  renderIndex: PropTypes.number,
  leftScroll: PropTypes.number,
  rightScroll: PropTypes.number,
};

export default Td;
