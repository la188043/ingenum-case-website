import React, { useEffect, useRef, useState } from 'react';

import taskService from '../services/task.service';

import { Section as SectionType } from '../models/Section.model';
import { Task } from '../models/Task.model';
import { AddTask } from '../models/AddTask.model';

import Button from '../../shared/components/Button';

interface Props {
  section: SectionType;
}

const Section = ({ section }: Props) => {
  const initialFormValues: AddTask = {
    name: '',
    description: '',
    tableId: section.id ? section.id : '',
  };

  const formRef = useRef<HTMLFormElement>(null);

  const [tasks, setTasks] = useState<Task[]>(section.tasks);
  const [formData, setFormData] = useState<AddTask>(initialFormValues);
  const [isFormValid, setFormValid] = useState<boolean>(false);

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
    } catch {
      return;
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData(initialFormValues);

    formRef.current?.reset();
  };

  const handleDeleteTask = async (taskIndex: number, taskId: string) => {
    if (!taskId) return;

    try {
      if (await taskService.deleteTask(taskId)) {
        setTasks([...tasks.filter(task => task.id !== taskId)]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="section">
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

        {tasks.map((task: Task, index: number) => (
          <div className="task" key={task.id}>
            <p className="paragraph">{task.name}</p>
            <div className="buttons">
              <Button
                type="button"
                iconName="fa-trash-alt"
                className="btn--danger"
                onClick={() => handleDeleteTask(index, task.id || '')}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Section;
