import React, { Component } from 'react';
import StarTrekSeries from './ST-series copy';
import Characters from './characterSearch';

export default class seasonSearch extends Component {
    state = {
        isLoading: true,
        selectedSeries: {},
        selectedEpisode:{}
    }

    setSelected = (chosenSeries) => {
        this.setState({
            selectedSeries: chosenSeries
        })
    }

    setLoading = (loading) => {
        this.setState({
            isLoading: loading
        })
    }

    setEpisode = (episode)  => {
        this.setState({
            selectedEpisode: episode
        })
    }
 

    render() {

        const { isLoading, selectedEpisode } = this.state;

        return (
            <div>
                <StarTrekSeries
                    updateSelected={this.setSelected}
                    updateLoading={this.setLoading}
                    updatedEpisode={this.setEpisode}
                />
            {!isLoading && <Characters episode={selectedEpisode} />}
            </div>
        )
    }
}
