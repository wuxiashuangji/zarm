import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { isArray, isFunc } from '../utils/is';
import '../../styles/components/Table.scss';
import Thead from './thead';
import Td from './td';

class Table extends React.Component {

  static preventHandler($event) {
    $event.preventDefault();
    $event.stopPropagation();
  }

  constructor(props) {
    super(props);
    this.tableHeader = null;
    this.tableBody = null;
    this.tableWrapper = null;

    this.tempScrollX = 0; // 临时变量
    this.tempScrollX = 0; // 临时变量
    this.touchendScrollX = 0; // touchend时的滚动距离
    this.touchendScrollY = 0; // touchend时的滚动距离

    this.state = {

      pcSpeed: 10, // pc端 阀值
      mSpeed: 3, // 移动端 阀值
      scrollX: 0, // 滚动距离
      scrollY: 0, // 滚动距离

      wrapperWidth: 0, // 表格容器宽度
      wrapperHeight: 0, // 表格容器高度

      tableBodyWidth: 0, // 表body宽度
      tableBodyHeight: 0, // 表body高度

      tableHeaderWidth: 0, //
      tableHeaderHeight: 0,

      touchInitX: 0, // touchStart x位置
      touchInitY: 0, // touchStart y位置

    };
  }

  componentDidMount() {
    this.setTableWidth();
    this.tableWrapper.addEventListener('wheel', (e) => {
      Table.preventHandler(e);
      this.wheelHandler(e);
    });
    this.tableWrapper.addEventListener('touchstart', (e) => {
      this.touchstartHandler(e);
    }, true);
    this.tableWrapper.addEventListener('touchmove', (e) => {
      Table.preventHandler(e);
      this.touchmoveHandler(e);
    }, true);
    this.tableWrapper.addEventListener('touchend', (e) => {
      this.touchendHandler(e);
    }, true);
    window.addEventListener('resize', () => {
      requestAnimationFrame(() => {
        this.setTableWidth();
      });
    });
  }

  componentWillUnmount() {
    this.tableWrapper.removeEventListener('wheel', (e) => {
      this.wheelHandler(e);
    });
    this.tableWrapper.removeEventListener('touchstart', (e) => {
      this.touchstartHandler(e);
    });
    this.tableWrapper.removeEventListener('touchmove', (e) => {
      this.touchmoveHandler(e);
    });
    this.tableWrapper.removeEventListener('touchend', (e) => {
      this.touchendHandler(e);
    });
    this.unMountHanler();
  }

  setTableWidth(callback) {
    this.setState({
      tableBodyHeight: this.getRect('tableBody', 'height'),
      tableHeaderWidth: this.getRect('tableHeader', 'width'),
      tableHeaderHeight: this.getRect('tableHeader', 'height'),
      wrapperHeight: this.getRect('tableWrapper', 'height') - 2, // 2 border 高度
      wrapperWidth: this.getRect('tableWrapper', 'width') - 2, // 2 border 宽度
      scrollX: 0,
      scrollY: 0,
    }, () => {
      isFunc(callback) && callback();
    });
  }

  getRect(ele, attr) {
    return (this[ele] && this[ele].getBoundingClientRect()
      ? this[ele].getBoundingClientRect()[attr] : 0);
  }

  // wheel 处理
  wheelHandler(e) {
    const {
      pcSpeed,
      scrollX, scrollY,
      tableBodyHeight,
      tableHeaderWidth, tableHeaderHeight,
      wrapperHeight, wrapperWidth,
    } = this.state;
    // 最大滚动区域
    const maxScrollHeight = (tableBodyHeight + tableHeaderHeight) - wrapperHeight;
    const maxScrollWidth = tableHeaderWidth - wrapperWidth;

    // scrollY 只能 < 0;
    if (scrollX <= 0 && maxScrollWidth > 0) {
      this.tempScrollX = this.tempScrollX - (e.deltaX / pcSpeed) <= 0
        ? this.tempScrollX - (e.deltaX / pcSpeed) : 0;
      if (this.tempScrollX <= -maxScrollWidth) {
        this.tempScrollX = -maxScrollWidth;
      }
      this.setState({
        scrollX: this.tempScrollX,
      });
    }
    // scrollX 只能 < 0
    if (scrollY <= 0 && maxScrollHeight > 0) {
      this.tempScrollY = this.tempScrollY - (e.deltaY / pcSpeed) <= 0
        ? this.tempScrollY - (e.deltaY / pcSpeed) : 0;
      if (this.tempScrollY <= -maxScrollHeight) {
        this.tempScrollY = -maxScrollHeight;
      }
      this.setState({
        scrollY: this.tempScrollY,
      });
    }
    return this;
  }

  // touchstart 触摸处理
  touchstartHandler($event) {
    const touchEleDom = $event.touches[0];
    this.setState({
      touchInitX: touchEleDom.pageX,
      touchInitY: touchEleDom.pageY,
    });
  }

