import React, { useState } from 'react';

import { Section as SectionType } from '../models/Section.model';
import { Task } from '../models/Task.model';

import Popup from '../../shared/components/Popup';
interface Props {
  section: SectionType;
}

const Section = ({ section }: Props) => {
  const tasks: Task[] = section.tasks;

  const [isPopupVisible, setPopupVisible] = useState<boolean>(true);

  return (
    <div className="section">
      <h2 className="heading-secondary u-center-text underline">
        {section.name}
      </h2>
      <div className="tasks-container u-mt-lg">
        {tasks.map((task: Task) => (
          <>
            {isPopupVisible && (
              <Popup>
                <></>
                {/* TODO Change: is being displayed due to map */}
              </Popup>
            )}
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
