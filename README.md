# AgentZ Agora
![Diagram](./img/agents-agora.jpg)

This project is an *experimental hub for agents to interact*. In contrast to other frameworks like LangGraph, AutoGen or CrewAI which are focused on dividing a complex initial task into subtasks and having those processed by different agents INSIDE a company AgentZ Agora connects agents of different companies within a controlled environment.

The idea is that an assistant (e. g. a custom GPT) sends an agent to some well-known Agoras in order to complete a task which involves another party.

## Sending an agent
A agent is not a binary package but a YAML manifest. The owner of the agent creates the manifest and encrypts and digitally signs it.

Examples can be found in the agents subfolder of this repository.

## Restricted Access (Trust)
The Agora cannot be entered by any agent. A agent manifest YAML is uploaded to the Agora and validated:
* is must be encrypted and signed
* the contained credentials for the Agora must be satisfied (e. g. valid passport number, customer id)

## Entry point
The agent first talks to the Archon agent which is the entry point for the Agora.

# Technology
* Supports agents based on Ollama3 (locally installed) or GTP-4 (cloud based)
* Uses LangChain under the hood to abstract LLM calls
* Is currently only for local usage (no cloud deployment available)

# How to start
After checkout got to the shell, switch to /frontends/react/flow-monitor/flow-monitor-app and type "npm run dev".

This starts the main UI and requires Ollama3 being started upfront.

## Example scenario
A customer agent XENOS has been sent to the Agora. His first contact is to talk to ARCHOS to get details about the available merchants.

Xenos is looking for some energy drinks. There are three merchants registered on the Agora: John, Martha and Jarvis.

If Xenos is successful he buys 3 cans of Monster energy from Jarvis.

# Status
Experimental
