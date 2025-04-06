import React from 'react';
import './ModalDialog.css';

const ModalDialog = ({ children }) => {
    return (
        <div className='modal-dialog' role='dialog'>
            <div className='dialog-header'>
                <button 
                    className='close-btn'
                    onClick={() => closeModalDialog()}
                >
                    X
                </button>
            </div>
            <div className='dialog-content'>
                {children}
            </div>
        </div>
    )
}

export default ModalDialog;