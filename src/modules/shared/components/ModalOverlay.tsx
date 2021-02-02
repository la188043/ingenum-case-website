import React, { PropsWithChildren, useState } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

const placementStyle = {
  content: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
};

interface Props {
  onClose: () => void;
}

const InnerModal = ({ onClose, children }: PropsWithChildren<Props>) => {
  Modal.setAppElement('#modal');

  return (
    <Modal isOpen={true} style={placementStyle} contentLabel="Overlay Modal">
      <div className="container">
        {children}
        <button className="btn btn--danger" onClick={onClose}>
          Fermer
        </button>
      </div>
    </Modal>
  );
};

const ModalOverlay = (props: PropsWithChildren<Props>) => (
  <InnerModal onClose={props.onClose}>{props.children}</InnerModal>
);

export default ModalOverlay;
