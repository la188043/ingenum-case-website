import React, { useEffect, useRef, useState } from 'react';
import useNotifications from '../../shared/hooks/useNotifications.hook';

import sectionService from '../services/section.service';
import taskService from '../services/task.service';

import { Section as SectionType } from '../models/Section.model';
import { AddSection } from '../models/AddSection.model';
import Task from '../models/Task.model';

import Loading from '../../shared/components/Loading';
import Section from './Section';
import Button from '../../shared/components/Button';
import NotificationContainer from '../../shared/components/NotificationContainer';

const ManageSections = () => {
  const [sections, setSections] = useState<SectionType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<AddSection>({ name: '' });

  const {
    addNotification,
    removeNotification,
    notifications,
  } = useNotifications();

  const formRef = useRef<HTMLFormElement>(null);

  const loadSections = async () => {
    setLoading(true);
    try {
      const response = await sectionService.getAll();
      setSections(response);
    } catch {
      addNotification(
        'error',
        "Une erreur s'est produite lors du chargement des données"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSections();
  }, []);

  const resetForm = () => formRef.current?.reset();

  const onTaskUpdated = async (taskId: string, newTask: Task) => {
    try {
      await taskService.updateTask(taskId, newTask);

      loadSections();
      addNotification(
        'success',
        'Mise à jour de la tâche effectuée avec succès'
      );
    } catch {
      addNotification(
        'error',
        "Une erreur s'est produite lors de la mise à jour de la tâche"
      );
    }
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

      resetForm();

      addNotification('success', 'Section correctement ajoutée');
    } catch {
      addNotification(
        'error',
        "Une erreur s'est produite lors de l'ajout de la section"
      );
    }
  };

  const handleMoveTask = async (taskId: string, currentSectionId: string) => {
    const nextSectionIndex =
      sections.findIndex(section => section.id === currentSectionId) + 1;

    if (nextSectionIndex < sections.length) {
      const nextSection: SectionType = sections[nextSectionIndex];
      const nextSectionId = nextSection.id;

      try {
        const response = await taskService.moveTask(taskId, {
          tableId: nextSectionId!,
        });

        loadSections();
        addNotification('success', 'Tâche déplacée avec succès');
      } catch {
        addNotification(
          'error',
          "Une erreur s'est produite lors du déplacement de la tâche"
        );
      }
    } else {
      addNotification('warning', 'Il est impossible de déplacer cette tâche');
    }
  };

  return (
    <Loading loading={loading}>
      <NotificationContainer
        removeNotif={removeNotification}
        notif={notifications}
      />

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
