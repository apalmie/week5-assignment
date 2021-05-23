import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import { Card, Button, Container } from 'react-bootstrap'
import {ReactComponent as Chevron} from 'bootstrap-icons/icons/chevron-double-right.svg';

export default class CharacterData extends Component {

    getBirthDay = (year, month, day) => {
        if (!year && !month && !day) {
            return 'UNKNOWN'
        } else {
            return new Date(year, month - 1, day).toDateString();
        }
    }

    handleClick = (e) => {
        console.log(e);
    }

    render() {
        console.log(this.props.characters);
        return (
            <Container fluid>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
                    {this.props.characters.map(character => {
                        return (
                            <div className="col mb-4" key={character.uid}>
                                <Card >
                                    <Card.Body>
                                        <Card.Title>{character.name}</Card.Title>
                                        <Card.Text>
                                            UID: <span> {character.uid} </span>
                                        </Card.Text>
                                        <Card.Text>
                                            DOB: <span> {this.getBirthDay(character.yearOfBirth, character.monthOfBirth, character.dayOfBirth)}</span>
                                        </Card.Text>
                                        <Card.Text>
                                            Marital Status: <span> {character.maritalStatus}</span>
                                        </Card.Text>
                                    </Card.Body>
                                    <Card.Footer>
                                        <Button
                                            variant="light"
                                            id={character.uid}
                                            style={{ float:"right"}}
                                        >
                                            <Link
                                                to={`/character/${character.uid}`}
                                            >
                                                Character Profile
                                                <Chevron />
                                            </Link>
                                        </Button>
                                    </Card.Footer>
                                </Card>
                            </div>
                        )
                    })}
                </div>
            </Container>
        )
    }
}
