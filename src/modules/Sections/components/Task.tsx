import { Task as TaskType } from '../models/Task.model';
import { useState } from 'react';

import Button from '../../shared/components/Button';
import OverlayModal from '../../shared/components/ModalOverlay';

interface Props {
  task: TaskType;
  index: number;
  onMoveClick: () => void;
  handleDeleteTask: (index: number, taskId: string) => void;
}

const Task = ({ task, index, onMoveClick, handleDeleteTask }: Props) => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const onOpenModal = () => setModalOpen(true);
  const onCloseModal = () => setModalOpen(false);

  return (
    <>
      {isModalOpen && (
        <OverlayModal onClose={onCloseModal}>
          <h2 className="heading-secondary u-mb-md">Modifier une tâche</h2>
          <p className="paragraph">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
            ullam, fuga cum consectetur ea nihil perferendis quasi optio
            pariatur quod!
          </p>
        </OverlayModal>
      )}
      <div className="task" key={task.id}>
        <div className="task__details">
          <p className="task__name paragraph">{task.name}</p>
          <p className="task__description u-mt-sm paragraph">
            {task.description}
          </p>
        </div>
        <div className="task__buttons">
          <Button
            type="button"
            iconName="fa-edit"
            className="btn--info btn--icon"
            onClick={onOpenModal}
          />

          <Button
            type="button"
            iconName="fa-arrow-right"
            className="btn--white btn--icon"
            onClick={onMoveClick}
          />

          <Button
            type="button"
            iconName="fa-trash-alt"
            className="btn--danger btn--icon"
            onClick={() => handleDeleteTask(index, task.id!)}
          />
        </div>
      </div>
    </>
  );
};

export default Task;
