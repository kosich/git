//@ts-check
const React = require('react');
const { Text, useInput, Box, Spacer } = require('ink');

function Sidebar({ commit }) {
  if (!commit || !commit.diff || !commit.diff.files) {
    return null;
  }

  const files = commit.diff.files;

  return <Box flexDirection="column" padding={1}>
    <Box>
      <Text>{ commit.hash }</Text>
    </Box>

    <Box padding={1} flexDirection="column">
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
