# Frontends

This directory contains web frontends in different technologies like Angular or React.

The frontend allows to monitor the execution of a collaborative SESSION of an agent crew which was set up either with AutoGen or LangGraph.

Do not confuse this with a flow designer! The frontends of this project kick in AFTER you set up your agentic network.

The basic interface is the flow-monitor:

![Diagram](/img/agent-cockpit.jpg)

* THE FLOW PANE shows the transition graph of the agentic flow and allows you to select an agent for closer inspection. This is derived from a LangGraph object or the finite state machine setup of AutoGen.

* THE AGENT ITEM on the flow pane gives you the current agent state at a glance. The most important thing is the usage of the context window: it is composed of the system prompt, the current task prompt and additionally of a memory prompt (if an agend deploys long term memory like memGPT).
It also shows the status of the integrations, e. g. you can see a red indicator when there was an error with an underlying API call of a tool.

* THE TASK QUEUE illustrates how far the agents have completed their overall mission. The task queue is either part of the flow definition or was devised by the planning agent upfront.

* THE FILES TAB is a view into the private directory of files shared between the agents. While one agent can pull a file from the internet another could modify this in a later step. Many advanced agentic use cases revolve around creating or modifying files.

* The HISTORY TAB is a compressed "debug view" and contains the sequence of most important ACTIONS that happened during the traversal of the flow graph. An action is a decision by a router component, a tool call or any modification of a file inside the private directory of files. For teachable agents the history also includes the extracted knowledge which was sent to the long term memory storage.