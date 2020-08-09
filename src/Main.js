// * 3a793ec - (HEAD -> master) initial (68 minutes ago) <Kostiantyn Palchyk>
const React = require('react');
const { Text, useInput, Box, Spacer } = require('ink');
const { useState } = require('react');
const { DateTime } = require('luxon');

function Main({ log }) {

  const [selectedIndex, setSelectedIndex] = useState(0);

  useInput((_, key) => {
    if (key.upArrow) {
      setSelectedIndex(x => Math.max(x - 1, 0))
    }

    else if (key.downArrow){
      setSelectedIndex(x => Math.min(x + 1, log.length - 1))
    }
  });

  return <Box flexDirection={"column"} height={40}>
    <Box flexGrow={1} flexDirection={"column"}>
      {
        log.map((entry, index) =>
          <Box key={entry.hash} >
            <Text dimColor={index !== selectedIndex}>
              {'* '}
              <Text color="red">{entry.hash.substring(0, 7)}</Text>
              {' '}
              <Text color="yellow">{entry.refs}</Text>
              {' '}
              <Text color="green">({DateTime.fromISO(entry.date).toRelative()})</Text>
              {' '}
              <Text>{entry.message}</Text>
              {' '}
              <Text color="blue">&lt;{entry.author_name}&gt;</Text>
            </Text>
          </Box>
        )
      }
    </Box>
    <Spacer />
    <Box><Text width="100%" inverse>git log</Text></Box>
  </Box>
}

module.exports = { Main };
