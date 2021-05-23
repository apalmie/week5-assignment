import React, { Component } from 'react';
import CharacterData from './CharacterData';


export default class characterSearch extends Component {
    state = {
        pageSize: 250,
        currentPage: 0,
        totalPages: 0,
        characters: []
    }

    

    performSearch = () => {

        const baseURL = 'http://stapi.co/api/v1/rest';
        const uid = this.props.episode.seasonUID;
        const episodeNum = this.props.episode.episodeNum;

        fetch(`${baseURL}/season?uid=${uid}`)
        .then(resp => {
            const respJson = resp.json();
            return respJson;
        })
        .then((seasonData) => {
            const episodeData = seasonData.season.episodes;
            const episode = episodeData.filter(e => e.episodeNumber === episodeNum);
            const eUID = episode[0].uid;

            fetch(`${baseURL}/episode?uid=${eUID}`)
                .then(resp => {
                    const respJson = resp.json();
                    return respJson;
                })
                .then(episodeData => {
                    const characterData = episodeData.episode.characters;
                    this.setState({
                        characters: characterData
                    })
                })
        })
        .catch(() => {
            console.log('Error');
        })
    }

    componentDidMount() {
        this.performSearch();
    }

    componentDidUpdate(prevProps) {
        if(prevProps !== this.props) {
            this.performSearch();
        }
    }

    render() {
        return (
            <div>
                <h2>Episode Characters ({this.state.characters.length}) </h2>
                <CharacterData characters={this.state.characters}/>
            </div>
        )
    }
}
