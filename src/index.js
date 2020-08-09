'use strict';

const React = require('react');
const { Text, useInput, Box, useApp, Spacer } = require('ink');
const simpleGit = require('simple-git');
const { useState, useEffect } = require('react');
const { exitFullScreen, FullScreen } = require('./Fullscreen/Fullscreen');

const git = simpleGit();

const App = ({ }) => {
  const [log, setLog] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  console.log(log);

  const { exit } = useApp();

  useInput((input, key) => {
    if (key.upArrow) {
      setSelectedIndex(x => Math.max(x - 1, 0))
    }

    else if (key.downArrow){
      setSelectedIndex(x => x + 1)
    }

    else if (key.escape){
      exitFullScreen();
      exit();
    }
  })

  useEffect(() => {
    git.log().then(
      data => { setLog(data.all); console.log(data.all) },
      err => { throw err; }
     );
  }, [])

  // * 3a793ec - (HEAD -> master) initial (68 minutes ago) <Kostiantyn Palchyk>

  return <FullScreen>
    <Box flexDirection={"column"} height={40}>
    <Box flexGrow={1}>
      {
        log.map((entry, index) =>
          <Box key={entry.hash}>
            <Text dimColor={ index !== selectedIndex }>
              {'* '}
              <Text color="red">{ entry.hash.substring(0, 7) }</Text>
              {' '}
              <Text color="yellow">{ entry.refs }</Text>
              {' '}
              <Text color="green">({ entry.date })</Text>
              {' '}
              <Text>{ entry.message }</Text>
              {' '}
              <Text color="blue">&lt;{ entry.author_name }&gt;</Text>
            </Text>
          </Box>
        )
      }
    </Box>
    <Spacer />
    <Box><Text inverse>git log</Text></Box>
    </Box>
  </FullScreen>
};

module.exports = App;
