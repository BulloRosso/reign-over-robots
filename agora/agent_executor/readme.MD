# Agent executor

A Python FastAPI backend with IPC over MQTT.

## The magic of wait & state
The executor represents a finite state machine for an agent entering the marketplace.

The executor is in charge of maintaining and monitoring all agents' states.

The main goal is to create aynchronous operations between agents whith wait times from milliseconds to several days.

### State File for a conversation

### State changes caused by outside events (MQTT)
