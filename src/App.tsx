import React, {ChangeEventHandler, useEffect, useMemo, useState, useCallback} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Alert, Button, Card, Col, Container, ListGroup, Row} from "react-bootstrap";
import {questions, TQuestions} from "./questions";


function App() {
    const [questionIndex, setQuestionIndex] = useState<number>(0);
    const [answer, setAnswer] = useState<number | null>(null);
    const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
    const [disable, setDisable] = useState<boolean>(false);

    const currentQuestion: TQuestions = useMemo(() => questions[questionIndex], [questionIndex]);

    const correctAnswer = useMemo(() => {
        const key = `answer${currentQuestion?.correctAnswer ?? 1}` as keyof TQuestions;
        return currentQuestion[key];
    }, [currentQuestion]);

    const nextQuestion = useCallback(() => {
        setAnswer(null);
        setIsSuccess(null);
        setDisable(false);
        setQuestionIndex(Math.floor(Math.random() * questions.length));
    }, []);

    useEffect(() => {
        nextQuestion();
    }, [nextQuestion]);

    function checkAnswer() {
        console.log('checkAnswer')
        setDisable(true)
        setIsSuccess(answer === currentQuestion.correctAnswer);
    }

    const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        setAnswer(parseInt(e.target.value));
    }, []);

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
                            {[1, 2, 3, 4].map((num) => {
                                const answerKey = `answer${num}` as keyof TQuestions;
                                if (!currentQuestion[answerKey]) return null;
                                return (
                                    <ListGroup.Item key={num}>
                                        <label className="answer">
                                            <input
                                                name="answer"
                                                type="radio"
                                                value={num}
                                                disabled={disable}
                                                checked={answer === num}
                                                onChange={handleChange}
                                            />
                                            {currentQuestion[answerKey]}
                                        </label>
                                    </ListGroup.Item>
                                );
                            })}
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
