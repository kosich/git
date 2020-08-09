// taken from https://github.com/vadimdemedes/ink/issues/263

const { useEffect, useMemo } = require('react');

const enterAltScreenCommand = '\x1b[?1049h';
const leaveAltScreenCommand = '\x1b[?1049l';

const exitFullScreen = () => {
  process.stdout.write(leaveAltScreenCommand);
};

const FullScreen = ({ children }) => {
  useEffect(() => {
    // destroy alternate screen on unmount
    return exitFullScreen;
  }, []);

  useMemo(() => process.stdout.write(enterAltScreenCommand), []);

  // trigger alternate screen
  return children;
};

module.exports = { FullScreen, exitFullScreen };
