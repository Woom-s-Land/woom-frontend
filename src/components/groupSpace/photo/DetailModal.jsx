import React from 'react';
import Modal from '../../common/Modal'

function DetailModal({ src, onClose }) {
  return (
    <div>
      <Modal onClose={onClose}>
        <button className="absolute top-3 left-5 w-6 h-6 bg-close-bt bg-cover" onClick={onClose} />
        <div className="flex justify-center items-center h-full">
          <img src={src} alt="selected" className="max-w-full max-h-full object-contain" />
        </div>
      </Modal>
    </div>
  );
}

export default DetailModal;
