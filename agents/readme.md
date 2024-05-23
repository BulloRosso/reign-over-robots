# Agents

This folder contains the created agents (which later can form an agentic network for collaboration).

![Diagram](/img/agent-manifest.jpg)

Use these as templates to be deployed to one agora using the the gatekeeper instance.

Personas:
* Archos: The gatekeeper (service registry)
* Xenon: The visitor (first use case example)
* Martha: merchant (first use case example)
* Jarvis: merchant (first use case example)
* John: merchant (first use case example)

## Role of Archos
Archos is the first LLM instace when a new agent enters an agora: Archos tries to determine what the intention of the new agent is and plans the steps. These steps are injected to the task prompt of the new agent. Additionally the memory prompt of the new agent is prepopulated with the relevant environment knowledge compiled by Archos.