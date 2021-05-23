import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { ReactComponent as ChevronBack } from 'bootstrap-icons/icons/chevron-double-left.svg';
import { ReactComponent as ChevronDown } from 'bootstrap-icons/icons/chevron-down.svg';
import { ReactComponent as ChevronRight } from 'bootstrap-icons/icons/chevron-right.svg';
import { Accordion } from 'react-bootstrap';
import CharacterOrg from './characterOrg';
import CharacterEpisodes from './characterEpisodes';
import CharacterProfile from './characterProfile';

export default function CharacterBio() {

    const baseURL = 'http://stapi.co/api/v1/rest';
    const [characterBio, setCharacterBio] = useState({});
    const { uid } = useParams();

    useEffect(() => {
        fetch(`${baseURL}/character?uid=${uid}`)
            .then(resp => resp.json())
            .then(characterData => {
                setCharacterBio(characterData.character)
            })
            .catch(() => 'Error')
    }, [uid])

    const getChevron = (expanded) => {

        return expanded ? <ChevronRight /> : <ChevronDown />
    }

    return (
        <div>
            <div>
                <br />
                <Link to={`/seasons`}>
                    <ChevronBack /> Back to Search
                </Link>
            </div>
            <hr />
            <div>
                <h3>{characterBio.name}</h3>
                <Accordion>
                    <CharacterProfile
                        profile={characterBio}
                        species={characterBio.characterSpecies}
                        getChevron={getChevron}
                    />
                    <CharacterOrg
                        org={characterBio.organizations}
                        getChevron={getChevron}
                    />
                    <CharacterEpisodes
                        episodes={characterBio.episodes}
                        getChevron={getChevron}
                    />
                </Accordion>
            </div>
        </div>
    )
}
