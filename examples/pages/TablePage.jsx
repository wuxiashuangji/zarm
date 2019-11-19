import React, { Component } from 'react';
import { Table, Panel } from '../../components';
import Container from '../components/Container';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/pages/TablePage.scss';

class TabPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    const columns1 = [
      {
        title: 'id', render: 'id', width: 50,
      },
      {
        title: '姓', render: 'firstName', width: 100,
      },
      {
        title: '名', render: 'lastName', width: 100,
      },
      {
        title: '昵称', render: () => 'nickname', width: 100,
      },
      {
        title: '市', render: 'city', width: 100,
      },
      {
        title: '工作', render: 'job', width: 100,
      },
      {
        title: '住址1', render: 'address', width: 100,
      },
    ];
    const columns2 = [
      {
        title: 'id', render: 'id', width: 50,
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
        title: '住址1', render: 'address', width: 100,
      },
    ];
    const columns3 = [
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
      <Container
        className="tab-page">
        <div style={{ height: '20px' }} />
        <Header title="表格页 Table" />
        <main>
          <Panel>
            <Panel.Header title="基本" />
            <Panel.Body>
              <Table columns={columns1} data={info} keygen="id" loading={false} style={{ width: '100%', maxHeight: '300px' }} {...this.props} />
            </Panel.Body>
          </Panel>
          <Panel>
            <Panel.Header title="表头合并" />
            <Panel.Body>
              <Table columns={columns2} data={info} keygen="id" loading={false} style={{ width: '100%', maxHeight: '300px' }} {...this.props} />
            </Panel.Body>
          </Panel>
          <Panel>
            <Panel.Header title="固定列" />
            <Panel.Body>
              <Table columns={columns3} data={info} keygen="id" loading={false} style={{ width: '100%', maxHeight: '300px' }} {...this.props} />
            </Panel.Body>
          </Panel>
          <Panel>
            <Panel.Header title="空数据" />
            <Panel.Body>
              <Table columns={columns1} data={[]} keygen="id" loading={false} style={{ width: '100%', maxHeight: '300px' }} {...this.props} />
            </Panel.Body>
          </Panel>
          <Panel>
            <Panel.Header title="数据加载-loading" />
            <Panel.Body>
              <Table columns={columns1} data={[]} keygen="id" loading style={{ width: '100%', maxHeight: '300px' }} {...this.props} />
            </Panel.Body>
          </Panel>
        </main>
        <Footer />
      </Container>
    );
  }
}

export default TabPage;
