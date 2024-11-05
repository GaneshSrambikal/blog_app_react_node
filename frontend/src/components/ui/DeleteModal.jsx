import '../../styles/modals.css';
import { MdDelete } from 'react-icons/md';
import { useEffect } from 'react';
import { Oval } from 'react-loader-spinner';
const DeleteModal = ({ ...props }) => {
  console.log(props.btnProps);
  useEffect(() => {
    scrollTo(0, 0);
  }, []);
  const handleClose = () => {
    props.handleModal();
  };

  return (
    <div className='blg-modal-overlay'>
      <div className='blg-modal-container'>
        <div className='blg-modal-head'>
          <div className='blg-modal-svg-c'>
            <MdDelete style={{ color: 'red' }} />
          </div>
          <p>{props?.headerTitle}</p>
        </div>
        <div className='blg-modal-prompt'>
          <p>{props?.promptTitle}</p>
          <div>
            <button onClick={props.handleDelete} disabled={props.isLoading}>
              {props.isLoading ? (
                <>
                  {' '}
                  <Oval
                    visible={props.isLoading}
                    height='20'
                    width='20'
                    color='#fff'
                    ariaLabel='oval-loading'
                    wrapperStyle={{ marginRight: '.3rem' }}
                    wrapperClass=''
                  />{' '}
                  deleting
                </>
              ) : (
                `Delete`
              )}
            </button>
            <button className='' onClick={handleClose}>
              close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
