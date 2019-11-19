import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import assign from 'object-assign';
import { isFunc } from '../utils/is';
import '../../styles/components/Table.scss';


class Thead extends PureComponent {

  constructor(props) {
    super(props);
  }

  render() {
    const {
      rows, computedClassName, leftScroll, rightScroll,
    } = this.props;
    return (
      <thead>
        {
        rows.map((item, index) => (
          <tr
            key={`${index + 1}`}>
            {
              item.map((subItem, subIdx) => (
                <th
                  key={`${subIdx}`}
                  colSpan={subItem.colSpan}
                  rowSpan={subItem.rowSpan}
                  className={[
                    computedClassName(item, subItem, subIdx),
                  ].join(' ')}
                  style={
                    assign(
                      {},
                      subItem.style,
                      subItem.fixed === 'left' && {
                        transform: `translate3d(${-leftScroll}px, 0px, 0)`,
                        zIndex: item.length - subIdx,
                      },
                      subItem.fixed === 'right' && {
                        transform: `translate3d(${(rightScroll > 0 ? -rightScroll : rightScroll)}px, 0px, 0)`,
                        zIndex: subIdx,
                      }
                    )
                  }>
                  {isFunc(subItem.title) ? (subItem.title)() : subItem.title}
                </th>
              ))
            }
          </tr>
        ))
      }
      </thead>
    );
  }

}

Thead.propTypes = {
  computedClassName: PropTypes.func.isRequired,
  rows: PropTypes.arrayOf(PropTypes.any).isRequired,
  leftScroll: PropTypes.number,
  rightScroll: PropTypes.number,
};

export default Thead;
