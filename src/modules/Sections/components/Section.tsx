import { Section as SectionType } from '../models/Section.model';
interface Props {
  section: SectionType;
}

const Section = ({ section }: Props) => {
  return (
    <div className="section">
      <h2 className="heading-secondary underline">{section.name}</h2>
    </div>
  );
};

export default Section;
