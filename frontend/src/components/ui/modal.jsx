import '../../styles/modals.css';
import { Link } from 'react-router-dom';
import ConfettiWrapper from './confetti';
import { FaCircleCheck } from 'react-icons/fa6';
import { useEffect, useRef, useState } from 'react';
const Modal = ({ confetti = false, ...props }) => {
  const [showConfetti, setShowConfetti] = useState(confetti);
  const overlayRef = useRef(null);
  console.log(props.btnProps);
  useEffect(() => {
    scrollTo(0, 0);
    if (showConfetti) {
      setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
    }
    // openModal();
  }, [showConfetti]);
  const handleClose = () => {
    props.handleSuccess();
  };

  return (
    <div className='blg-modal-overlay' ref={overlayRef}>
      <div className='blg-modal-container'>
        <div className='blg-modal-head'>
          <div className='blg-modal-svg-c'>
            <FaCircleCheck />
          </div>
          <p>{props?.headerTitle}</p>
        </div>
        <div className='blg-modal-prompt'>
          <p>{props?.promptTitle}</p>
          <div>
            {props?.btnProps?.btnType == 'link' ? (
              <Link to={props?.btnProps?.link} className=''>
                {props?.btnProps?.text}
              </Link>
            ) : (
              <button>{props?.btnProps?.text}</button>
            )}
            <button className='' onClick={handleClose}>
              close
            </button>
          </div>
        </div>
      </div>
      {showConfetti && <ConfettiWrapper />}
    </div>
  );
};

export default Modal;
