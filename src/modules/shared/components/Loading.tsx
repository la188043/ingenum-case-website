import { PropsWithChildren } from 'react';
import { ClipLoader } from 'react-spinners';

interface Props {
  loading: boolean;
}

const Loading = (props: PropsWithChildren<Props>): JSX.Element => {
  const { loading, children } = props;

  if (!loading) {
    return children as JSX.Element;
  }

  return (
    <div className="loader">
      <ClipLoader size={150} color="#9F0C11" loading={loading} />
    </div>
  );
};

export default Loading;
