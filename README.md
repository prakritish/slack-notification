# slack-notification
## Use Slack App to send notification to any channel
This Github Action does not rely on Slack Webhooks and uses **Bot User OAuth Token** of installed Slack App.

## Bot Token Scopes
The Bot Token should have the following scopes:
- chat:write - With this scope the Bot will be able to send message to the channels it's subscribed to.
- chat:write.customize - With this scope the Bot will be able to send message to the channels it's subscribed to with a customized username and avatar
- chat:write.public - With this scope the Bot will be able to send message to any channel

## Usage
```
- uses: prakritish/slack-notification@v2
  with:
    # Slack App's Bot User OAuth Token
    # This is a required field
    slack_token: ''

    # The channel id (e.g., C5BCPQFUL) or channel name (e.g., #build)
    # This is a required field
    channel: ''

    # User Name to Display on the Slack Message
    # Defaults to the App Name
    username: ''

    # The message to be sent to the given slack channel
    # This is a required field
    message: ''

    # If provided the value should be either PASS, success, FAIL or failure
    # If this is provided and it's either PASS or success, the message will have a Green Line
    # If this is provided and it's either FAIL or failure, the message will have a Red Line
    result: ''

    # Text Fields to be added to the slack message. See example.
    fields: ''

 ```
example:
```
    - name: Send Slack Message
        uses: prakritish/slack-notification@v2
        with:
            slack_token: ${{ secrets.SLACK_TOKEN }}
            channel: 'C5BCPQFUL'
            result: ${{ needs.build.result }}
            message: "Build Result for Pull Request ${{ github.event.pull_request.html_url }}"
            fields: |
                Job URL:${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}
                Build Result: ${{ needs.build.result }}
                Head (Source) Branch: ${{ github.head_ref }}
                Base (Target) Branch: ${{ github.base_ref }}

```
