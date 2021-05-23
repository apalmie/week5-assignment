import React, { useState } from 'react'
import { Accordion, Card, Button } from 'react-bootstrap';
import { isEmpty } from 'lodash';

export default function CharacterOrg(props) {

    const [isExpanded, setExpanded] = useState(props.isExpanded);

    const getOrgDetails = () => {

        let orgs = [];

        if(!isEmpty(props.org)) {
            props.org.forEach(o => {
                orgs.push(<Card.Text key={o.uid}>
                    Organization Name: <span>{o.name}</span>
                </Card.Text>)
            })
        }

        return orgs;
    }

    return (
        <Card>
            <Card.Header>
                <Accordion.Toggle as={Button} eventKey="1" variant="link" onClick={() => setExpanded(!isExpanded)}>
                    Organization Details {props.getChevron(isExpanded)}
                </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
                <Card.Body>
                    {getOrgDetails()}
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    )
}
