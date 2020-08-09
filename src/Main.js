// * 3a793ec - (HEAD -> master) initial (68 minutes ago) <Kostiantyn Palchyk>
const React = require('react');
const { Text, useInput, Box, Spacer, measureElement } = require('ink');
const { useState, useRef, useEffect, useMemo } = require('react');
const { DateTime } = require('luxon');
const { default: Spinner } = require('ink-spinner');

function Main({ log }) {
  const sizes = { width: '100%', height: 40 };

  const [selectedIndex, setSelectedIndex] = useState(0);

  const cwd = useMemo(() => process.cwd(), []);

  useInput((_, key) => {
    if (key.upArrow) {
      setSelectedIndex(x => Math.max(x - 1, 0))
    }

    else if (key.downArrow){
      setSelectedIndex(x => Math.min(x + 1, log.length - 1))
    }
  });

  return <Box flexDirection={"column"} height={sizes.height} width={sizes.width}>
    <Box flexGrow={1} flexDirection={"column"} padding={1}>
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
    <Box
      borderStyle="single"
      borderColor="grey"
      justifyContent="space-between"
      paddingLeft={1}
      paddingRight={1}
    >
      <Text dimColor>Git Log</Text>
      <Box>
        <Text color="green">{ cwd }</Text>
      </Box>
      <Text>q=quit</Text>
    </Box>
  </Box>
}

module.exports = { Main };
