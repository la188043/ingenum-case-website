import React, { useEffect, useRef, useState } from 'react';
import useNotifications from '../../shared/hooks/useNotifications.hook';

import taskService from '../services/task.service';

import Button from '../../shared/components/Button';
import NotificationContainer from '../../shared/components/NotificationContainer';
import Task from '../components/Task';

import { AddTask } from '../models/AddTask.model';
import { Section as SectionType } from '../models/Section.model';
import { Task as TaskType } from '../models/Task.model';

interface Props {
  section: SectionType;
  onMoveClick: (taskId: string, sectionId: string) => void;
  onTaskUpdated: (taskId: string, newTask: TaskType) => void;
}

const Section = ({ section, onMoveClick, onTaskUpdated }: Props) => {
  const initialFormValues: AddTask = {
    name: '',
    description: '',
    tableId: section.id ? section.id : '',
  };

  const formRef = useRef<HTMLFormElement>(null);

  const [tasks, setTasks] = useState<TaskType[]>(section.tasks);
  const [formData, setFormData] = useState<AddTask>(initialFormValues);
  const [isFormValid, setFormValid] = useState<boolean>(false);

  const {
    addNotification,
    removeNotification,
    notifications,
  } = useNotifications();

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleAddTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const newTask = await taskService.addTask(formData);
      setTasks([...tasks, newTask]);

      resetForm();
      addNotification('success', 'Nouvelle tâche ajoutée avec succès');
    } catch {
      addNotification(
        'error',
        "Une erreur est survenue lors de l'ajout d'une tâche"
      );
    }
  };

  const resetForm = () => {
    setFormData(initialFormValues);

    formRef.current?.reset();
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!taskId) {
      addNotification(
        'error',
        "Une erreur s'est produite lors de la suppression"
      );

      return;
    }

    try {
      const response = await taskService.deleteTask(taskId);
      if (response) {
        setTasks([...tasks.filter(task => task.id !== taskId)]);
        addNotification('info', 'Tâche correctement supprimée');
      }
    } catch (err) {
      addNotification(
        'error',
        'Une erreur est survenue lors de la suppression'
      );
    }
  };

  return (
    <div className="section">
      <NotificationContainer
        removeNotif={removeNotification}
        notif={notifications}
      />

      <h2 className="heading-secondary u-center-text underline">
        {section.name}
      </h2>
      <div className="tasks-container u-mt-lg">
        <form className="form u-mb-md" onSubmit={handleAddTask} ref={formRef}>
          <h3 className="heading-tertiary">Ajouter une tâche</h3>
          <input
            className="form__input"
            type="text"
            name="name"
            placeholder="Name"
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
            onChange={handleChange}
          />

          <Button
            type="submit"
            className="btn--secondary"
            value="Ajouter"
            disabled={!isFormValid}
          />
        </form>

        {tasks.map((task: TaskType, index: number) => (
          <Task
            key={task.id}
            task={task}
            index={index}
            onMoveClick={() => onMoveClick(task.id!, section.id!)}
            handleDeleteTask={handleDeleteTask}
            onTaskUpdated={onTaskUpdated}
          ></Task>
        ))}
      </div>
    </div>
  );
};

export default Section;
