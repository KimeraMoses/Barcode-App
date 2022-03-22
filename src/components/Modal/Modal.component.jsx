import './Modal.styles.scss';

export function Modal({ heading, content, showModal }) {
  return (
    <div className={`modal ${showModal ? 'modal-show' : ''}`}>
      <div className="modal__inner">
        <div className="modal__inner-heading">{heading}</div>
        <div className="modal__inner-content">{content}</div>
      </div>
    </div>
  );
}
