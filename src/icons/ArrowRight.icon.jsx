import PropTypes from 'prop-types';

export function ArrowRight({ color = '#096dd9' }) {
  return (
    <svg
      id="arrow-right"
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="21"
      viewBox="0 0 21 21">
      <path
        id="Vector"
        d="M0,0,5.311,5.311,0,10.622"
        transform="translate(12.626 5.189)"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        id="Vector-2"
        d="M0,0H14.726"
        transform="translate(3.063 10.5)"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        id="Vector-3"
        d="M0,0H21V21H0Z"
        transform="translate(21 21) rotate(180)"
        fill="none"
        opacity="0"
      />
    </svg>
  );
}

ArrowRight.propTypes = {
  color: PropTypes.string
};

ArrowRight.defaultProps = {
  color: '#096dd9'
};
