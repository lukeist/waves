import react from "react";
import SongLibMap from "./SongLibMap";

const SongLib = ({
  songLib,
  setSongLib,
  currentSong,
  makeAllSongsInactive,
  isPlaying,
  setIsPlaying,
  stopAllSongAudio,
  currentSongAudio,
  setCurrentSongAudio,
  setCurrentSong,
  songInfo,
  setSongInfo,
  audioRef,
  libIsOpening,
}) => {
  const testClick = () => {
    console.log(songLib);
  };
  return (
    <div className={`song-library ${libIsOpening ? "library-opening" : ""}`}>
      {songLib.map((song) => (
        <SongLibMap
          key={song.id}
          song={song}
          name={song.name}
          artist={song.artist}
          cover={song.cover}
          audio={song.audio}
          active={song.active}
          makeAllSongsInactive={makeAllSongsInactive}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          stopAllSongAudio={stopAllSongAudio}
          currentSongAudio={currentSongAudio}
          setCurrentSongAudio={setCurrentSongAudio}
          setCurrentSong={setCurrentSong}
          audioRef={audioRef}
          songInfo={songInfo}
          setSongInfo={setSongInfo}
        />
      ))}
    </div>
  );
};

export default SongLib;
