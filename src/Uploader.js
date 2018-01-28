import React, { Component } from 'react';
import './Uploader.css';

class Uploader extends Component {

  audioInputOnClick = () => {
    this.audioInput.click();
  }

  audioInputOnChange = (event) => {
    const target = event.target;

    this.props.onAudioChange(target.files[0]);
  }

  lrcInputOnClick = () => {

  }

  render() {
    return (
      <div className="uploader">
        <button onClick={this.audioInputOnClick}>加载音乐</button>
        <button onClick={this.props.onLrcDownload}>下载歌词</button>

        <br />
        
        <input type="file" ref={(e) => this.audioInput = e} onChange={this.audioInputOnChange} />
        <input type="file" ref={(e) => this.lrcInput = e} />
      </div>
    );
  }
}

export default Uploader;