import React, { useEffect, useState } from "react";
import { Typography, Button, Switch, TextArea } from '@douyinfe/semi-ui';

export function InputContent({ loading, onClickGenerateTweets }) {
  const { Title, Text, Paragraph } = Typography;
  const [includeRewrites, setIncludeRewrites] = useState(false);

  return (
    <div>
      <Title>Enter your article or content</Title>
      <Paragraph>Each paragraph in the content will generate multiple tweets</Paragraph>
      <TextArea id="content" disabled={loading} />
      <Switch checked={includeRewrites} onChange={setIncludeRewrites} disabled={loading} />
      <Text>{includeRewrites ? "Include Rewrites of Each Tweet" : "Do Not Include Rewrites of Each Tweet"}</Text>
      <div>
        <Button loading={loading} onClick={onClickGenerateTweets}>
          Generate Tweets!
        </Button>
      </div>
    </div>
  );
}
