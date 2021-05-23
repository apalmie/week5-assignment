import React, { useState, useEffect } from 'react';
import {
    Container,
    Dropdown,
    DropdownButton,
    InputGroup,
    Jumbotron,
    Form,
    Button
} from 'react-bootstrap';

import SeriesDetails from './SeriesDetails';

export default function STseries(props) {

    const [isSelected, setIsSelected] = useState(false);
    const [seriesOptions, setSeriesOptions] = useState([]);
    const [selectedSeries, selectSeriesOption] = useState({});

    const baseURL = 'http://stapi.co/api/v1/rest';

    const handleSelect = (e) => {
        console.log(selectedSeries);
        if(selectedSeries.uid !== seriesOptions[e].uid) {
            setIsSelected(false);
            props.updateLoading(true);
        }

        selectSeriesOption(seriesOptions[e]);
        props.updateSelected(seriesOptions[e]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setTimeout(() => {
            props.updateLoading(false);
        },2000);

    }

    useEffect(() =>{
        
        Object.entries(selectedSeries).length === 0 && isSelected === false ? setIsSelected(false) : setIsSelected(true);

    },[isSelected, selectedSeries])

    useEffect(() => {

        fetch(`${baseURL}/series/search`)
            .then(resp => {
                let jsonResp = resp.json();
                return jsonResp;
            })
            .then((seriesData) => {
                setSeriesOptions(seriesData.series.filter(s => s.abbreviation !== null && s.seasonsCount > 0));
            })
            .catch(() => {
                console.log('Error')
            });
    }, []);

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
                                    id={selectedSeries.title}
                                >
                                    {series.title}
                                </Dropdown.Item>
                            )
                        })}
                    </DropdownButton>
                    {isSelected && (
                        <InputGroup.Append>
                            <InputGroup.Text>
                                {selectedSeries.title}
                            </InputGroup.Text>
                        </InputGroup.Append>
                    )}
                </InputGroup>
                {isSelected &&
                    <Jumbotron>
                        <Form>
                        <SeriesDetails
                            series={selectedSeries}
                            baseURL={baseURL}
                            updatedEpisode={props.updatedEpisode}
                        />
                        <Button onClick={handleSubmit}>Search Characters</Button>
                        </Form>
                    </Jumbotron>}
            </Container>
        </div>
    )
}