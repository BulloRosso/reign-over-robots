import React from "react";
import { Handle } from "reactflow";
import styled from "styled-components";
import cloud from "./assets/cloud.svg";

import "./agentNode.css";

type DonutProps = {
  img?: string;
  ctx_s: number;
  ctx_t: number;
  ctx_f: number;
};

const Donut = ({ img = cloud, ctx_s, ctx_t, ctx_f }: DonutProps) => {
  // Calculate the total of all segments
  const total = ctx_s + ctx_t + ctx_f;

  // Calculate the end degrees of each segment based on their proportion of the total
  const degree_s = (ctx_s / total) * 360;
  const degree_st = degree_s + (ctx_t / total) * 360;

  // Set the background gradient of the pie chart

  return (
    <div className="contextwindow">
      <div
        id="donut"
        style={{
          background: `conic-gradient(
          orange 0deg ${degree_s}deg, 
          gold ${degree_s}deg ${degree_st}deg, 
          green ${degree_st}deg 360deg
      )`,
        }}
      ></div>
      <img
        src={img}
        style={{
          width: "80%",
          position: "relative",
          top: "-42px",
          left: "206px",
        }}
      />
    </div>
  );
};

const Header = styled.div`
  background-color: #eee;
  border-bottom: 1px solid #ddd;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px 8px 0 0;

  h1 {
    font-size: 16px;
    margin: 0;
  }
`;

const Card = styled.div`
  width: 250px;
  border: 2px solid #000;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 8px 8px rgba(0, 0, 0, 0.1);
`;

const Content = styled.div`
  padding: 10px;

  h2 {
    color: #333;
    font-size: 16px;
    font-weight: normal;
    margin-top: 0;
    margin-bottom: 10px;
  }
`;

const Tools = styled.div`
  margin: 5px 0;
`;

const ToolLegend = styled.p`
  font-size: 12px;
  color: #333;
`;

const Costs = styled.div`
  background-color: #666;
  color: #fff;
  padding: 10px;
  display: flex;
  justify-content: flex-end;
  align-items: end;
  border-radius: 0 0 8px 8px;
`;

const AgentNode = ({ data }) => {
  return (
    <Card>
      <Header>
        <h1>Researcher</h1>
        <Donut ctx_f={10} ctx_s={30} ctx_t={60}></Donut>
      </Header>
      <Content>
        <h2>Ollama3</h2>
        <ToolLegend>Tools:</ToolLegend>
        <Tools>
          <p>
            <span className="status red"></span>CRM Bridge
          </p>
          <p>
            <span className="status green"></span>FileSearch
          </p>
        </Tools>
      </Content>
      <Costs>2.1k Tokens</Costs>
      <Handle
        type="target"
        position="top"
        id="top-handle"
        style={{ background: "#555" }}
        onConnect={(params) => console.log("handle onConnect", params)}
      />
      <Handle
        type="source"
        position="bottom"
        id="bottom-handle"
        style={{ background: "#555" }}
        onConnect={(params) => console.log("handle onConnect", params)}
      />
      <Handle
        type="target"
        position="left"
        id="left-handle"
        style={{ background: "#555" }}
        onConnect={(params) => console.log("handle onConnect", params)}
      />
      <Handle
        type="source"
        position="right"
        id="right-handle"
        style={{ background: "#555" }}
        onConnect={(params) => console.log("handle onConnect", params)}
      />
    </Card>
  );
};

export default AgentNode;
