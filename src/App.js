import React, { Component } from 'react';
import './App.css';

import Player from './Player';
import Uploader from './Uploader';
import Lrc from './Lrc';

class App extends Component {
  constructor() {
    super();
    this.state = {
      audio: null,
      lrc: [],
    };
  }

  onAudioChange = (audio) => {
    console.log(audio);
    this.setState({ audio });
  }

  onLrcChange = (lrc) => {
    this.setState({ lrc });
  }

  onPlayerLog = (time) => {
    const lrc = this.state.lrc;
    const index = lrc.findIndex((i) => i.time === time);
    if (index !== -1) {
      lrc[index] = { time, text: '' };
    } else {
      lrc.push({
        time,
        text: ''
      });
    }

    lrc.sort((a, b) => a.time - b.time);
    this.setState({ lrc });
  }

  onPlayerTimeUpdate = (time) => {

  }

  formatTime = (time) => {

  }

  onLrcDownload = () => {
    console.log(JSON.stringify(this.state.lrc));
  }

  render() {
    const { audio, lrc } = this.state;

    return (
      <div className="App">
        <Uploader
          onAudioChange={this.onAudioChange}
          onLrcChange={this.onLrcChange}
          onLrcDownload={this.onLrcDownload}
        />
        <Player
          audio={audio}
          onPlayerLog={this.onPlayerLog}
          onTimeUpdate={e => console.log(e)}
        />
        <Lrc lrc={lrc} onChange={this.onLrcChange} onLrcDownload={this.onLrcDownload}/>
      </div>
    );
  }
}

export default App;
