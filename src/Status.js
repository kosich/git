//@ts-check
const React = require('react');
const { Text, useInput, Box, Spacer } = require('ink');

// NOTE: currently this block is manually positioned to match graph * padding

function Status({ status }) {
  return <Box>
    <Text>
      {'  '}
      <Text color="red"  dimColor>#######</Text>
      {' '}
    </Text>
    <Text color="magenta">{status.files.length} file(s) pending</Text>
  </Box>
}

module.exports = { Status };
