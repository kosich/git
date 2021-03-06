// @ts-check
const React = require('react');
const { Text, useInput, Box, Spacer } = require('ink');
const { useState, useMemo, useEffect } = require('react');
const { DateTime } = require('luxon');
const importJsx = require('import-jsx');
const { Sidebar } = importJsx('./Sidebar');
const { Status } = importJsx('./Status');
const { Heatmap } = importJsx('./Heatmap/Heatmap');
const { CommitLine } = importJsx('./CommitLine');

function Main({ log, status }) {
  const [{ rows, columns }, setSizes] = useState(readStdoutSizes());

  useEffect(() => {
    process.stdout.on('resize', () => {
      setSizes(readStdoutSizes());
    });
  }, []);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const cwd = useMemo(() => process.cwd(), []);

  const commits = useMemo(() => log.slice(0, Math.max(0, rows - 5)), [log, rows]);

  useInput((_, key) => {
    if (key.upArrow) {
      setSelectedIndex(x => Math.max(x - 1, 0))
    }

    else if (key.downArrow){
      setSelectedIndex(x => Math.min(x + 1, commits.length - 1))
    }
  });

  // * 3a793ec - (HEAD -> master) initial (68 minutes ago) <Kostiantyn Palchyk>

  return <Box flexDirection="column" height={rows || '100%'} width={columns || '100%'}>
    <Box flexGrow={1}>
      <Box flexGrow={1} flexDirection="column" padding={1}>

        {
          status.isClean()
          ? null
          : <Status status={status} />
        }

        {
          commits.map((entry, index) =>
            <CommitLine entry={entry} isSelected={index !== selectedIndex} />
          )
        }
      </Box>
      <Box width="25%" minWidth={36} flexDirection="column" paddingTop={1} paddingBottom={1}>
        <Heatmap commits={log} />

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

function readStdoutSizes() {
  return {
    columns: process.stdout.columns || 0,
    rows: process.stdout.rows || 0
  }
}

module.exports = { Main };
