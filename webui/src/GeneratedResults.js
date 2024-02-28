import React from "react";
import {Typography, Col, Row, Avatar} from '@douyinfe/semi-ui';

const styles = {
  layout: {
    marginTop: "3rem",
    marginBottom: "1rem",
  },
  title: {
    marginBottom: "1rem",
  },
};

export function GeneratedResults({ results }) {
  const { Title, Text, Paragraph } = Typography;
  const items = (results === undefined || results.length === 0) ? [
    "Example tweet",
  ] : results;

  return (
    <div style={styles.layout}>
      <Title style={styles.title}>Generated Tweets</Title>
      <div>
        {items.map((item, index) => (
          <Row key={index}>
            <Avatar>TW</Avatar>
            <Paragraph>Twitter User</Paragraph>
            <Paragraph>Full User Name</Paragraph>
            <Paragraph copyable={true}>{item}</Paragraph>
          </Row>
        ))}
      </div>
    </div>
  )
}
