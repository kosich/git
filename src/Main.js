// @ts-check
const React = require('react');
const { Text, useInput, Box, Spacer } = require('ink');
const { useState, useMemo } = require('react');
const { DateTime } = require('luxon');
const importJsx = require('import-jsx');
const { Sidebar } = importJsx('./Sidebar');
const { Status } = importJsx('./Status');

function Main({ log, status }) {
  const width = process.stdout.columns || '100%'
  const height = process.stdout.rows || '100%';

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

  // * 3a793ec - (HEAD -> master) initial (68 minutes ago) <Kostiantyn Palchyk>

  return <Box flexDirection={"column"} height={height} width={width}>
    <Box flexGrow={1}>
      <Box flexGrow={1} flexDirection={"column"} padding={1}>

        {
          status.isClean()
          ? null
          : <Status status={status} />
        }

        {
          log.map((entry, index) =>
            <Box key={entry.hash} >
              <Text dimColor={index !== selectedIndex}>
                {'* '}
                <Text color="red">{entry.hash.substring(0, 7)}</Text>
                {' '}
                {entry.refs
                ? <Text color="yellow">{ entry.refs } </Text>
                : null
                }
                <Text>{entry.message}</Text>
                {' '}
                <Text color="green">({DateTime.fromISO(entry.date).toRelative()})</Text>
                {' '}
                <Text color="blue">&lt;{entry.author_name}&gt;</Text>
              </Text>
            </Box>
          )
        }
      </Box>
      <Box width="25%" minWidth={20}>
        <Sidebar commit={log && log[selectedIndex]} />
      </Box>
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
