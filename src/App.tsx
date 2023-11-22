import React, {ChangeEventHandler, useEffect, useMemo, useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Alert, Button, Card, Col, Container, ListGroup, Row} from "react-bootstrap";
import {questions, TQuestions} from "./questions";


function App() {
    const [questionIndex, setQuestionIndex] = useState<number>(0);
    const [answer, setAnswer] = useState<number | null>(null);
    const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
    const [disable, setDisable] = useState<boolean>(false);

    const currentQuestion: TQuestions = useMemo(() => {
        return questions[questionIndex];
    }, [questions, questionIndex])

    const correctAnswer = useMemo(() => {
        const correctAnswer = `answer${currentQuestion.correctAnswer}`;
        return currentQuestion[correctAnswer as keyof TQuestions];
    }, [currentQuestion])

    useEffect(() => {
        nextQuestion();
    }, [])

    const nextQuestion = () => {
        console.log('nextQuestion')
        setAnswer(null)
        setIsSuccess(null)
        setDisable(false)
        setQuestionIndex(Math.floor(Math.random() * (questions.length + 1)))
    }


    function checkAnswer() {
        console.log('checkAnswer')
        setDisable(true)
        setIsSuccess(answer === currentQuestion.correctAnswer);
    }

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setAnswer(parseInt(e.target.value))
    }
    return (
        <Container>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>{currentQuestion.question}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">({currentQuestion.category})</Card.Subtitle>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroup.Item>
                                <label className="answer">
                                    <input name="answer" type={"radio"} value={1}
                                           disabled={disable}
                                           checked={answer === 1}
                                           onChange={handleChange}/> {currentQuestion.answer1}
                                </label>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <label className="answer">
                                    <input name="answer" type={"radio"} value={2}
                                           disabled={disable}
                                           checked={answer === 2}
                                           onChange={handleChange}/> {currentQuestion.answer2}
                                </label>
                            </ListGroup.Item>
                            {
                                currentQuestion.answer3 && <ListGroup.Item>
                                    <label className="answer">
                                        <input name="answer" type={"radio"} value={3}
                                               disabled={disable}
                                               checked={answer === 3}
                                               onChange={handleChange}/> {currentQuestion.answer3}
                                    </label>
                                </ListGroup.Item>
                            }
                            {
                                currentQuestion.answer4 && <ListGroup.Item>
                                    <label className="answer">
                                        <input name="answer" type={"radio"} value={4}
                                               disabled={disable}
                                               checked={answer === 4}
                                               onChange={handleChange}/> {currentQuestion.answer4}
                                    </label>
                                </ListGroup.Item>
                            }
                        </ListGroup>
                        <Card.Footer>
                            {isSuccess != null && <Alert variant={isSuccess ? 'success' : 'danger'}>
                                {correctAnswer}
                            </Alert>}
                            <Row>
                                {
                                    disable ?
                                        <Button variant="info" onClick={nextQuestion}>Next</Button> :
                                        <Button disabled={answer == null || disable} variant="primary"
                                                onClick={checkAnswer}>Check</Button>

                                }
                            </Row>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>


        </Container>
    );
}

export default App;
