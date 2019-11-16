import React, { Component } from 'react';
import { Table } from '../../components';
import '../styles/pages/TablePage';

class TabPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      show: true,
    };
  }

  render() {
    const { show } = this.state;
    const info = new Array(10)
      .fill(10).map((item, index) => ({
        title: `内容${index + 1}`,
        firstName: ['张', '李', '胡', '王', '钱', '周', '赵', '吴'][index % 8],
        lastName: ['三', '四', '志军', '建国', '立国', '建业', '某某'][index % 7],
        nickname: '某某',
        job: '工作',
        address: `中国某-${index}`,
        city: `广州-${index}`,
        index,
      }));
    const columns = [
      {
        title: 'id', render: 'id', width: 50, fixed: 'left',
      },
      {
        title: '姓', render: 'firstName', width: 100, group: ['基本信息', '名字'],
      },
      {
        title: '名', render: 'lastName', width: 100, group: ['基本信息', '名字'],
      },
      {
        title: '昵称', render: () => 'nickname', width: 100,
      },
      {
        title: '市', render: 'city', width: 100, group: ['户籍'],
      },
      {
        title: '工作', render: 'job', width: 100, group: ['户籍'],
      },
      {
        title: '住址1', render: 'address', width: 100, fixed: 'right',
      },
    ];

    return (
      <div
        className="tab-page">
        <div style={{ height: '20px' }} />
        <button
          onClick={() => this.setState({
            show: !show,
          })}
          style={
            {
              margin: '10px',
              border: '1px solid grey',
              padding: '5px',
              borderRadius: '5px',
              background: 'white',
            }
          }>
          {`${!show ? '显示' : '隐藏'}`} table组件
        </button>
        <main >
          {
            show && (
              <Table
                columns={columns}
                data={info}
                keygen="id"
                loading={false}
                style={{ width: '100%', maxHeight: '300px' }}
                {...this.props}
                />
            )
          }
        </main>
      </div>
    );
  }
}

export default TabPage;
