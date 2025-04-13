import React from 'react';
import './ModalDialog.css';

const ModalDialog = ({ onClick, children }) => {
    return (
        <div className='modal-dialog' role='dialog'>
            <div className='dialog-header'>
                <button 
                    className='close-btn'
                    onClick={onClick}
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