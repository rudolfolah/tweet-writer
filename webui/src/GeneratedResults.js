import {Typography, Col, Row, Avatar} from '@douyinfe/semi-ui';

export function GeneratedResults({ results }) {
  const { Title, Text, Paragraph } = Typography;
  const items = (results === undefined || results.length === 0) ? [
    { text: "Example tweet" },
  ] : results;

  return (
    <div>
      <Title>Generated Tweets</Title>
      <div>
        {items.map((item, index) => (
          <Row key={index}>
            <Avatar>TW</Avatar>
            <Paragraph>Twitter User</Paragraph>
            <Paragraph>Full User Name</Paragraph>
            <Paragraph copyable={true}>{item.text}</Paragraph>
          </Row>
        ))}
      </div>
    </div>
  )
}
