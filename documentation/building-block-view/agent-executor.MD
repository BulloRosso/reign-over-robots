# Agent Executor Python Component 

The Python component offers a single entry point `conversation(agentName, agoraName)` which is called several times in a sequence.

The first time the entry point is called it creates a JSON file in a working directory following the file naming pattern "/conversations/<agoraName>/<agentName>.JSON". The JSON file stores the state of the conversation between the agent and other agents on the agora.

## Overview

![Diagram](/img/white-box-agent-executor.jpg)

The agent_executor Python script is the service wrapper which contains mainly the API methods and MQTT methods.

The agent_executor uses the agent_engine Python script to guide an agent through the configured states of an agora.

The agent_intance is the LLM wrapper and contains the tool declarations and calls.

## Methods

The Python component has a method `clear_conversation(agentName, agoraName)` which removes the JSON file from the working directory.

## Evaluation steps (with the agent executor as flow engine)

### Definition of a evaluation step

An evaluation step is a function of the agent executor which invokes a LLM model using LangChain with function calling. The evaluation step function `evaluation(LLMConfiguration,system_prompt, agora_prompt, task_prompt, memory_prompt)` returns a Python map containing the answer and the tokens used:

The parts of the final prompt to the LLM are kept separate to be able to work with the components during the agent's journey on the agora. 

```
{ "response": "The dog was lazy.", "responsetokens": 25 }
```
Inside the evaluation function the prompts are conncatenated like:
```
   llm_prompt = system_prompt + agora_prompt + task_prompt + memory_prompt
```

You are Xenos, an agent acting on behalf of Ralph.
You shall buy 3 pink olives or 4 black olives (whichever is cheaper), 3 cans of red bull and a Sharkira concert ticket.
Your budget is 20$ and your tasks should be finished by 25.05.2024.

The a typical agora prompt looks like this:
```
You are on the Agora 'Heraklion Marketplace' and must comply to these rules:
* Your intented actions must be declared in sequential order
* The semantic for an action on this agora is a JSON object composed of 4 elements { "orderNo": <sequence number>,"action": "<marketplace-action>","targetAgent": "<target-agent-name>", "topic": "<topic>" }
* Give no explanations about your reasoning
* The agent with the name 'Archos' is your contact if you want to find out about other agents on this marketplace
* It is advisable to contact Archos as a first step
* Plan your actions in advance and list them in sequential order
* If there are several agents you can ask them about the price of items
* allowed marketplace actions are: QUERY, BUY, WAIT, LEAVE, NEGOTIATE
* if you want to leave the marketplace add a LEAVE marketplace action
* include a results list in very response at the end, like { "results": [ "item 1","item 2"] }
* Your response consists only of one JSON element containing the an actions array and the results element

```

archos says joe and moe sell olives. olivia sells drinks. joker runs the local event agency.

Joe says 3 pink olives cost 3$. Moe responds 4 black olives cost 2$. Olivia says red bull is sold out and will return on Wednesday. Joker says a shakira ticket costs 200$ for the front row and 10$ for the back rows.

### The first evaluation step

### The second evaluation step

### the 3rd to nth evaluation step


## Documentation of the conversation

The documentation looks like this:
```
{   "conversation": [
        {
            "agent": "Xenos",
            "prompt": {
                    "task": "abc",
                    "memory": "rules of engagement"
                }
        }
    
   
  ]
}
```

## State flow with pytransitions

Each agent's conversation is a journey through different states which are special to an agora. The state flow is defined is defined per agora in a separate config file located in "/configurations/<agoraName>/states.JSON".

The state flow open source library is https://github.com/pytransitions/transitions.

An AgoraConversation model is extended with a state machine like the following example:
```
from transitions import Machine
machine = Machine(model=AgoraConversation, states=['entering', 'waiting-for-offers', 'success', 'fail'], initial='entering')
```

An agent can have the following states:
* 'entering' is assigned intially, this leads to an evaluation step
* 'waiting-for-offers' 
* 'success' is assigned if all the agent's mission goals were accomplished
* 'failure' is assigned if at least one of the agent's mission goals was not accomplished