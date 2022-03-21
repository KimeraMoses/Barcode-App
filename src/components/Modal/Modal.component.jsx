import PropTypes from 'prop-types';
import { useEffect } from 'react';
import './Modal.styles.scss';

export function Modal({ heading, content, showModal }) {
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = 'auto';
      };
    }

    return null;
  }, [showModal]);

  return (
    <div className={`modal ${showModal ? 'modal-show' : ''}`}>
      <div className="modal__inner">
        <div className="modal__inner-heading">{heading}</div>
        <div className="modal__inner-content">{content}</div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  heading: PropTypes.oneOf([PropTypes.string, PropTypes.element]),
  content: PropTypes.oneOf([PropTypes.string, PropTypes.element]),
  showModal: PropTypes.bool
};

Modal.defaultProps = {
  heading: 'Check In Users',
  content: 'Please select the users.',
  showModal: false
};
