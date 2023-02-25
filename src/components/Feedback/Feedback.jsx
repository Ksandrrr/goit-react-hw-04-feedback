import { useState } from 'react';
import Statistics from './Statistics/Statistics';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Notification from './Notification/Notification';
import Section from './Section/Section';

const Feedback = () => {
  const [state, setState] = useState({ good: 0, neutral: 0, bad: 0 });

  const countTotalFeedback = () => {
    const total = state.good + state.neutral + state.bad;
    return total;
  };
  const countPositiveFeedbackPercentage = () => {
    const positiveFeedback = Math.round(
      (state.good * 100) / countTotalFeedback()
    );
    return positiveFeedback;
  };
  const onLeaveFeedback = event => {
    const { name } = event.target;
    setState(prevState => ({
      ...prevState,
      [name]: prevState[name] + 1,
    }));
  };

  const total = countTotalFeedback();
  const positivePercentage = countPositiveFeedbackPercentage();

  return (
    <Section title="Please leave feedback">
      <FeedbackOptions
        options={Object.keys(state)}
        onLeaveFeedback={onLeaveFeedback}
      />
      {total === 0 ? (
        <Notification message="There is no feedback" />
      ) : (
        <Statistics
          good={state.good}
          neutral={state.neutral}
          bad={state.bad}
          total={total}
          positivePercentage={positivePercentage}
        />
      )}
    </Section>
  );
};

export default Feedback;
