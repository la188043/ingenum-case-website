import React, { useEffect, useRef, useState } from 'react';

import sectionService from '../services/section.service';

import { Section as SectionType } from '../models/Section.model';

import Loading from '../../shared/components/Loading';
import Section from './Section';
import { AddSection } from '../models/AddSection.model';
import Button from '../../shared/components/Button';
import taskService from '../services/task.service';
import Task from '../models/Task.model';

const ManageSections = () => {
  const [sections, setSections] = useState<SectionType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<AddSection>({ name: '' });

  const formRef = useRef<HTMLFormElement>(null);

  const loadSections = async () => {
    setLoading(true);
    const response = await sectionService.getAll();
    setSections(response);
    setLoading(false);
  };

  useEffect(() => {
    loadSections();
  }, []);

  const resetForm = () => formRef.current?.reset();

  const onTaskUpdated = async (taskId: string, newTask: Task) => {
    try {
      await taskService.updateTask(taskId, newTask);

      loadSections();
    } catch {}
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setFormData({
      ...formData,
      [fieldName]: fieldValue.trim(),
    });
  };

  const handleAddSection = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const newSection = await sectionService.addSection(formData);

      setSections([...sections, newSection]);
    } catch {
      return;
    }

    resetForm();
  };

  const handleMoveTask = async (taskId: string, currentSectionId: string) => {
    const nextSectionIndex =
      sections.findIndex(section => section.id === currentSectionId) + 1;

    if (nextSectionIndex < sections.length) {
      const nextSection: SectionType = sections[nextSectionIndex];
      const nextSectionId = nextSection.id;

      setLoading(true);
      await taskService.moveTask(taskId, { tableId: nextSectionId! });
      setLoading(false);

      loadSections();
    } else {
      return; // TODO Notification
    }
  };

  return (
    <Loading loading={loading}>
      <form className="form u-mb-md" onSubmit={handleAddSection} ref={formRef}>
        <h3 className="heading-tertiary">Ajouter une section</h3>
        <input
          className="form__input"
          type="text"
          name="name"
          placeholder="Entrez le nom de la nouvelle section"
          onChange={handleChange}
        />

        <Button type="submit" className="btn--primary" value="Ajouter" />
      </form>
      <div className="sections-container">
        {sections.map((section: SectionType) => (
          <Section
            key={section.id}
            section={section}
            onMoveClick={handleMoveTask}
            onTaskUpdated={onTaskUpdated}
          />
        ))}
      </div>
    </Loading>
  );
};

export default ManageSections;
