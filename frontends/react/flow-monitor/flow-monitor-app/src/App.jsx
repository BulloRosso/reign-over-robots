import React, { useCallback } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";

import "reactflow/dist/style.css";
import AgentNode from "./agentNode";

const nodeTypes = {
  agent: AgentNode,
};

const initialNodes = [
  {
    id: "a1",
    type: "agent",
    position: { x: 50, y: 50 },
    data: {
      label: "Planner",
      contextMemory: { system: 20, task: 40, free: 100 },
    },
  },
  {
    id: "a2",
    type: "agent",
    position: { x: 50, y: 200 },
    data: {
      label: "Executor",
      contextMemory: { system: 50, task: 40, free: 10 },
    },
  },
];
const initialEdges = [
  {
    id: "e1-2",
    source: "a1",
    target: "a2",
    sourceHandle: "bottom-handle",
    targetHandle: "top-handle",
  },
];

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
