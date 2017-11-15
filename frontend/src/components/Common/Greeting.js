import PropTypes from 'prop-types';

const GreetingComponent = ({ prepend, append }) => {
  const curHr = new Date().getHours();
  let greeting = 'Good ';
  if (curHr < 12) {
    greeting += 'Morning ';
  } else if (curHr < 18) {
    greeting += 'Afternoon ';
  } else {
    greeting += 'Evening ';
  }

  if (append) {
    greeting = greeting + append;
  }

  if (prepend) {
    greeting = prepend + greeting;
  }

  return greeting;
};

GreetingComponent.propTypes = {
  prepend: PropTypes.string,
  append: PropTypes.string
};

export default GreetingComponent;
