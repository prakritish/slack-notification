const core = require('@actions/core');
const github = require('@actions/github');
const request = require('request');

const pass = 'PASS';
const fail = 'FAIL';
const pass_color = '#009933';
const fail_color = '#e63900';
const url = 'https://slack.com/api/chat.postMessage';

async function run() {
    try {
        const slackToken = core.getInput('slack_token');
        const channel = core.getInput('channel');
        const message = core.getInput('message');
        const result = core.getInput('result');
        const fields = core.getInput('fields');
        if (result.localeCompare(pass, 'en', {sensitivity: 'base'}) === 0) {
            color = pass_color
        } else if (result.localeCompare(fail, 'en', {sensitivity: 'base'}) === 0) {
            color = fail_color
        }
        username = core.getInput('username');
        if (!username) {
            username = "Github Action";
        }
        data = {
            channel: channel,
            username: username,
            attachments: [
                {
                    blocks: [
                        {
                            type: "section",
                            text: {
                                type: "mrkdwn",
                                text: message
                            }
                        },
                        {
                            type: "section",
                            fields: []
                        }
                    ]
                }
            ]
        }
        if (result) {
            data['attachments'][0]['color'] = color
        }
        const fieldList = fields.split(/\r?\n/).filter(Boolean);
        if (fieldList.length) {
            fieldList.forEach(addFields);
        } else {
            data = {
                channel: channel,
                blocks: [
                    {
                        type: "section",
                        text: {
                            type: "mrkdwn",
                            text: message
                        }
                    }
                ]
            }
        }
        
        const options = {
            url: url,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            auth: {
                bearer: slackToken
            },
            json: data
        };
        request.post(options, function (error, response, body) {
            if (!error && response.statusCode === 200 && body.ok) {
                console.log("Success!");
            }
            else {
                console.log(JSON.stringify(data, null, 2));
                console.log("Failed!");
                console.log("error: " + error);
                console.log("response.statusCode: " + response.statusCode);
                console.log("response.statusText: " + response.statusText);
                return core.setFailed(error);
            }
        });
    } catch (error) {
        core.setFailed(error.message);
    }
}

async function addFields(line) {
    const field = line.split(/:(.*)/).filter(Boolean)
    const fieldValue = {
        type: "mrkdwn",
        text: "*" + field[0] + "*\n" + field[1]
    }
    data['attachments'][0]['blocks'][1]['fields'].push(fieldValue)
}

run()
