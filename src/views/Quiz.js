import React from 'react';

import { vocabulary } from '../controllers/Vocabulary';

export class Quiz extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nQuestions: 10,
            nthQuestion: 1,
            nCorrect: 0,
            question: this.getRandomQuestion(),
            userInput: "",
            isCorrect: undefined
        };
    }

    getRandomQuestion = () => {
        const index = Math.floor(Math.random() * vocabulary.length);
        console.log({ index, w: vocabulary[index] });
        return vocabulary[index];
    }

    handleInput = (event) => {
        const v = event.target.value;
        console.log({ received: v })
        this.setState({
            ...this.state,
            userInput: v
        }, console.log(this.state))
    }

    handleInputKey = (event) => {
        if (event.key === 'Enter') {
            this.validate();
        }
    }

    normalize(german) {
        return german.replace('ß', 'ss').trim();
    }

    validate = () => {
        const { userInput, question, nCorrect } = this.state;
        if (this.normalize(userInput) === this.normalize(question.de)) {
            this.setState({
                isCorrect: true,
                nCorrect: nCorrect + 1
            });
        }
        else {
            this.setState({
                isCorrect: false
            });
        }
    }

    nextQuestion = () => {
        this.setState({
            nthQuestion: this.state.nthQuestion + 1,
            question: this.getRandomQuestion(),
            userInput: "",
            isCorrect: undefined
        });
    }

    render() {
        const { nCorrect, userInput, nQuestions, nthQuestion, question, isCorrect } = this.state;
        console.log({ question, userInput });
        return <div>
            Quiz: {nthQuestion}/{nQuestions} - {nCorrect} correct
            <br />
            {question && <div>
                {question.en}
                <br />
                <input value={userInput} placeholder="In german is..." onChange={this.handleInput} disabled={isCorrect} onKeyDown={this.handleInputKey} />
                {isCorrect === undefined &&
                    <button onClick={this.validate}>Validate</button>
                }
            </div>}
            {isCorrect === true && <div>
                <h1>Correct!</h1>
                <button onClick={this.nextQuestion}>Next</button>
            </div>}
            {isCorrect === false && <div>
                <h1>Incorrect!</h1>
                <h2>{question.en} -> {question.de}</h2>
                <br />
                <button onClick={this.nextQuestion}>Next</button>
            </div>}
        </div>;
    }
}