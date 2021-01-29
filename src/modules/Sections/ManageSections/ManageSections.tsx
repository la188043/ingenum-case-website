import React, { useEffect, useState } from 'react';

import sectionService from '../services/section.service';

import { Section } from '../models/Section.model';
import { Task } from '../models/Task.model';

import Loading from '../../shared/components/Loading';

const ManageSections = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const loadSections = async () => {
    setLoading(true);
    const response = await sectionService.getAll();
    setSections(response);
    setLoading(false);
  };

  useEffect(() => {
    loadSections();
  }, []);

  return (
    <Loading loading={loading}>
      {sections.map((section: Section) => (
        <p key={section.id} className="paragraph">
          {section.name}
        </p>
      ))}
    </Loading>
  );
};

export default ManageSections;
