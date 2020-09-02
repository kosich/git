// @ts-check
const React = require('react');
const { Text, Box } = require('ink');
const { useMemo } = require('react');
const { DateTime } = require('luxon');

function CommitLine({ entry, isSelected }) {
  const hash = useMemo(() => entry.hash.substring(0, 7), [entry.hash]);
  const date = useMemo(() => DateTime.fromISO(entry.date).toRelative(), [entry.date]);

  return <Box key={entry.hash} >
    <Text dimColor={isSelected}>
      {'* '}
      <Text color="red">{hash}</Text>
      {' '}
      {entry.refs
      ? <Text color="yellow">{ entry.refs } </Text>
      : null
      }
      <Text>{entry.message}</Text>
      {' '}
      <Text color="green">({date})</Text>
      {' '}
      <Text color="blue">&lt;{entry.author_name}&gt;</Text>
    </Text>
  </Box>
}

module.exports = { CommitLine };