  // touchmove 触摸移动处理
  touchmoveHandler($event) {
    const touchEleDom = $event.touches[0];
    const {
      mSpeed,
      touchInitX, touchInitY,
      scrollX, scrollY,
      tableBodyHeight,
      tableHeaderWidth, tableHeaderHeight,
      wrapperHeight, wrapperWidth,
    } = this.state;
    // 最大滚动区域
    const maxScrollHeight = (tableBodyHeight + tableHeaderHeight) - wrapperHeight;
    const maxScrollWidth = tableHeaderWidth - wrapperWidth;
    // 滚动距离
    const scrollTmpX = (touchEleDom.pageX - touchInitX);
    const scrollTmpY = (touchEleDom.pageY - touchInitY);

    // scrollY 只能 < 0;
    if (scrollX <= 0 && Math.abs(scrollTmpX) >= mSpeed && maxScrollWidth > 0) {
      this.tempScrollX = this.touchendScrollX + (scrollTmpX * mSpeed) <= 0
        ? this.touchendScrollX + (scrollTmpX * mSpeed) : 0;
      if (this.tempScrollX <= -maxScrollWidth) {
        this.tempScrollX = -maxScrollWidth;
      }
      this.setState({
        scrollX: this.tempScrollX,
      });
    }
    // scrollX 只能 < 0
    if (scrollY <= 0 && Math.abs(scrollTmpY) >= mSpeed && maxScrollHeight > 0) {
      this.tempScrollY = this.touchendScrollY + (scrollTmpY * mSpeed) <= 0
        ? this.touchendScrollY + (scrollTmpY * mSpeed) : 0;
      if (this.tempScrollY <= -maxScrollHeight) {
        this.tempScrollY = -maxScrollHeight;
      }
      this.setState({
        scrollY: this.tempScrollY,
      });
    }
  }

  // touchend 触摸事件处理
  touchendHandler() {
    this.touchendScrollX = this.tempScrollX;
    this.touchendScrollY = this.tempScrollY;
  }

  unMountHanler() {
    this.tempScrollX = 0;
    this.tempScrollY = 0;
    this.touchendScrollX = 0;
    this.touchendScrollY = 0;
    this.setState({
      scrollX: 0,
      scrollY: 0,
    });
  }

  bindElement(key, value) {
    this[key] = value;
  }


