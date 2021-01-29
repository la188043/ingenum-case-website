import React, { useState } from 'react';

import sectionService from '../services/section.service';
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

  const [tasks, setTasks] = useState<Task[]>(section.tasks);
  const [formData, setFormData] = useState<AddTask>(initialFormValues);

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
  };

  return (
    <div className="section">
      <h2 className="heading-secondary u-center-text underline">
        {section.name}
      </h2>
      <div className="tasks-container u-mt-lg">
        <form onSubmit={handleAddTask}>
          <input type="text" name="name" onChange={handleChange} />

          <input type="datetime-local" name="dueDate" onChange={handleChange} />

          <input type="text" name="description" onChange={handleChange} />

          <Button type="submit" value="Ajouter" />
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
