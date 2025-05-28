import { type FC } from "react";
import PlayIcon from "@assets/icons/circle-play-regular.svg?react";
import mockData from "@constants/mockData.json";

import { useStore } from "@/store/Root.store";
import { getSimplifiedWeatherDescription } from "@/utils/weatherUtils";

import styles from "@styles/components/MusicDisplay.module.scss";

export const MusicDisplay: FC = () => {
  const { weather } = useStore().weather;
  const simplifiedWeatherCode = getSimplifiedWeatherDescription(
    weather.length ? weather[0].weatherCode : -1,
  );

  const musicData = mockData.find(
    item => item.weather === simplifiedWeatherCode,
  );

  return (
    <div className={styles.music}>
      <div className={styles.musicContainer}>
        <span className={styles.musicTitle}>Recommended playlist</span>
        <div className={styles.musicPlaylist}>
          {musicData ? (
            <span className={styles.musicPlaylistTitle}>
              {musicData.playlist.title}
            </span>
          ) : (
            <h1 className={styles.musicPlaylistTitle}>
              No playlist available for the current weather.
            </h1>
          )}
          {musicData &&
            musicData.playlist.songs.map((song, index) => (
              <div key={index} className={styles.musicPlaylistSong}>
                <a
                  href={song.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={
                    styles.musicPlaylistSongName
                  }>{`${index + 1}. ${song.name}`}</a>
              </div>
            ))}
        </div>
      </div>
      {musicData && (
        <a
          className={styles.musicButtonContainer}
          href={musicData && musicData.playlist.link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open music playlist">
          <PlayIcon className={styles.musicButton} />
        </a>
      )}
    </div>
  );
};
