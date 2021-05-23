import React, { Component } from 'react';
import { Form, Col } from 'react-bootstrap';

class Episodes extends Component {
    state = {
        uid: this.props.seriesUID,
        baseURL: this.props.baseURL,
        selectedSeason: this.props.season,
        episodeCount: 0,
        selectedEpisode: -1,
        seasonUID: null
    }

    performSearch = () => {
        fetch(`${this.state.baseURL}/season/search`)
            .then(resp => resp.json())
            .then(seasonData => {
                const seasons = seasonData.seasons;
                const season = seasons.filter(s => s.series.uid === this.state.uid && s.seasonNumber === this.state.selectedSeason);
                const eCount = season[0].numberOfEpisodes;

                this.setState({
                    episodeCount: eCount,
                    seasonUID: season[0].uid
                });
            })
            .catch(() => {
                console.log('Error');
            });
    }

    componentDidMount() {
        this.performSearch();
    }

    handleChange = (e) => {
        if (e.target.id === 'episode-select' && e.target.value !== 'Choose...') {
            this.setState({
                selectedEpisode: parseInt(e.target.value)
            })

            const ep = {
                seasonUID: this.state.seasonUID,
                episodeNum: parseInt(e.target.value)
            }
    
            this.props.updatedEpisode(ep);
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {

            this.setState({
                selectedSeason: this.props.season
            });

            console.log('Updating..');
            this.performSearch();
            console.log('Updated');
        }
    }


    render() {

        const { selectedEpisode, episodeCount } = this.state;

        return (
            <Form.Group controlId="episode-select" as={Col}>
                <Form.Label>Select Episode</Form.Label>
                <Form.Control
                    as="select"
                    value={selectedEpisode === -1 ? 'Choose Season...' : selectedEpisode}
                    onChange={this.handleChange}
                >
                    {this.props.genOptions(episodeCount)}
                </Form.Control>
            </Form.Group>
        )
    }
}

export default Episodes;
