//@ts-check
const React = require('react');
const { Text, Box, Newline } = require('ink');
const { DateTime } = require('luxon');

function Sidebar({ commit }) {
  if (!commit || !commit.diff || !commit.diff.files) {
    return null;
  }

  const files = commit.diff.files;

  return <Box flexDirection="column" padding={1}>
    <Box>
      <Text color="gray" dimColor>{commit.hash}</Text>
    </Box>

    <Box>
      <Text color="green" dimColor>{DateTime.fromISO(commit.date).toRFC2822()}</Text>
    </Box>

    <Box>
      <Text>{commit.message}</Text>
    </Box>

    {commit.body
      ? <Box paddingTop={1}><Text>{commit.body}</Text></Box>
    : null
    }

    <Box paddingTop={1} paddingBottom={1} flexDirection="column">
    {
      files.map(file => {
        return <Box key={file.file}>
          <Text color="grey">+- {file.file}</Text>
        </Box>
      })
    }
    </Box>
  </Box>
}

module.exports = { Sidebar };
