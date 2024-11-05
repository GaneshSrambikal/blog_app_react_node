import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';

const ConfettiWrapper = () => {
  const { width, height } = useWindowSize();
  return (
    <Confetti
      width={width}
      height={height}
      id='confetti-canvas'
    />
  );
};
export default ConfettiWrapper;
