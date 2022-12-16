import React, { useEffect, useState } from "react";
import { Layout, Nav, Typography, Col, Row, BackTop, Spin } from '@douyinfe/semi-ui';
import { InputContent } from "./InputContent";
import { GeneratedResults } from "./GeneratedResults";
import axios from "axios";

function App() {
  const { Header, Footer, Content } = Layout;
  const { Title, Text, Paragraph } = Typography;
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const generateTweets = async (prompt, includeRewrites) => {
    console.log("Generating...", prompt, includeRewrites);
    setLoading(true);
    const response = await axios.post("/generate", {
      data: prompt,
      includeRewrites,
    });
    setLoading(false);
    setResults(response.data.results);
  };
  return (
    <Layout>
      <Header>
        <Text>Tweet Writer</Text>
      </Header>
      <Content>
        <Row>
          <Col span={12} offset={8}>
            <Title>Tweet Writer</Title>
            <Paragraph>Are you tired of spending hours brainstorming and writing tweets for your social media presence?</Paragraph>
            <Paragraph>Look no further, because our product is here to help. Introducing Tweet Writer, the program that writes tweets for you! Simply input an article or some paragraphs, and our program will generate a list of attention-grabbing and engaging tweets for you to use on your social media platforms.</Paragraph>
            <Paragraph>No more writer's block or tedious tweeting, Tweet Writer has got you covered. Try it out today and see the difference it can make for your social media strategy.</Paragraph>
            <Paragraph>#TimeSaver #socialmedia #TweetGenerator</Paragraph>
          </Col>
        </Row>
        <Row>
          <Col span={12} offset={8}>
            <InputContent loading={loading} onClickGenerateTweets={generateTweets} />
          </Col>
        </Row>
        <Row>
          <Col span={12} offset={8} style={{textAlign: "center"}}>
            {loading ? <Spin size={"large"} tip={"Loading generated content..."} /> : <GeneratedResults results={results} />}
            <BackTop />
          </Col>
        </Row>
      </Content>
      <Footer>
        <Paragraph>Copyright (C) 2022 Rudolf Olah</Paragraph>
        <Paragraph>Licensed under the MIT License</Paragraph>
        <Paragraph><a href={"https://github.com/rudolfolah/tweet-writer"} target={"_blank"} rel="noreferrer">
          Source code on GitHub
        </a></Paragraph>
      </Footer>
    </Layout>
  );
}

export default App;
