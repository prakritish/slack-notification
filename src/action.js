const core = require('@actions/core');
const { WebClient } = require('@slack/web-api');

const pass = 'PASS';
const fail = 'FAIL';
const success = 'success';
const failure = 'failure';
const pass_color = '#009933';
const fail_color = '#e63900';

let data = {}; // Will hold the message payload

async function run() {
    try {
        const slackToken = core.getInput('slack_token');
        const channel = core.getInput('channel');
        const message = core.getInput('message');
        const result = core.getInput('result');
        const fields = core.getInput('fields');

        const slack = new WebClient(slackToken);

        let color;
        if (result.localeCompare(pass, 'en', { sensitivity: 'base' }) === 0 ||
            result.localeCompare(success, 'en', { sensitivity: 'base' }) === 0) {
            color = pass_color;
        } else if (result.localeCompare(fail, 'en', { sensitivity: 'base' }) === 0 ||
                   result.localeCompare(failure, 'en', { sensitivity: 'base' }) === 0) {
            color = fail_color;
        }

        let username = core.getInput('username') || "Github Action";

        const fieldList = fields.split(/\r?\n/).filter(Boolean);

        if (fieldList.length) {
            const blocks = [
                {
                    type: "section",
                    text: {
                        type: "mrkdwn",
                        text: message
                    }
                },
                {
                    type: "section",
                    fields: fieldList.map(formatField)
                }
            ];

            data = {
                channel,
                username,
                attachments: [
                    {
                        color,
                        blocks
                    }
                ]
            };
        } else {
            data = {
                channel,
                username,
                blocks: [
                    {
                        type: "section",
                        text: {
                            type: "mrkdwn",
                            text: message
                        }
                    }
                ]
            };
        }
        console.log("Posting message to Slack:", JSON.stringify(data, null, 2));
        const response = await slack.chat.postMessage(data);

        if (!response.ok) {
            core.setFailed(`Slack API error: ${response.error}`);
        } else {
            console.log("Slack message posted successfully.");
        }
    } catch (error) {
        core.setFailed(error.message);
    }
}

function formatField(line) {
    const field = line.split(/:(.*)/).filter(Boolean);
    return {
        type: "mrkdwn",
        text: `*${field[0]}*\n${field[1] || ''}`
    };
}

run();

