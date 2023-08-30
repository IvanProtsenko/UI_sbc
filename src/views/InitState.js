import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { request, buyChallenge } from '../services/RESTRequest';

import 'bootstrap/dist/css/bootstrap.min.css';

function InitState() {
  const [webappEntered, setWebappEntered] = useState(false);
  const [solutions, setSolutions] = useState([]);
  const [chosenChallenges, setChosenChallenges] = useState([]);

  const getSolutions = async () => {
    const result = await request(
      process.env.REACT_APP_CUSTOM_RESOLVERS_URL + 'calculate_solutions'
    );

    console.log(result.allSbc);
    setSolutions(result.allSbc);
  };

  const enterWebapp = async () => {
    const result = await request(
      process.env.REACT_APP_CUSTOM_RESOLVERS_URL + 'enter_webapp'
    );

    console.log(result);
    setWebappEntered(true);
  };

  const chooseChallenges = async () => {
    const challengesToBuy = [];
    solutions.forEach((sbc) => {
      sbc.solutions.forEach((challenge) => {
        if (chosenChallenges.includes(challenge.id)) {
          challengesToBuy.push(challenge);
        }
      });
    });
    await buyChallenge(challengesToBuy);
  };

  const handleChange = async (event) => {
    const currentChosenChallenges = [...chosenChallenges];
    if (event.target.checked) {
      currentChosenChallenges.push(Number(event.target.id));
    } else {
      let indexofChallenge = currentChosenChallenges.indexOf(
        Number(event.target.id)
      );
      if (indexofChallenge !== -1) {
        currentChosenChallenges.splice(indexofChallenge, 1);
      }
    }
    setChosenChallenges(currentChosenChallenges);
  };

  return (
    <div className="App">
      <h1 className="headerText">SBC Solver</h1>
      <Button
        className="modalButtonConv"
        onClick={() => enterWebapp()}
        variant="primary"
        type="submit"
      >
        Enter webapp
      </Button>
      {webappEntered ? (
        <Button
          className="modalButtonConv"
          onClick={() => getSolutions()}
          variant="primary"
          type="submit"
        >
          Calculate solutions
        </Button>
      ) : (
        ''
      )}
      {solutions.map((sbc) => (
        <Card className="SEOValidation">
          <Card.Body>
            <Card.Text>
              <Row>
                <Col sm={6}>
                  <Card.Title>{sbc.name}</Card.Title>
                </Col>
                <div>
                  {sbc.solutions.map((challenge) =>
                    challenge.status != 'COMPLETED' ? (
                      <Form.Check
                        id={challenge.id}
                        onChange={handleChange}
                        label={`${
                          challenge.name
                        } - average price: ${challenge.solution.players
                          .map((player) => player.price)
                          .reduce((partialSum, a) => partialSum + a, 0)}`}
                      />
                    ) : (
                      ''
                    )
                  )}
                </div>
              </Row>
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
      {solutions.length > 0 ? (
        <Button
          className="modalButtonConv"
          onClick={() => chooseChallenges()}
          variant="primary"
          type="submit"
        >
          Choose these challenges
        </Button>
      ) : (
        ''
      )}
    </div>
  );
}

export default InitState;
