// @ts-check
const React = require('react');
const { Text, useInput, Box, useApp, Spacer } = require('ink');
const { default: simpleGit } = require('simple-git');
const { useState, useEffect } = require('react');
const { exitFullScreen, FullScreen } = require('./Fullscreen/Fullscreen');
const { default: Spinner } = require('ink-spinner');
const importJsx = require('import-jsx');
const { Main } = importJsx('./Main');

const git = simpleGit();

const App = ({ }) => {
  const [status, setStatus] = useState(void 0);
  const [log, setLog] = useState(void 0);

  const { exit } = useApp();

  useInput((input, key) => {
    // TODO: limit this only to main view
    if (key.escape || input == 'q'){
      exitFullScreen();
      exit();
    }
  })

  useEffect(() => {
    git.status().then(status => {
      const branches = [status.current];

      if (status.tracking) {
        branches.push(status.tracking);
      }

      git.log([ ...branches, '--stat' ]).then(d => { setLog(d.all) })

      setStatus(status);
    })
  }, [])

  return <FullScreen>{
    !log
    ? <Text color="green"><Spinner /></Text>
    : <Main log={log} status={status} />
  }</FullScreen>
};

module.exports = App;
