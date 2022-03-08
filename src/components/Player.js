import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
  faRandom,
  faPrescriptionBottleAlt,
  faAlignLeft,
  faRedo,
  faRedoAlt,
  faUndo,
  faUndoAlt,
} from "@fortawesome/free-solid-svg-icons";
const Player = ({
  songLib,
  currentSong,
  setCurrentSong,
  isPlaying,
  setIsPlaying,
  makeAllSongsInactive,
  audioRef,
  songInfo,
  setSongInfo,
  libIsOpening,
  skipHandler,
  playbackMethod,
  playback,
  setPlayback,
  // stopAllSongAudio,
  // currentSongAudio,
  // setCurrentSongAudio,
}) => {
  // const currentTimeAudio = currentSongAudio.curresntTime;
  // const durationAudio = currentSongAudio.duration;

  // useEffect(() => {
  //   setSongInfo({ currentTime: currentTimeAudio, duration: durationAudio });
  //   console.log(currentTimeAudio);
  // }, [currentTimeAudio]);

  const getTime = (time) => {
    return (
      Math.floor(time / 60) +
      ":" +
      (Math.floor(time % 60) < 10
        ? "0" + Math.floor(time % 60)
        : Math.floor(time % 60))
    );
  };

  // const skipBackwardHandler = () => {
  //   makeAllSongsInactive();

  //   if (indexCurrentSong > 0) {
  //     setCurrentSong(songLib[indexCurrentSong - 1]);
  //     songLib[indexCurrentSong - 1].active = true;
  //     // let skipBackwardPlaying = new Audio(songLib[indexCurrentSong - 1].audio);
  //     // let skipBackwardPlaying = audioRef.current;
  //     // setCurrentSongAudio(skipBackwardPlaying);
  //     // if (isPlaying) {
  //     //   // stopAllSongAudio();
  //     //   audioRef.current.play();
  //     //   // setIsPlaying(isPlaying);
  //     // }
  //   } else {
  //     setCurrentSong(songLib[songLib.length - 1]);
  //     songLib[songLib.length - 1].active = true;
  //     // let skipBackwardPlaying = new Audio(songLib[songLib.length - 1].audio);
  //     // let skipBackwardPlaying = audioRef.current;
  //     // setCurrentSongAudio(skipBackwardPlaying);
  //     // if (isPlaying) {
  //     //   // stopAllSongAudio();
  //     //   skipBackwardPlaying.play();
  //     //   // setIsPlaying(isPlaying);
  //     // }
  //   }
  // };

  // const skipForwardHandler = () => {
  //   makeAllSongsInactive();
  //   if (indexCurrentSong < songLib.length - 1) {
  //     setCurrentSong(songLib[indexCurrentSong + 1]);
  //     songLib[indexCurrentSong + 1].active = true;
  //     // let skipForwardPlaying = new Audio(songLib[indexCurrentSong + 1].audio);
  //     // setCurrentSongAudio(skipForwardPlaying);
  //     // if (isPlaying) {
  //     //   // stopAllSongAudio();
  //     //   skipForwardPlaying.play();
  //     //   setIsPlaying(!isPlaying);
  //     // }
  //   } else {
  //     setCurrentSong(songLib[0]);
  //     songLib[0].active = true;
  //     let skipForwardPlaying = new Audio(songLib[0].audio);
  //     // setCurrentSongAudio(skipForwardPlaying);
  //     // if (isPlaying) {
  //     //   // stopAllSongAudio();
  //     //   skipForwardPlaying.play();
  //     //   setIsPlaying(!isPlaying);
  //     // }
  //   }
  // };

  const playHandler = () => {
    if (isPlaying) {
      // currentSongAudio.pause();
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
      if ((currentSong.currentTime = currentSong.duration)) {
      }
    } else {
      // currentSongAudio.play();
      audioRef.current.play();
      setIsPlaying(!isPlaying);
      // console.log(audioRef.current);
    }
  };

  const timeUpdateHandler = (e) => {
    console.log(e.target.value);
  };

  const slideHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
  };

  const trackAni = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };
  const playbackMethodCurrenIndex = playbackMethod.findIndex(
    (x) => x === playback
  );
  const playbackHandler = () => {
    setPlayback(
      playbackMethod[(playbackMethodCurrenIndex + 1) % playbackMethod.length]
    );
  };

  // const seeHope = () => {
  //   // console.log(songLib);
  //   // console.log(audioRef.current);
  //   // console.log(audioRef.current.duration);
  //   console.log(playback);
  //   console.log(playbackMethod);
  //   console.log(playbackMethodCurrenIndex);
  // };
  return (
    <div className={`player ${libIsOpening ? "player-resize" : ""}`}>
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`,
          }}
          className="track"
        >
          <input
            onChange={slideHandler}
            min={0}
            max={songInfo.duration || 0}
            step={0.01}
            type="range"
            value={songInfo.currentTime}
            name=""
            id=""
          />
          <div style={trackAni} className="animate-track"></div>
        </div>
        <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          className="skip-backward"
          icon={faAngleLeft}
          size="2x"
          onClick={() => {
            skipHandler("skip-backward");
          }}
        />
        <div className="play-button">
          <FontAwesomeIcon
            onClick={playHandler}
            className="play"
            icon={isPlaying ? faPause : faPlay}
            size="2x"
          />
          {/* <FontAwesomeIcon
            onClick={playHandler}
            className="pause"
            icon={faPause}
            size="2x"
          /> */}
        </div>

        <FontAwesomeIcon
          className="skip-forward"
          icon={faAngleRight}
          size="2x"
          onClick={() => {
            skipHandler("skip-forward");
          }}
        />
      </div>
      {/* <div>
        <FontAwesomeIcon
          className="playback-button"
          onClick={playbackHandler}
          size="2x"
          icon={faRandom}
        />
        <FontAwesomeIcon icon={faUndo} />
      </div> */}
      {/* <button onClick={seeHope}>Click</button> */}
    </div>
  );
};

export default Player;
