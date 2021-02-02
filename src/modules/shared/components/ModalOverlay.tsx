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
  title: string;
  onClose: () => void;
}

const InnerModal = ({ title, onClose, children }: PropsWithChildren<Props>) => {
  Modal.setAppElement('#modal');

  return (
    <Modal isOpen={true} style={placementStyle} contentLabel="Overlay Modal">
      <h1>{title}</h1>
      {children}
      <button onClick={onClose}>Fermer</button>
    </Modal>
  );
};

const ModalOverlay = (props: PropsWithChildren<Props>) => (
  <InnerModal title={props.title} onClose={props.onClose}>
    {props.children}
  </InnerModal>
);

export default ModalOverlay;
