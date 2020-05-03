(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('os'), require('path')) :
    typeof define === 'function' && define.amd ? define(['os', 'path'], factory) :
    (global = global || self, global.index = factory(global.os, global.path));
}(this, (function (os, path) { 'use strict';

    os = os && Object.prototype.hasOwnProperty.call(os, 'default') ? os['default'] : os;
    path = path && Object.prototype.hasOwnProperty.call(path, 'default') ? path['default'] : path;

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function unwrapExports (x) {
    	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
    }

    function createCommonjsModule(fn, module) {
    	return module = { exports: {} }, fn(module, module.exports), module.exports;
    }

    var command = createCommonjsModule(function (module, exports) {
    var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result["default"] = mod;
        return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    const os$1 = __importStar(os);
    /**
     * Commands
     *
     * Command Format:
     *   ::name key=value,key=value::message
     *
     * Examples:
     *   ::warning::This is the message
     *   ::set-env name=MY_VAR::some value
     */
    function issueCommand(command, properties, message) {
        const cmd = new Command(command, properties, message);
        process.stdout.write(cmd.toString() + os$1.EOL);
    }
    exports.issueCommand = issueCommand;
    function issue(name, message = '') {
        issueCommand(name, {}, message);
    }
    exports.issue = issue;
    const CMD_STRING = '::';
    class Command {
        constructor(command, properties, message) {
            if (!command) {
                command = 'missing.command';
            }
            this.command = command;
            this.properties = properties;
            this.message = message;
        }
        toString() {
            let cmdStr = CMD_STRING + this.command;
            if (this.properties && Object.keys(this.properties).length > 0) {
                cmdStr += ' ';
                let first = true;
                for (const key in this.properties) {
                    if (this.properties.hasOwnProperty(key)) {
                        const val = this.properties[key];
                        if (val) {
                            if (first) {
                                first = false;
                            }
                            else {
                                cmdStr += ',';
                            }
                            cmdStr += `${key}=${escapeProperty(val)}`;
                        }
                    }
                }
            }
            cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
            return cmdStr;
        }
    }
    /**
     * Sanitizes an input into a string so it can be passed into issueCommand safely
     * @param input input to sanitize into a string
     */
    function toCommandValue(input) {
        if (input === null || input === undefined) {
            return '';
        }
        else if (typeof input === 'string' || input instanceof String) {
            return input;
        }
        return JSON.stringify(input);
    }
    exports.toCommandValue = toCommandValue;
    function escapeData(s) {
        return toCommandValue(s)
            .replace(/%/g, '%25')
            .replace(/\r/g, '%0D')
            .replace(/\n/g, '%0A');
    }
    function escapeProperty(s) {
        return toCommandValue(s)
            .replace(/%/g, '%25')
            .replace(/\r/g, '%0D')
            .replace(/\n/g, '%0A')
            .replace(/:/g, '%3A')
            .replace(/,/g, '%2C');
    }

    });

    unwrapExports(command);
    var command_1 = command.issueCommand;
    var command_2 = command.issue;
    var command_3 = command.toCommandValue;

    var core = createCommonjsModule(function (module, exports) {
    var __awaiter = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result["default"] = mod;
        return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });

    const os$1 = __importStar(os);
    const path$1 = __importStar(path);
    /**
     * The code to exit an action
     */
    var ExitCode;
    (function (ExitCode) {
        /**
         * A code indicating that the action was successful
         */
        ExitCode[ExitCode["Success"] = 0] = "Success";
        /**
         * A code indicating that the action was a failure
         */
        ExitCode[ExitCode["Failure"] = 1] = "Failure";
    })(ExitCode = exports.ExitCode || (exports.ExitCode = {}));
    //-----------------------------------------------------------------------
    // Variables
    //-----------------------------------------------------------------------
    /**
     * Sets env variable for this action and future actions in the job
     * @param name the name of the variable to set
     * @param val the value of the variable. Non-string values will be converted to a string via JSON.stringify
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function exportVariable(name, val) {
        const convertedVal = command.toCommandValue(val);
        process.env[name] = convertedVal;
        command.issueCommand('set-env', { name }, convertedVal);
    }
    exports.exportVariable = exportVariable;
    /**
     * Registers a secret which will get masked from logs
     * @param secret value of the secret
     */
    function setSecret(secret) {
        command.issueCommand('add-mask', {}, secret);
    }
    exports.setSecret = setSecret;
    /**
     * Prepends inputPath to the PATH (for this action and future actions)
     * @param inputPath
     */
    function addPath(inputPath) {
        command.issueCommand('add-path', {}, inputPath);
        process.env['PATH'] = `${inputPath}${path$1.delimiter}${process.env['PATH']}`;
    }
    exports.addPath = addPath;
    /**
     * Gets the value of an input.  The value is also trimmed.
     *
     * @param     name     name of the input to get
     * @param     options  optional. See InputOptions.
     * @returns   string
     */
    function getInput(name, options) {
        const val = process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] || '';
        if (options && options.required && !val) {
            throw new Error(`Input required and not supplied: ${name}`);
        }
        return val.trim();
    }
    exports.getInput = getInput;
    /**
     * Sets the value of an output.
     *
     * @param     name     name of the output to set
     * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function setOutput(name, value) {
        command.issueCommand('set-output', { name }, value);
    }
    exports.setOutput = setOutput;
    /**
     * Enables or disables the echoing of commands into stdout for the rest of the step.
     * Echoing is disabled by default if ACTIONS_STEP_DEBUG is not set.
     *
     */
    function setCommandEcho(enabled) {
        command.issue('echo', enabled ? 'on' : 'off');
    }
    exports.setCommandEcho = setCommandEcho;
    //-----------------------------------------------------------------------
    // Results
    //-----------------------------------------------------------------------
    /**
     * Sets the action status to failed.
     * When the action exits it will be with an exit code of 1
     * @param message add error issue message
     */
    function setFailed(message) {
        process.exitCode = ExitCode.Failure;
        error(message);
    }
    exports.setFailed = setFailed;
    //-----------------------------------------------------------------------
    // Logging Commands
    //-----------------------------------------------------------------------
    /**
     * Gets whether Actions Step Debug is on or not
     */
    function isDebug() {
        return process.env['RUNNER_DEBUG'] === '1';
    }
    exports.isDebug = isDebug;
    /**
     * Writes debug message to user log
     * @param message debug message
     */
    function debug(message) {
        command.issueCommand('debug', {}, message);
    }
    exports.debug = debug;
    /**
     * Adds an error issue
     * @param message error issue message. Errors will be converted to string via toString()
     */
    function error(message) {
        command.issue('error', message instanceof Error ? message.toString() : message);
    }
    exports.error = error;
    /**
     * Adds an warning issue
     * @param message warning issue message. Errors will be converted to string via toString()
     */
    function warning(message) {
        command.issue('warning', message instanceof Error ? message.toString() : message);
    }
    exports.warning = warning;
    /**
     * Writes info to log with console.log.
     * @param message info message
     */
    function info(message) {
        process.stdout.write(message + os$1.EOL);
    }
    exports.info = info;
    /**
     * Begin an output group.
     *
     * Output until the next `groupEnd` will be foldable in this group
     *
     * @param name The name of the output group
     */
    function startGroup(name) {
        command.issue('group', name);
    }
    exports.startGroup = startGroup;
    /**
     * End an output group.
     */
    function endGroup() {
        command.issue('endgroup');
    }
    exports.endGroup = endGroup;
    /**
     * Wrap an asynchronous function call in a group.
     *
     * Returns the same type as the function itself.
     *
     * @param name The name of the group
     * @param fn The function to wrap in the group
     */
    function group(name, fn) {
        return __awaiter(this, void 0, void 0, function* () {
            startGroup(name);
            let result;
            try {
                result = yield fn();
            }
            finally {
                endGroup();
            }
            return result;
        });
    }
    exports.group = group;
    //-----------------------------------------------------------------------
    // Wrapper action state
    //-----------------------------------------------------------------------
    /**
     * Saves state for current action, the state can only be retrieved by this action's post job execution.
     *
     * @param     name     name of the state to store
     * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function saveState(name, value) {
        command.issueCommand('save-state', { name }, value);
    }
    exports.saveState = saveState;
    /**
     * Gets the value of an state set by this action's main execution.
     *
     * @param     name     name of the state to get
     * @returns   string
     */
    function getState(name) {
        return process.env[`STATE_${name}`] || '';
    }
    exports.getState = getState;

    });

    unwrapExports(core);
    var core_1 = core.ExitCode;
    var core_2 = core.exportVariable;
    var core_3 = core.setSecret;
    var core_4 = core.addPath;
    var core_5 = core.getInput;
    var core_6 = core.setOutput;
    var core_7 = core.setCommandEcho;
    var core_8 = core.setFailed;
    var core_9 = core.isDebug;
    var core_10 = core.debug;
    var core_11 = core.error;
    var core_12 = core.warning;
    var core_13 = core.info;
    var core_14 = core.startGroup;
    var core_15 = core.endGroup;
    var core_16 = core.group;
    var core_17 = core.saveState;
    var core_18 = core.getState;

    const run = () => __awaiter(void 0, void 0, void 0, function* () {
        const who = core_5('who-to-greet');
        console.log(`Hello ${who}`);
        core_6('greeting', `Hello ${who}`);
    });
    run();

    return run;

})));
//# sourceMappingURL=index.js.map
