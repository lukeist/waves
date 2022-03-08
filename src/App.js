import Song from "./components/Song";
import Player from "./components/Player";
import SongLib from "./components/SongLib";
import Nav from "./components/Nav";

import "./style/app.scss";
import chillHop from "./data";
import { useState, useRef } from "react";

function App() {
  const audioRef = useRef(null);
  const [songLib, setSongLib] = useState(chillHop());
  const [currentSong, setCurrentSong] = useState(songLib[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [libIsOpening, setLibIsOpening] = useState(false);
  const playbackMethod = ["repeat", "shuffle", "repeat1"];
  const [playback, setPlayback] = useState(playbackMethod[0]);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });

  ////////////////////////////////////////////////////////////////// CHUA HIEU
  const timeHandler = (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    const animationPercentage = (currentTime * 100) / duration;
    console.log(animationPercentage);
    setSongInfo({ ...songInfo, currentTime, duration, animationPercentage });
  };
  //////////////////////////////////////////////////////////////////
  // const [currentSongAudio, setCurrentSongAudio] = useState(
  //   new Audio(currentSong.audio)
  // );
  const makeAllSongsInactive = () => {
    for (let i = 0; i < songLib.length; i++) {
      songLib[i].active = false;
    }
  };

  // SKIP TO THE NEXT SONG
  const indexCurrentSong = songLib.findIndex((x) => x.id === currentSong.id);
  const skipHandler = async (direction) => {
    makeAllSongsInactive();
    if (direction === "skip-forward") {
      await setCurrentSong(songLib[(indexCurrentSong + 1) % songLib.length]);
      songLib[(indexCurrentSong + 1) % songLib.length].active = true;
      // console.log(indexCurrentSong + 1);
      // console.log((indexCurrentSong + 1) % songLib.length);
    }

    if (direction === "skip-backward") {
      if (indexCurrentSong - 1 === -1) {
        await setCurrentSong(songLib[songLib.length - 1]);
        songLib[songLib.length - 1].active = true;
        // console.log(indexCurrentSong - 1);
        // console.log((indexCurrentSong - 1) % songLib.length);
      } else {
        await setCurrentSong(songLib[(indexCurrentSong - 1) % songLib.length]);
        songLib[(indexCurrentSong - 1) % songLib.length].active = true;
        // console.log(indexCurrentSong - 1);
        // console.log((indexCurrentSong - 1) % songLib.length);
      }
    }
    if (isPlaying) {
      audioRef.current.play();
    }
  };
  // const stopAllSongAudio = () => {
  //   currentSongAudio.pause();
  //   currentSongAudio.currentTime = 0;
  // };
  // const seeHop = () => {
  //   // console.log(songLib);
  //   // console.log(currentSong.active);
  //   console.log(isPlaying);
  //   audioRef.current.play();
  // };

  ///////////////////////////////////// do chon async voi await nen ko can nua >>> tai sao?
  // useEffect(() => {
  //   if (isPlaying) {
  //     audioRef.current.play();
  //   }
  // }, [currentSong]);

  // chon cach playback
  const onEndedPlayback = async (e) => {
    makeAllSongsInactive();

    // switch (playback) {
    //   case "repeat":
    //     const aaaaa = await  setCurrentSong(songLib[(indexCurrentSong + 1) % songLib.length]);
    //     songLib[(indexCurrentSong + 1) % songLib.length].active = true;
    //     console.log("repeatt");
    //     break;
    //   case "shuffle":
    //     const random = Math.floor(Math.random() * songLib.length);
    //     await setCurrentSong(songLib[random]);
    //     songLib[random].active = true;
    //     console.log("shufflee");
    //     break;
    //   case "repeat1":
    //     await setCurrentSong(currentSong);
    //     currentSong.active = true;
    //     break;
    //   default:
    //     console.log("No value found");

    if (e === "repeat") {
      await setCurrentSong(songLib[(indexCurrentSong + 1) % songLib.length]);
      songLib[(indexCurrentSong + 1) % songLib.length].active = true;
      console.log("repeatt");
      console.log(currentSong);
    }
    if (e === "shuffle") {
      const random = Math.floor(Math.random() * songLib.length);
      await setCurrentSong(songLib[random]);
      songLib[random].active = true;
      console.log("shufflee");
      console.log(random);
      console.log(currentSong);
    }
    if (e === "repeat1") {
      await setCurrentSong(currentSong);
      currentSong.active = true;
      console.log("repeat1");
    }
    if (isPlaying) {
      audioRef.current.play();
    }
  };
  return (
    <div className={`App ${libIsOpening ? "library-active" : ""}`}>
      <Nav setLibIsOpening={setLibIsOpening} libIsOpening={libIsOpening} />
      <Song currentSong={currentSong} libIsOpening={libIsOpening} />
      <Player
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        songLib={songLib}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        makeAllSongsInactive={makeAllSongsInactive}
        audioRef={audioRef}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        libIsOpening={libIsOpening}
        skipHandler={skipHandler}
        playbackMethod={playbackMethod}
        playback={playback}
        setPlayback={setPlayback}
        // stopAllSongAudio={stopAllSongAudio}
        // currentSongAudio={currentSongAudio}
        // setCurrentSongAudio={setCurrentSongAudio}
      />
      {/* <button onClick={seeHop}>Click</button> */}
      <SongLib
        songLib={songLib}
        setSongLib={setSongLib}
        currentSong={currentSong}
        makeAllSongsInactive={makeAllSongsInactive}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        // stopAllSongAudio={stopAllSongAudio}
        // currentSongAudio={currentSongAudio}
        // setCurrentSongAudio={setCurrentSongAudio}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        libIsOpening={libIsOpening}
      />
      <audio
        // onChange={timeUpdateHandler}
        onTimeUpdate={timeHandler}
        onLoadedMetadata={timeHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={
          // () => skipHandler("skip-forward")
          () => onEndedPlayback(playback)
        }
      ></audio>
    </div>
  );
}

export default App;
