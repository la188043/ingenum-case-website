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
    dueDate: new Date(),
    description: '',
    tableId: section.id ? section.id : '',
  };

  const formRef = useRef(null);

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

    const newTask = await taskService.addTask(formData);
    setTasks([...tasks, newTask]);

    resetForm();
  };

  const resetForm = () => {
    setFormData(initialFormValues);
    // const currentForm = formRef.current;
    // currentForm.reset(); // TODO handle this
  };

  return (
    <div className="section">
      <h2 className="heading-secondary u-center-text underline">
        {section.name}
      </h2>
      <div className="tasks-container u-mt-lg">
        <form className="form u-mb-md" onSubmit={handleAddTask} ref={formRef}>
          {/* TODO form security */}
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

        {tasks.map((task: Task) => (
          <>
            <div className="task">
              <p className="paragraph">{task.name}</p>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default Section;
