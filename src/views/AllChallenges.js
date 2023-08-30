import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import sbcExample from './../services/sbcExample';

import 'bootstrap/dist/css/bootstrap.min.css';
import { request } from '../services/RESTRequest';

function AllChallenges() {
  const initialValue = [];
  const [challengesChosen, setChallengesChosen] = useState(initialValue);

  return (
    <div className="App">
      <h1 className="headerText">SBC Solver</h1>
      {sbcExample.map((sbc) => (
        <Card className="SEOValidation">
          <Card.Body>
            <Card.Text>
              <Row>
                <Col sm={6}>
                  <Card.Title>{sbc.name}</Card.Title>
                </Col>
                {sbc.challenges.map((challenge) => (
                  <Form.Check
                    type={'checkbox'}
                    onChange={() => {
                      setChallengesChosen([...challengesChosen, challenge.id]);
                    }}
                    label={challenge.challengeName}
                  />
                ))}
              </Row>
            </Card.Text>

            <Button
              className="modalButtonConv"
              onClick={() =>
                request(
                  process.env.REACT_APP_CUSTOM_RESOLVERS_URL +
                    '/calculate_solutions'
                )
              }
              variant="primary"
              type="submit"
            >
              Choose this sbc
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default AllChallenges;
