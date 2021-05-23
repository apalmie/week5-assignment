import React, { useState } from 'react'
import { Accordion, Card, Button } from 'react-bootstrap';
import { isEmpty } from 'lodash';

export default function CharacterProfile(props) {

    const [isExpanded, setExpanded] = useState(props.isExpanded);

    const getBirthDay = (year, month, day) => {
        if (!year && !month && !day) {
            return 'UNKNOWN'
        } else {
            return new Date(year, month - 1, day).toDateString();
        }
    }

    const getSpecies = (species) => {

        let spec = '';

        if(!isEmpty(species)) {
            species.forEach(s => {
                spec = spec === '' ? s.name : `${spec}, ${s.name}`;
            })
        }

        return <span>{spec}</span>
    }

    const getTitles = (titles) => {
        
        let title = '';

        if(!isEmpty(titles)) {
            titles.forEach(t => {
                title = title === '' ? t.name : `${title}, ${t.name}`
            })
        }

        return <span>{title}</span>
    }

    return (
        <div>
            <Card>
                <Card.Header>
                    <Accordion.Toggle as={Button} eventKey="0" variant="link" onClick={() => setExpanded(!isExpanded)}>
                        Personal Details {props.getChevron(isExpanded)}
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <Card.Text>
                            UID: <span>{props.profile.uid}</span>
                        </Card.Text>
                        <Card.Text>
                            Rank/Title: {getTitles(props.profile.titles)}
                        </Card.Text>
                        <Card.Text>
                            Date of Birth: <span>{getBirthDay(props.profile.yearOfBirth, props.profile.monthOfBirth, props.profile.dayOfBirth)}</span>
                           </Card.Text>
                        <Card.Text>
                            Marital Status: <span>{props.profile.maritalStatus}</span>
                        </Card.Text>
                        <Card.Text>
                            Gender: <span>{props.profile.gender}</span>
                        </Card.Text>
                        <Card.Text>
                            Species: {getSpecies(props.profile.characterSpecies)}
                        </Card.Text>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </div>
    )
}
