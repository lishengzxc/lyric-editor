import React, { Component } from 'react';
import './Lrc.css';
import Table from 'antd/lib/table';
import Input from 'antd/lib/input';

class Lrc extends Component {
  constructor() {
    super();

    this.columns = [{
      title: '时间',
      dataIndex: 'time',
      key: 'time',
      width: 200,
      render: (text, record) => <div className="lrcTime">{[text, <button key={record.time} onClick={() => this.onLrcDelete(record.time)}>x</button>]}</div>
    }, {
      title: '歌词',
      dataIndex: 'text',
      key: 'text',
      render: (text, record) => <Input value={text} onChange={(e) => this.onLrcChange(record.time, e.target.value)} />
    }]
  }

  onLrcDelete = (time) => {
    const lrc = this.props.lrc;

    const newLrc = lrc.filter(item => {
      return item.time !== time;
    });

    this.props.onChange(newLrc);
  }

  onLrcChange = (time, text) => {

    const lrc = this.props.lrc;

    const newLrc = lrc.map(item => {
      if (item.time === time) {
        item.text = text;
      }
      return item;
    });

    this.props.onChange(newLrc);
  }

  render() {
    return (
      <div className="lrc">
        <Table rowKey="time" columns={this.columns} pagination={false} dataSource={this.props.lrc} />
      </div>
    );
  }
}

export default Lrc;