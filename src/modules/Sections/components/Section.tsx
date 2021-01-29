import React, { useState } from 'react';

import { Section as SectionType } from '../models/Section.model';
import { Task } from '../models/Task.model';

interface Props {
  section: SectionType;
}

const Section = ({ section }: Props) => {
  const tasks: Task[] = section.tasks;

  return (
    <div className="section">
      <h2 className="heading-secondary u-center-text underline">
        {section.name}
      </h2>
      <div className="tasks-container u-mt-lg">
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
