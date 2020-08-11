// @ts-check
const React = require('react');
const { Text, Box } = require('ink');
const { useMemo } = require('react');
const { DateTime } = require('luxon');


function Heatmap(props){
  const { commits } = props;

  // this is crazy slow code
  // TODO: refactor
  const data = useMemo(() => {
    const now = DateTime.fromMillis(Date.now());

    const months = [2, 1, 0].map(offset => {
      const date = now.minus({ months: offset }).startOf('month');

      return {
        date,
        key: date.monthShort,
        commits: new Array(date.daysInMonth).fill(0),
        entries: []
      }
    });

    commits.forEach(c => {
      const date = DateTime.fromISO(c.date);
      months.forEach(m => {
        if (m.date.hasSame(date, 'month')) {
          m.commits[date.day - 1] += 1;
        }
      })
    });

    const min = Math.min(...months.map(m => Math.min(...m.commits)));
    const max = Math.max(...months.map(m => Math.max(...m.commits)));
    const diff = max - min;

    months.forEach(m => {
      m.entries = m.commits.map(x => x ? Math.ceil((x - min) / diff * 3) : x)
    })

    return months;
  }, [commits])

  return <Box flexDirection="column">
    {
      data.map(month =>{
        const { key, entries } = month;

        return <Box key={key}>
          <Text dimColor>{key + '  '}</Text>
          {
            entries.map((entry, index) =>
              <HeatmapEntry
                key={entry + '-' + index}
                heat={entry}
                />
            )
          }
        </Box>
      })
    }
  </Box>
}

function HeatmapEntry(props){
  const { heat } = props;
  const SYMBOL = '▓';

  return {
    0: <Text>{' '}</Text>,
    1: <Text color="green" dimColor>{SYMBOL}</Text>,
    2: <Text color="green">{SYMBOL}</Text>,
    3: <Text color="greenBright">{SYMBOL}</Text>
  }[
    // limited value
    Math.min(3, Math.max(0, heat))
  ];
}


module.exports = { Heatmap };
