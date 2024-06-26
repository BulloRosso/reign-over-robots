# Agora (Runtime environment)
Agora is composed of several services which are independent REST API services connected to each other using MQTT

Starting the agora services (after you created the .env file - see below)
```
./start-agora.sh
```
To make the shell script executable run `chmod u+x start-agora.sh` on the command line.

After the services are started:
* the gatekeeper listens on port 8077
* the agent executor listens on port 8078
* the fronend app is available on port 5173
IPC is achieved by using an public MQTT server (for testing purposes).

## "House rules" (State machine)
Each agora definition has the states and transistions of a FSM (finite state machine). This is required to define the options available on the agora - otherwise the state and flow would be random and uncontrollable. Control matters if you consider that the agora provider pays the LLM token fees!

## Gatekeeper (http port 8077)
A FastAPI application using a MQTT client.

The main use case for the gatekeeper is to deploy a new agent via POST to /agents. This makes the agent available to the executor (MQTT )

## Agent Executor (http port 8078)
A FastAPI application using a MQTT client.

The main use case for the gatekeeper is to run a step of a agent2agent communication process. 

## MQTT broker for service synchronization
For testing you can configure one of the public MQTT brokers like HiveMQ (broker.hivemq.com) or EMQ. The configuration is done via a .env file on the agoro directory level.

Example .env file:
```
MQTT_BROKER_URL=broker.hivemq.com
MQTT_BROKER_PORT=1883
AGORA_NAME=ralph
OPENAI_API_KEY=...
```




