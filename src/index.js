'use strict';

const React = require('react');
const { Text, useInput, Box, useApp, Spacer } = require('ink');
const simpleGit = require('simple-git');
const { useState, useEffect } = require('react');
const { exitFullScreen, FullScreen } = require('./Fullscreen/Fullscreen');
const { default: Spinner } = require('ink-spinner');
const importJsx = require('import-jsx');
const { Main } = importJsx('./Main');

const git = simpleGit();

function getLog() {
  return git.log(['--remotes']);
}

const App = ({ }) => {
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
    getLog()
      .then(d => { setLog(d.all) })
      .then(() => git.fetch())
      .then(getLog)
      .then(
        data => { setLog(data.all) }
      );
  }, [])

  return <FullScreen>{
      !log
      ? <Text color="green"><Spinner /></Text>
      : <Main log={ log }/>
    }
  </FullScreen>
};

module.exports = App;
