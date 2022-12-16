import React, { useEffect, useState } from "react";
import { Typography, Button, Switch, TextArea } from '@douyinfe/semi-ui';

export function InputContent({ loading, onClickGenerateTweets }) {
  const { Title, Text, Paragraph } = Typography;
  const [prompt, setPrompt] = useState("Example content");
  const [includeRewrites, setIncludeRewrites] = useState(false);

  const onTextAreaChange = (value, e) => {
    setPrompt(value);
  };
  const onToggleIncludeRewrites = (checked) => {
    setIncludeRewrites(checked);
  };
  const onClick = () => {
    onClickGenerateTweets(prompt, includeRewrites);
  };
  return (
    <div>
      <Title>Enter your article or content</Title>
      <Paragraph>Each paragraph in the content will generate multiple tweets</Paragraph>
      <TextArea id="content" disabled={loading} value={prompt} onChange={onTextAreaChange} />
      <Switch checked={includeRewrites} onChange={onToggleIncludeRewrites} disabled={loading} />
      <Text>{includeRewrites ? "Include Rewrites of Each Tweet" : "Do Not Include Rewrites of Each Tweet"}</Text>
      <div>
        <Button loading={loading} onClick={onClick}>
          Generate Tweets!
        </Button>
      </div>
    </div>
  );
}
