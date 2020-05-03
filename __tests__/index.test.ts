import * as core from '@actions/core';
import run from '../index';

beforeEach(() => {
    jest.resetModules();
    process.env['INPUT_WHO-TO-GREET'] = "World"; // Default input
})

afterEach(() => {
    delete process.env['INPUT_WHO-TO-GREET'];
})

test('Without input', () => {
    const noInputMock = jest.spyOn(core, 'setOutput');
    run();
    expect(noInputMock).toHaveBeenCalledWith('greeting', 'Hello World');
});

test('With input', () => {
    process.env['INPUT_WHO-TO-GREET'] = "You";
    const inputMock = jest.spyOn(core, 'setOutput');
    run();
    expect(inputMock).toHaveBeenCalledWith('greeting', 'Hello You');
});