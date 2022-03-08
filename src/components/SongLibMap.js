import react from "react";

const SongLibMap = ({
  song,
  name,
  artist,
  cover,
  audio,
  makeAllSongsInactive,
  isPlaying,
  setIsPlaying,
  //   stopAllSongAudio,
  //   currentSongAudio,
  //   setCurrentSongAudio,
  setCurrentSong,
  songInfo,
  setSongInfo,
  audioRef,
}) => {
  const selectSong = async () => {
    // stopAllSongAudio();
    makeAllSongsInactive();
    song.active = true;
    // let activeSongAudio = new Audio(audio);
    // setCurrentSongAudio(activeSongAudio);
    await setCurrentSong(song);
    if (isPlaying) {
      //   activeSongAudio.play();
      // setIsPlaying(true);
      audioRef.current.play();
    }
  };
  //   const clickt = () => {
  //     console.log(isPlaying);
  //     audioRef.current.play();
  //   };
  return (
    <div
      onClick={selectSong}
      className={`library-item ${!song.active ? "" : "current-item"}`}
    >
      <img src={cover} alt="" />
      <div className="library-info">
        <h3>{name}</h3>
        <h4>{artist}</h4>
      </div>
      {/* <button onClick={clickt}>ccccc</button> */}
    </div>
  );
};
export default SongLibMap;
