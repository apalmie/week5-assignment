import React, { Component } from 'react';
import { Form, Col } from 'react-bootstrap';
import Episodes from './Episodes';

class SeriesDetails extends Component {
    state = {
        series: this.props.series,
        baseURL: this.props.baseURL,
        selectedSeason: -1
    }

    generateOptions = (upperLimit) => {

        let counter = upperLimit;
        let options = [];

        while (counter > 0) {
            options.unshift(<option key={counter}>{counter}</option>);
            counter--;
        }

        options.unshift(<option key={0} >Choose...</option>);
        return options;
    }

    handleChange = (e) => {
        if (e.target.id === 'season-select' && e.target.value !== 'Choose...') {
            this.setState({
                selectedSeason: parseInt(e.target.value)
            })
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.series.uid !== this.props.series.uid) {
            this.setState({
                series: this.props.series
            })
        }
    }

    render() {
        const { series, baseURL, selectedSeason } = this.state;
        const isSeasonSelected = selectedSeason > 0 ? true : false;

        console.log(selectedSeason);

        return (
            <div>
                <Form.Row>
                    <Form.Group controlId="season-select" as={Col}>
                        <Form.Label>Select Season</Form.Label>
                        <Form.Control
                            as="select"
                            value={parseInt(selectedSeason) === -1 ? 'Choose Season...' : selectedSeason}
                            onChange={this.handleChange}
                        >
                            {this.generateOptions(series.seasonsCount)}
                        </Form.Control>
                    </Form.Group>
                    {isSeasonSelected &&
                        <Episodes
                            baseURL={baseURL}
                            seriesUID={series.uid}
                            season={selectedSeason}
                            genOptions={this.generateOptions}
                            updatedEpisode={this.props.updatedEpisode}
                        />
                    }
                </Form.Row>

            </div>
        )
    }
}

export default SeriesDetails;
