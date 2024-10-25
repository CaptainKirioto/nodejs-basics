import { createFakeSong } from '../../utils/songs/createFakeSongs.js';
import { readSongs } from '../../utils/songs/readSongs.js';
import { writeSongs } from '../../utils/songs/writeSongs.js';

const generateSongs = async (number) => {
  const songs = await readSongs();
  const newSongs = Array(number).fill().map(createFakeSong);
  const result = [...songs, ...newSongs];
  await writeSongs(result);
};

generateSongs(5);
