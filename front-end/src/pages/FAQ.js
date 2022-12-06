import React, { useEffect } from 'react';
import { useState } from 'react';
import '../css/FAQ.css';

var questions = [
  {
    id: 1,
    question: 'What is Reuse Vandy?',
    answer:
      'Reuse Vandy is a website implementation of the GroupMe group “Reuse Vandy”. It is a marketplace site that seeks to streamline the transfer of used goods that users enjoy from the GroupMe without the drawbacks of the chat.',
  },
  {
    id: 2,
    question: 'How does listing an item work?',
    answer: [
      'When visiting the “Listings” Tab, you will be prompted with text fields to fill out in order to list a new product. Each product must have the following characteristics:',
      '\n1. Between 1-5 images of the product\n2. A title\n3. A description\n4. The condition of the product\n5. The location where you would like to exchange the product\n6. The date you want the listing to expire (must be at least 3 hours ahead but no more than 14 days ahead)\n7. Category\n8. Whether you want the product to be bid only or listing price only\na. Bid-only products require a starting bid price and a bid increment. All bids placed on the product must be a multiple of the bid increment.\nb. Listing-price only require one field: the listing price. This can be considered the buy-now price, and when a prospective buyer submits this offer, they are committing to buying the product at that price only.',
    ],
  },
  {
    id: 3,
    question: 'What states do products have?',
    answer:
      '1. Products have different states based on where they are in the purchasing process.\n2. Active State:\na. The product is currently open to bids (in the case it is a bid-only product) or listing-price offers (in the case it is a listing-price product). The product is in the active state as long as there is still time left on the listing.\nb. For bid-only products: All registered users have the option to bid on a product at the current bid price plus the bid increment.\nc. For listing-price products: All registered users have the option to commit to purchasing the product at that listing price.\n3. Evaluating Offers State:\na. If an active product has received at least one offer by the time the expiration date is reached, it will enter the evaluating offers phase.\nb. For bid-only products: The seller will choose the highest bid that they are willing to accept. If the seller accepts the highest bid, the product will enter the sold state. If the seller does not accept the highest bid, the product will enter the expired state.\nc. For listing-price products: The seller will choose the highest offer that they are willing to accept. If the seller accepts the highest offer, the product will enter the sold state. If the seller does not accept the highest offer, the product will enter the expired state.\n4. Sold State:\na. The product has been sold to a buyer.\nb. The buyer and seller will be able to communicate through the website to arrange a time and place to exchange the product.\n5. Expired State:\na. The product has not been sold to a buyer.\nb. The seller can choose to relist the product, in which case it will enter the active state again.',
  },
  {
    id: 4,
    question: 'Can I pay people through the site?',
    answer:
      'No. When a listing runs out of time, the buyer and seller will receive each other’s contact information and coordinate the logistics of the purchase and payment.',
  },
  {
    id: 5,
    question: 'Is this page only limited to Vanderbilt?',
    answer:
      'For now yes. You must use a vanderbilt.edu email to register an account.',
  },
  {
    id: 6,
    question: 'Is the site final?',
    answer: 'No. We are still working to add updates to the page as needed!',
  },
];

const Searchbar = (props) => {
  const [value, setValue] = useState('');
  const handleChange = (e) => {
    setValue(e.target.value);
    props.onSearchChange(e);
  };
  return (
    <form class="form-faq">
      <svg viewBox="0 0 512 512" width="100" title="search">
        <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" />
      </svg>
      <input
        class="searchbar-faq"
        type="text"
        placeholder="Type your question here!"
        onChange={handleChange}
        value={value}
      />
    </form>
  );
};

const Question = (props) => {
  const [isActive, setActive] = React.useState(false);
  const handleClick = (id) => {
    setActive(!isActive);
  };
  return (
    <div class="question-wrapper">
      <div class="question" id={props.id}>
        <h3 class="h3-faq">{props.question}</h3>
        <button class="button-faq" onClick={() => handleClick(props.id)}>
          <svg
            class={isActive ? 'active' : ''}
            viewBox="0 0 320 512"
            width="100"
            title="angle-down"
          >
            <path d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z" />
          </svg>
        </button>
      </div>
      <div class={isActive ? 'answer active' : 'answer'}>{props.answer}</div>
    </div>
  );
};

export default function FAQ() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([]);
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  useEffect(() => {
    const results = questions.filter((item) =>
      item.question.toLowerCase().includes(searchTerm)
    );
    setSearchResults(results);
  }, [searchTerm]);

  return (
    <div class="faq-container">
      <h2 class="heading-faq">Frequently Asked Questions</h2>
      <Searchbar onSearchChange={handleSearchChange} />
      <section class="faq">
        {searchResults.map((item) => (
          <Question question={item.question} answer={item.answer} />
        ))}
      </section>
    </div>
  );
}
