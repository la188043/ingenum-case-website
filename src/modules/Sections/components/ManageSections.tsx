import React, { useEffect, useState } from 'react';

import sectionService from '../services/section.service';

import { Section as SectionType } from '../models/Section.model';

import Loading from '../../shared/components/Loading';
import Section from './Section';

const ManageSections = () => {
  const [sections, setSections] = useState<SectionType[]>([]);
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
      <div className="sections-container">
        {sections.map((section: SectionType) => (
          <Section key={section.id} section={section} />
        ))}
      </div>
    </Loading>
  );
};

export default ManageSections;
