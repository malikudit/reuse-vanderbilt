import React, { useEffect } from "react";
import { useState } from "react";
import "./FAQ.css";

const questions = [
	{
		id: 1,
		question: 'What is Reuse Vandy?',
		answer: 'Suspendisse ipsum elit, hendrerit id eleifend at, condimentum et mauris. Curabitur et libero vel arcu dignissim pulvinar ut ac leo. In sit amet orci et erat accumsan interdum.',
	},
	{
		id: 2,
		question: 'Can I use my personal email to register?',
		answer: 'Suspendisse ipsum elit, hendrerit id eleifend at, condimentum et mauris. Curabitur et libero vel arcu dignissim pulvinar ut ac leo. In sit amet orci et erat accumsan interdum.',
	},
	{
		id: 3,
		question: 'Can I pay people through the website?',
		answer: 'Suspendisse ipsum elit, hendrerit id eleifend at, condimentum et mauris. Curabitur et libero vel arcu dignissim pulvinar ut ac leo. In sit amet orci et erat accumsan interdum.',
	},
	{
		id: 4,
		question: 'How does the bidding feature work?',
		answer: 'Suspendisse ipsum elit, hendrerit id eleifend at, condimentum et mauris. Curabitur et libero vel arcu dignissim pulvinar ut ac leo. In sit amet orci et erat accumsan interdum.',
	},
]

const Searchbar = props => {
	const [value, setValue] = useState('');
	const handleChange = (e) => {
		setValue(e.target.value);
		props.onSearchChange(e)
	}
	return (
		<form class="form-faq">
			<svg viewBox="0 0 512 512" width="100" title="search">
				<path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" />
			</svg>
			<input class="searchbar-faq" type="text" placeholder="Type your question here!" onChange={handleChange} value={value} />
		</form>
	)
}

const Question = props => {
	const [isActive, setActive] = React.useState(false);
	const handleClick = (id) => {
		setActive(!isActive)
	}
	return (
		<div class="question-wrapper">
			<div class="question" id={props.id}>
				<h3 class="h3-faq">{props.question}</h3>
				<button class="button-faq" onClick={() => handleClick(props.id)}>
					<svg class={isActive ? 'active' : ''} viewBox="0 0 320 512" width="100" title="angle-down">
						<path d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z" />
					</svg>
				</button>
			</div>
			<div class={isActive ? 'answer active' : 'answer'}>{props.answer}</div>
		</div>
	)
}

export default function FAQ() {
	const [searchTerm, setSearchTerm] = React.useState('');
	const [searchResults, setSearchResults] = React.useState([]);
	const handleSearchChange = e => {
		setSearchTerm(e.target.value.toLowerCase());
	};

	useEffect(() => {
		const results = questions.filter(item =>
			item.question.toLowerCase().includes(searchTerm)
		);
		setSearchResults(results);
	}, [searchTerm]);


	return (
		<div class="faq-container">
			<h2 class="heading-faq">Frequently Asked Questions</h2>
			<Searchbar onSearchChange={handleSearchChange} />
			<section class="faq">
				{searchResults.map(item => <Question question={item.question} answer={item.answer} />)}
			</section>
		</div>
	)
}
