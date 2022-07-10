import PropTypes from 'prop-types';

export function Search({ color }) {
  return (
    <svg
      id="search-status"
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="21"
      viewBox="0 0 21 21">
      <path
        id="Vector"
        d="M15.75,7.875A7.875,7.875,0,1,1,7.875,0"
        transform="translate(1.75 1.75)"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        id="Vector-2"
        data-name="Vector"
        d="M.088,1.724c.464,1.4,1.522,1.54,2.336.315C3.168.919,2.678,0,1.33,0A1.23,1.23,0,0,0,.088,1.724Z"
        transform="translate(16.476 16.38)"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        id="Vector-3"
        data-name="Vector"
        d="M0,0H5.25"
        transform="translate(12.25 4.375)"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        id="Vector-4"
        data-name="Vector"
        d="M0,0H2.625"
        transform="translate(12.25 7)"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path id="Vector-5" data-name="Vector" d="M0,0H21V21H0Z" fill="none" opacity="0" />
    </svg>
  );
}

Search.propTypes = {
  color: PropTypes.string
};

Search.defaultProps = {
  color: '#000000'
};
