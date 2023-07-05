import fetch from 'node-fetch';
import queries from '../queries.json' assert { type: 'json' };

(async () => {
  try {
    let responses = [];
    let frameworkResults = [];

    for (const index in queries) {
      responses[index] = fetch('http://127.0.0.1:1866?' + queries[index]);
    }

    for (const index in queries) {
      console.log(queries[index]);
      const response = await responses[index];

      const result = response.ok ? await response.json() : '"error"';

      frameworkResults[index] = {
        query: queries[index],
        result
      }
    }

    process.stdout.write(JSON.stringify(frameworkResults) + "\n");
  } catch (error) {
    console.error(error);
  }
})();

