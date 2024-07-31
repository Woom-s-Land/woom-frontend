import React from 'react';
import Modal from '../../common/Modal'

function DetailModal({ src }) {
  return (
    <div>
      <Modal>
        <div className="flex justify-center items-center h-full">
          <img src={src} alt="selected" className="max-w-full max-h-full object-contain" />
        </div>
      </Modal>
    </div>
  );
}

export default DetailModal;
