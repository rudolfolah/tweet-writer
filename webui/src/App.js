import React, { useEffect, useState } from "react";
import {Layout, Nav, Typography, Col, Row, BackTop, Spin, IconButton} from '@douyinfe/semi-ui';
import { InputContent } from "./InputContent";
import { GeneratedResults } from "./GeneratedResults";
import axios from "axios";
import {IconGithubLogo} from "@douyinfe/semi-icons";

const styles = {
  githubSourceButton: {
    padding: "0.5rem",
    borderRadius: "12px",
    backgroundColor: "#2f4a60",
    color: "white",
    textDecoration: "none",
    width: "fit-content",
    margin: "1rem",
  },
  githubSourceButtonLink: {
    color: "white",
    textDecoration: "none",
  },
  layout: {
    marginTop: "1rem",
    height: "100vh",
  },
  footer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontSize: "0.75rem",
  },
  paragraph: {
    marginBottom: "1rem",
  },
};

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
    <Layout style={styles.layout}>
      <Content>
        <Row>
          <Col span={8} offset={8}>
            <Title>Tweet Writer</Title>
            <Paragraph style={styles.paragraph}>Are you tired of spending hours brainstorming and writing tweets for your social media presence?</Paragraph>
            <Paragraph style={styles.paragraph}>Look no further, because our product is here to help. Introducing Tweet Writer, the program that writes tweets for you! Simply input an article or some paragraphs, and our program will generate a list of attention-grabbing and engaging tweets for you to use on your social media platforms.</Paragraph>
            <Paragraph style={styles.paragraph}>No more writer's block or tedious tweeting, Tweet Writer has got you covered. Try it out today and see the difference it can make for your social media strategy.</Paragraph>
            <Paragraph style={styles.paragraph}>#TimeSaver #socialmedia #TweetGenerator</Paragraph>
          </Col>
        </Row>
        <Row>
          <Col span={8} offset={8}>
            <InputContent loading={loading} onClickGenerateTweets={generateTweets} />
          </Col>
        </Row>
        <Row>
          <Col span={8} offset={8} style={{textAlign: "center"}}>
            {loading ? <Spin size={"large"} tip={"Loading generated content..."} /> : <GeneratedResults results={results} />}
            <BackTop />
          </Col>
        </Row>
      </Content>
      <Footer style={styles.footer}>
        <div>Copyright (C) 2024 Rudolf Olah</div>
        <div>Licensed under the MIT License</div>
        <div style={styles.githubSourceButton}>
          <a style={styles.githubSourceButtonLink} href={"https://github.com/rudolfolah/tweet-writer"} target={"_blank"} rel="noreferrer">
            <IconGithubLogo/> Source code on GitHub
          </a>
        </div>
      </Footer>
    </Layout>
  );
}

export default App;
