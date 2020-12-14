import React, {useEffect, useState} from 'react';

import { BBTimelineCharacter, BBTimelineEpisode } from "../types";

import BBTimeline from "../components/BBTimeline";

const BBTimelinePage = () => {
  const [bbEpisodes, setBbEpisodes] = useState<BBTimelineEpisode[]>([]);
  const [bbCharacters, setBbCharacters] = useState<BBTimelineCharacter[]>([]);
  const [highlight, setHighlight] = useState<string>('');

  useEffect(() => {
    fetch('https://www.breakingbadapi.com/api/characters?category=Breaking+Bad')
      .then((res) => res.json())
      .then((characters: BBTimelineCharacter[]) => {
        setBbCharacters(
          characters.sort((a, b) => a.name.localeCompare(b.name))
        )
      })
      .catch(console.error)
  }, [])

  useEffect(() => {
    fetch('https://www.breakingbadapi.com/api/episodes?series=Breaking+Bad')
      .then(res => res.json())
      .then((episodes: BBTimelineEpisode[]) => {
        setBbEpisodes(episodes)
      })
  }, [])

  return (
    <>
      <BBTimeline data={bbEpisodes} highlight={highlight} />

      <div className="app__gauge-chart-page__buttons flex flex-center">
        <select name="character" id="character" value={highlight} onChange={(e) => {
          setHighlight(e.target.value)
        }}>
          <option value="" disabled>Select character</option>
          {bbCharacters.map((character) => (
            <option key={character.name}>{character.name}</option>
          ))}
        </select>
      </div>
    </>
  );
};

export default BBTimelinePage;