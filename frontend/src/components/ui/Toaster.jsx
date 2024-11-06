// import React from 'react'
import { useEffect } from 'react';
import '../../styles/toaster.css';
import { MdCancel } from 'react-icons/md';
const Toaster = ({ message = 'Toaster', type = 'info', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);
  return (
    <div className={`toaster ${type}`}>
      <span>{message}</span>
      <button onClick={onClose} className='toast-cls-btn'>
        <MdCancel />
      </button>
    </div>
  );
};

export default Toaster;
