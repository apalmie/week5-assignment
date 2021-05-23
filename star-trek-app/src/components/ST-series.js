import React, { useState, useEffect } from 'react';
import {
    Container,
    Dropdown,
    DropdownButton,
    InputGroup,
    Jumbotron,
    Form,
    Col
} from 'react-bootstrap';

export default function STseries(props) {

    const [isSelected, setIsSelected] = useState(false);
    const [seriesOptions, setSeriesOptions] = useState([]);
    const [selectedSeries, selectSeriesOption] = useState('');
    
    const [isSeasonSelected, setSeasonSelected] = useState(false);
    const [seasons, setSeasons] = useState([]);
    const [selectedSeason, setSelectedSeason] = useState(-1);

    const [seasonEpisodes, setSeasonEpisodes] = useState([]);
    const [selectedEpisode, setSelectedEpisode] = useState(-1);

    const handleSelect = (e) => {
        selectSeriesOption(seriesOptions[e].title);
        selectedSeries.title === ''
            ? setIsSelected(false)
            : setIsSelected(true)
        props.updateSelected(seriesOptions[e]);
        setSeasonSelected(false);
        setSelectedSeason(-1);
        setSeasonEpisodes([]);
        setSelectedEpisode(-1);
    }

    const handleChange = (e) => {
        if (e.target.id === 'season-select') {
            if (e.target.value === 'Choose Season...') { 
                setSelectedSeason(-1);
                setSeasonEpisodes([]);
                setSelectedEpisode(-1);
            }
            else {
                setSelectedSeason(parseInt(e.target.value));
                setSeasonSelected(true);
            }
        }
        if (e.target.id === 'episode-select') {
            setSelectedEpisode(parseInt(e.target.value));
        }
    }

    const getSeasonEpisodes = (series) => {
        console.log(series);

        let episodeCount = series[0].numberOfEpisodes;
        let episodes = [];

        while(episodeCount > 0) {
            episodes.unshift(<option key={episodeCount}>{episodeCount}</option>);
            episodeCount--;
        }

        episodes.unshift(<option key={0}>Choose Episode...</option>);

        return episodes;
    }

    const getSeriesSeasons = (series) => {

        let seasons = series.seasonsCount;
        const seasonOptions = [];

        while (seasons > 0) {
            seasonOptions.unshift(<option key={seasons}>{seasons}</option>);
            seasons--;
        }

        seasonOptions.unshift(<option key={0}>Choose Season...</option>);
        return seasonOptions;
    }

    const getSeriesDetails = (seriesChoices, seriesSelected) => {

        if (!seriesChoices) { return; }
        else {
            const series = seriesChoices.filter(s => s.title === seriesSelected);
            const selected = series[0];

            return (
                <div>
                    <p>Series Abbreviation: {selected.abbreviation}</p>
                    <p>Season Count: {selected.seasonsCount}</p>
                    <p>Episode Count: {selected.episodesCount}</p>
                    <p>Original Run Start Date: {selected.originalRunStartDate}</p>
                    <p>Original Run End Date: {selected.originalRunEndDate}</p>

                    <Form>
                        <Form.Row>
                            <Form.Group controlId="season-select" as={Col}>
                                <Form.Label>Select Season</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={selectedSeason === -1 ? 'Choose Season...' : selectedSeason}
                                    onChange={handleChange}
                                >
                                    {isSelected && getSeriesSeasons(selected)}
                                </Form.Control>
                            </Form.Group>
                            <br />
                            {isSeasonSelected &&
                                <Form.Group controlId="episode-select" as={Col}>
                                    <Form.Label>Select Episode</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={selectedEpisode === -1 ? 'Choose Season...' : selectedEpisode}
                                        onChange={handleChange}
                                    >
                                        {getSeasonEpisodes(seasonEpisodes)}
                                    </Form.Control>
                                </Form.Group>
                            }
                        </Form.Row>
                    </Form>
                </div>
            )
        }
    }

    useEffect(() => {

        const seasonsArray = seasons;
        
        console.log('Season Changed');
        const pickedSeason = seasonsArray.filter(s => s.series.title === selectedSeries && s.seasonNumber === selectedSeason);        
        setSeasonEpisodes(pickedSeason);

        console.log(pickedSeason);

    },[selectedSeries, selectedSeason, seasons])

    useEffect(() => {

        fetch(`${baseURL}/series/search`)
            .then(resp => {
                let jsonResp = resp.json();
                return jsonResp;
            })
            .then((seriesData) => {
                setSeriesOptions(seriesData.series.filter(s => s.abbreviation !== null));
            })
            .catch(() => {
                console.log('Error')
            });

        fetch(`${baseURL}/season/search`)
            .then(resp => resp.json())
            .then(seasonData => {
                setSeasons(seasonData.seasons);
            })
            .catch(() => {
                console.log('Error');
            });

        // // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <Container fluid>
                <br />
                <InputGroup className="mb-3">
                    <DropdownButton
                        as={InputGroup.Prepend}
                        variant="outline-secondary"
                        title="Select Series"
                        id="input-group-dropdown-1"
                        onSelect={handleSelect}
                    >
                        {seriesOptions.map((series, idx) => {
                            return (
                                <Dropdown.Item
                                    key={series.uid}
                                    eventKey={idx}
                                    id={selectedSeries}
                                >
                                    {series.title}
                                </Dropdown.Item>
                            )
                        })}
                    </DropdownButton>
                    {isSelected && (
                        <InputGroup.Append>
                            <InputGroup.Text>
                                {selectedSeries}
                            </InputGroup.Text>
                        </InputGroup.Append>
                    )}
                </InputGroup>
                {isSelected &&
                    <div>
                        <Jumbotron>
                            <div>
                                <h4>Details for {selectedSeries}</h4>
                                {getSeriesDetails(seriesOptions, selectedSeries)}
                            </div>
                        </Jumbotron>
                    </div>
                }
            </Container>
        </div>
    )
}