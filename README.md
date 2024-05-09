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

# Well-architected framework for AI agents

This project covers the automated creation and maintenance of AI agents based upon the OpenAI APIs - esp. assistants API v2.

The plan is to grow documentation together with code in a 50%/50% ratio: Only if the textual description is precise and complete next generation LLMs will be able to modify the existing codebase with high precision.

# Use cases and scope
This project aims at a LEAST COST implementation of agents for customers. The approach is to avoid use as many out-of-the-box services to simplify development.

Imagine you were a web agency and want to provide agents based solutions to your clients: 
* the implementations should not differ too much for easier maintenance/updates AND 
* you want to be able to separate operations costs per tenant AND
* you want to implement only the business logic, the rest should be covered by cloud services

# Hardware / service requirements
This project can be checked out to tinker locally. Using the infrastructure folder it can be deployed to the Azure cloud for public access.

# Logical dependencies: Repo folders
This repository is organized in the following structure:
![Diagram](./img/repo-structure.jpg)

* Documentation (first)
* Agents (the artifacts to be produced)
* Content (the business logic of the agents)
* Tools for internal use by agents (integrations with cloud services)
* Frontends

Operational data is distributed over the different cloud providers (like Azure, OpenAI). This is the tradeoff for the least cost approach. 

# Deployment view: Components
![Diagram](./img/deployment-structure.jpg)

As initial step you create a backend and frontend combination for your agent. You provide the API keys,
credentials and other tenant specific configuration in a local file.

1. The assistant is created as an assistan instance within OpenAI with GPT-4 as model
2. The business logic will be placed in the agent created by the agent builder
3. The customer interacts with the frontend
4. (optional) the customer has to authenticate with Aut0 identity and access management
5. The UI interacts with the agent (backend) via API calls
6. The agend interacts with the OpenAI APIs as required and returns the responses back to the UI
7. If the user provides files or gets files as a response (e. g. a created Excel file) Azure BLOB storage is controlled by the agent using the Azure SDK. 
8. The customer can download files from the Azure cloud 

This is a simplified overview.

# Prerequisites
An API key for OpenAI with unrestricted permissions. This is required because the Python code will create objects like assistants and files.

## For public cloud deployment
* Restricted OpenAI keys for the tenants
* Azure API keys and subscription
* (optional) Aut0 API key and subscription

# Out of scope

* Models
* Data sets for training

# Deployment scopes
Agents developed with this framework can be used either stand-alone or deployed into the Azure cloud.

# Status
Experimental
