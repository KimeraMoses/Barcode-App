import PropTypes from 'prop-types';

export function ArrowLeft({ color }) {
  return (
    <svg
      id="arrow-left"
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="21"
      viewBox="0 0 21 21">
      <path
        id="Vector"
        d="M5.311,0,0,5.311l5.311,5.311"
        transform="translate(3.063 5.189)"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        id="Vector-2"
        dataName="Vector"
        d="M14.726,0H0"
        transform="translate(3.211 10.5)"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        id="Vector-3"
        dataName="Vector"
        d="M0,0H21V21H0Z"
        transform="translate(21 21) rotate(180)"
        fill="none"
        opacity="0"
      />
    </svg>
  );
}

ArrowLeft.propTypes = {
  color: PropTypes.string
};

ArrowLeft.defaultProps = {
  color: '#096dd9'
};