  render() {
    const {
      columns,
      data,
      loading,
      empty,
      style,
      keygen,
      prefixCls,
    } = this.props;
    const {
      scrollX,
      scrollY,
      wrapperWidth,
      tableHeaderWidth,
      className,
    } = this.state;

    /**
     * 根据属性字段排名
     * @param array
     * @param computIndex
     * @param attr
     * @param attrValue
     * @returns {{findIndex: number | never, lastOneIndex: number, length: *, firstOneIndex: number}}
     */
    const computedSelfSortByAttr = (array = [], attr, attrValue) => {
      const tmpArr = array.map((i, index) => {
        if (i[attr] === attrValue) {
          return index;
        }
        return null;
      });
      const arrNoNull = tmpArr.filter((i) => i != null);
      return {
        length: tmpArr.filter((i) => i != null).length,
        firstOneIndex: arrNoNull.length > 0 ? arrNoNull[0] : -1,
        lastOneIndex: arrNoNull.length > 0 ? arrNoNull[arrNoNull.length - 1] : -1,
        findIndex: (itemIndex) => arrNoNull.findIndex((i) => i === itemIndex), // 找到自身所在的排序后的位置index
      };
    };
    // 是否是最后一个左fixed的
    const fixedLeft = (arr = []) => computedSelfSortByAttr(arr, 'fixed', 'left');
    // 是否是第一个右fixed的
    const fixefRight = (arr = []) => computedSelfSortByAttr(arr, 'fixed', 'right');

    // fixedRight 第一个的index
    const firstFixedRightIndex = fixefRight(columns).firstOneIndex;
    // fixedLeft 最后一个的index
    const lastFixedLeftIndex = fixedLeft(columns).lastOneIndex;

    const computFixed = (index = 0) => ((index <= lastFixedLeftIndex && lastFixedLeftIndex !== -1) ? 'left' : (index >= firstFixedRightIndex && firstFixedRightIndex !== -1 ? 'right' : undefined));

    // 计算右fixed的列需要滚动距离
    const rightScroll = (tableHeaderWidth - wrapperWidth) + scrollX;
    // 计算tr/th中的类名
    const setClassName = (arr, item, index = 0) => ([
      item.className || '',
      item.fixed === 'left' ? 'fixed-left' : '',
      item.fixed === 'right' ? 'fixed-right' : '',
      fixefRight(arr).firstOneIndex === index ? 'fixed-right-first' : '',
      fixedLeft(arr).lastOneIndex === index ? 'fixed-left-last' : '',
      item.fixed === 'left' && scrollX !== 0 ? 'scrolling' : '',
      item.fixed === 'right' && rightScroll !== 0 ? 'scrolling' : '',
    ].join(' ').trim()
    );

    // 计算 表头深度, 每个单元的广度
    const getRows = (columnsData) => {
      let maxRowsNum = columnsData.map((item) => (isArray(item.group) ? item.group.length + 1 : 1));
      maxRowsNum = maxRowsNum.sort()[maxRowsNum.length - 1];
      const tmpArray = new Array(maxRowsNum).fill('').map(() => []); // 表头最后rows

      const columnsTmp = columnsData.map((item, index) => {
        if (item.group !== undefined && !isArray(item.group)) {
          item.group = [item.group];
          item.fixed = computFixed(index);
        }
        return item;
      });
      columnsTmp.map((item, index) => {
        if (isArray(item.group)) {
          item.group.map((groupItem, groupIndex) => {
            tmpArray[groupIndex].push({
              title: groupItem,
              level: groupIndex + 1,
              colSpan: 1,
              rowSpan: 1,
              fixed: computFixed(index),
            });
            return groupItem;
          });
          tmpArray[item.group.length].push({
            ...item,
            colSpan: 1,
            rowSpan: maxRowsNum - item.group.length,
            level: tmpArray.length,
            fixed: computFixed(index),
          });
        } else {
          tmpArray[0].push({
            ...item,
            colSpan: 1,
            rowSpan: tmpArray.length,
            level: 1,
            fixed: computFixed(index),
          });
        }
        return item;
      });
      const resultArray = [];
      tmpArray.map((item) => {
        const obj = {};
        item.forEach((subItem) => {
          const titleId = subItem.title + subItem.level;
          if (obj[titleId]) {
            obj[titleId] = {
              ...subItem,
              fixed: obj[titleId].fixed || subItem.fixed,
              colSpan: (Number(obj[titleId].colSpan || 0)) + 1,
            };
          } else {
            obj[titleId] = { ...subItem, colSpan: 1, fixed: subItem.fixed };
          }
        });
        resultArray.push(Object.values(obj));
        return item;
      });
      return resultArray;
    };
    // 获取表头的rows;
    const headRows = getRows(columns);
    // 表格单元的长度设置
    const colgroup = (
      <colgroup>
        {
          columns.map((item, index) => (
            <col
              key={`${index}`}
              style={{
                width: item.width,
              }}
              />
          ))
        }
      </colgroup>
    );

    return (
      <div
        className={classnames(`${prefixCls}-container ${className || ''}`)}
        style={style || {}}>
        <div
          className={classnames(`${prefixCls}-wrapper`)}
          ref={(e) => this.bindElement('tableWrapper', e)}>
          <div className={classnames(`${prefixCls}-header`)}>
            <table
              ref={(e) => this.bindElement('tableHeader', e)}
              style={{
                transform: `translate3d(${scrollX}px, ${0}px, 0)`,
                zIndex: 0,
              }}>
              {
                colgroup
              }
              <Thead
                {...this.props}
                rows={headRows}
                leftScroll={scrollX}
                rightScroll={rightScroll}
                computedClassName={setClassName}
                />
            </table>
          </div>
          {
            isArray(data) && (
            <div
              className={classnames(`${prefixCls}-body`)}
              ref={(e) => this.bindElement('tableBody', e)}
              style={{
                transform: `translate3d(${scrollX}px, ${scrollY}px, 0)`,
                zIndex: 0,
              }}>
              {
                data.length > 0 && (
                  <table>
                    {
                      colgroup
                    }
                    <tbody>
                      {
                        data.map((infoItem, infoIndex) => (
                          <tr key={(isFunc(keygen) && keygen(infoItem)) || infoItem[keygen] || `${infoIndex}`}>
                            {
                              columns.map((item, index) => (
                                <Td
                                  key={`${infoIndex}-${index}`}
                                  column={item}
                                  columnIndex={index}
                                  setClassName={setClassName}
                                  renderData={infoItem}
                                  renderIndex={infoIndex}
                                  leftScroll={scrollX}
                                  rightScroll={rightScroll}
                                  {...this.props}
                                  />
                              ))
                            }
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                )
              }
            </div>
            )
          }
        </div>
        {
          ((isArray(data) && data.length === 0) || !isArray(data)) && (
            <div
              style={{
                width: '100%',
                zIndex: 0,
              }}
              ref={(e) => this.bindElement('tableBody', e)}
              className={classnames(`${prefixCls}-empty`)}>
              {empty || <span>无数据</span>}
            </div>
          )
        }
        {
          loading && (
            <div
              className={classnames(`${prefixCls}-loading`)}>
              <div className="loader" />
            </div>
          )
        }
      </div>
    );
  }
}


Table.propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  empty: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  loading: PropTypes.bool,
  style: PropTypes.shape(),
  columns: PropTypes.arrayOf(PropTypes.shape()),
  data: PropTypes.arrayOf(PropTypes.shape()),
  fixed: PropTypes.string,
  keygen: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};

Table.defaultProps = {
  prefixCls: 'za-table',
  data: [],
  columns: [],
  style: {},
  fixed: '',
  loading: true,
  className: '',
};

Table.displayName = 'za-table';
export default Table;
