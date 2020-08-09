const React = require('react');
const { Text, useInput, Box, Spacer } = require('ink');
const { useState, useMemo } = require('react');
const { DateTime } = require('luxon');

function Main({ log, status }) {
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

  // * 3a793ec - (HEAD -> master) initial (68 minutes ago) <Kostiantyn Palchyk>

  return <Box flexDirection={"column"} height={sizes.height} width={sizes.width}>
    <Box flexGrow={1}>
      <Box flexGrow={1} flexDirection={"column"} padding={1}>

        <Box marginBottom={1} flexDirection={"column"}>{
          status.isClean()
          ? null
          : status.files.map(file =>
            <Box key={file.path}>
              <Text color="redBright">{file.path}</Text>
            </Box>
          )
        }</Box>

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
        <Text>{ log && JSON.stringify(log[selectedIndex].diff, null, '  ') }</Text>
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
