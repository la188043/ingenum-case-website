import React, { useEffect, useRef, useState } from 'react';
import Button from '../../shared/components/Button';
import Task from '../models/Task.model';

interface Props {
  action: 'add' | 'update';
  task: Task;
  onSubmit: (event: React.FormEvent<HTMLFormElement>, newTask: Task) => void;
}

const TaskForm = ({ action, task, onSubmit }: Props) => {
  const [formData, setFormData] = useState<Task>(task);
  const [isFormValid, setFormValid] = useState<boolean>(false);

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const nameValidation: RegExp = /.{4,}/g;
    const descriptionValidation: RegExp = /.{9,}/g;

    if (
      nameValidation.test(formData.name) &&
      descriptionValidation.test(formData.description)
    ) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [formData]);

  const resetForm = () => formRef.current?.reset();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setFormData({
      ...formData,
      [fieldName]: fieldValue,
    });
  };

  return (
    <form
      ref={formRef}
      className="form u-mb-md"
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => onSubmit(e, formData)}
    >
      <h3 className="heading-tertiary">
        {action === 'add' ? 'Ajouter une tâche' : 'Modifier une tâche'}
      </h3>
      <input
        className="form__input"
        type="text"
        name="name"
        placeholder="Nom de la tâche"
        value={formData.name}
        onChange={handleChange}
      />

      <input
        className="form__input"
        type="datetime-local"
        name="dueDate"
        onChange={handleChange}
      />

      <input
        className="form__input"
        type="text"
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />

      <Button
        type="submit"
        className="btn--secondary"
        value={action === 'add' ? 'Ajouter' : 'Modifier'}
        disabled={!isFormValid}
      />
    </form>
  );
};

export default TaskForm;
