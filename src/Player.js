import React, { Component } from 'react';
import WaveSurfer from 'wavesurfer.js';
import Slider from 'antd/lib/slider';
import './Player.css';

class Player extends Component {
  static defaultProps = {
    onTimeUpdate: () => { }
  }

  constructor() {
    super();
    this.state = {
      duration: 0,
      currentTime: 0,
      play: false,
    };
  }

  onPlay = () => {
    const { audio } = this.props;

    if (audio) {
      this.audio.play();
      this.setState({ play: true });
    }
  }

  onPause = () => {
    const { audio } = this.props;

    if (audio) {
      this.audio.pause();
      this.setState({ play: false });
    }
  }

  onStop = () => {
    const { audio } = this.props;

    if (audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.setState({ play: false, currentTime: 0 });
      this.props.onTimeUpdate(0);
    }
  }

  onTrigger = () => {
    const play = this.state.play;

    if (play) {
      this.onPause();
    } else {
      this.onPlay();
    }
  }

  onLog = () => {
    const { audio } = this.props;

    if (audio) {
      this.onPause();
      this.props.onPlayerLog(this.audio.currentTime);
    }
  }

  componentWillReceiveProps(nextProps) {

    const currentPropsAudio = this.props.audio;
    const nextPropsAudio = nextProps.audio;

    if (currentPropsAudio === nextPropsAudio) return;
    if (!nextPropsAudio) return;

    if (this.audio) {
      this.audio.pause();
      this.setState({
        play: false,
        currentTime: 0,
        duration: 0
      }, () => {
        this.props.onTimeUpdate(0);
      });
    }

    this.audio = document.createElement('audio');
    this.audio.src = URL.createObjectURL(nextPropsAudio);
    this.wavesurfer.load(this.audio.src);

    this.audio.ontimeupdate = () => {
      this.setState({
        currentTime: this.audio.currentTime,
        duration: this.audio.duration
      }, () => {
        this.props.onTimeUpdate(this.audio.currentTime);
      });
    };
  }

  componentDidMount() {
    this.wavesurfer = WaveSurfer.create({
      container: this.refs.wavesurfer,
      interact: false,
      cursorWidth: 0,
    });
  }

  onSliderChange = (currentTime) => {
    this.audio.currentTime = currentTime;
    this.setState({ currentTime });
    this.props.onTimeUpdate(this.audio.currentTime);
  }


  componentDidUpdate(prevProps, prevState) {
    const { duration, currentTime } = this.state;

    this.wavesurfer.seekTo(currentTime / duration);
  }


  render() {
    const { duration, currentTime } = this.state;

    return (
      <div className="player">
        <button onClick={this.onTrigger}>
          {
            this.state.play ? '暂停' : '播放'
          }
        </button>
        <button onClick={this.onStop}>停止</button>
        <br />
        <button onClick={this.onLog}>标记</button>

        <div className="wavesurfer" ref={'wavesurfer'} />
        <Slider min={0} max={duration || 1} value={currentTime} step={0.001} onChange={this.onSliderChange} tipFormatter={value => `${value}s`} />


      </div>
    );
  }
}

export default Player;