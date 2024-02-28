import React, { useEffect, useState } from "react";
import {Typography, Button, Switch, TextArea, Space} from '@douyinfe/semi-ui';
import {IconPlay} from "@douyinfe/semi-icons";

const styles = {
  toggleIncludeRewrites: {
    marginTop: "1rem",
    marginBottom: "1rem",
  },
  paragraph: {
    marginBottom: "1rem",
  },
  heading: {
    marginTop: "0.5rem",
    paddingTop: "1rem",
  },
};

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
      <Title style={styles.heading}>Enter your article or content</Title>
      <Paragraph style={styles.paragraph}>Each paragraph in the content will generate multiple tweets</Paragraph>
      <TextArea id="content" disabled={loading} value={prompt} onChange={onTextAreaChange} />
      <Space style={styles.toggleIncludeRewrites}>
        <Switch checked={includeRewrites} onChange={onToggleIncludeRewrites} disabled={loading} />
        <Text>{includeRewrites ? "Include Rewrites of Each Tweet" : "Do Not Include Rewrites of Each Tweet"}</Text>
      </Space>
      <div>
        <Button icon={<IconPlay />} loading={loading} onClick={onClick}>
          Generate Tweets!
        </Button>
      </div>
    </div>
  );
}
