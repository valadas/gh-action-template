import * as core from '@actions/core';

const run = async(): Promise<void> => {
    const who = core.getInput('who-to-greet');
    console.log(`Hello ${who}`);
    core.setOutput('greeting', `Hello ${who}`);
}

run();

export default run;