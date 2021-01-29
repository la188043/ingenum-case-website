import { Section as SectionType } from '../models/Section.model';

interface Props {
  section: SectionType;
}

const Section = ({ section }: Props) => {
  return <p className="paragrapgh">{section.name}</p>;
};

export default Section;
