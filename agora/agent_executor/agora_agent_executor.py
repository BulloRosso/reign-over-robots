import paho.mqtt.client as mqtt
import os
import sys
import json 
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import asyncio

# models are defined one directory level above to be shared between gatekeeper and executor
parent_dir = os.path.abspath('..')
sys.path.append(parent_dir)

from agora_models import AgoraAgent

'''
Creates a FAST API server listening on port 8000. The server is connected to MQTT broker and listens to the topic "agora-test".

start using fastapi run (for production) or fastapi dev agora-gatekeeper (for development)
'''

load_dotenv(dotenv_path='../.env')

def on_connect(client, userdata, flags, rc):
    print("Connected to MQTT broker "+os.getenv("MQTT_BROKER_URL")+"with result code "+str(rc))
    agoraName = "agora-internal-"+os.getenv("AGORA_NAME")
    client.subscribe(agoraName)

def on_message(client, userdata, msg):
    print(msg.topic+" "+str(msg.payload))

def start_mqtt_client():
    client = mqtt.Client()
    client.on_connect = on_connect
    client.on_message = on_message
    client.connect(os.getenv("MQTT_BROKER_URL"), int(os.getenv("MQTT_BROKER_PORT")), 60)
    client.loop_start()

app = FastAPI()

origins = [
    "http://localhost:5173",  # React app
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    loop = asyncio.get_running_loop()
    await loop.run_in_executor(None, start_mqtt_client)

@app.get("/")
async def root():
    return {"message": "This is the agora agent executor. Please use the /conversation/ endpoint to POST an message."}

@app.get("/ping/")
async def ping():
    return {"message": "pong"}

@app.get("/{agora}/{agent}/")
async def create_item(agora: str, agent: str):
    # Process the item here
    return json.loads('''{
        
        "steps": 3,
        "flowStatus": "success",
       
        "files": [ "invoice.pdf", "list.txt" ],
        "tasks": [ { "title": "Buy a red bull",
                      "status": "completed" },
                      { "title": "Buy olives",
                        "status": "pending" }
                      ],
        "telemetryLog": [
                { "sender": "Homebase", "timestamp": "2024-06-14T12:01Z", "message": "Add two kilos of olives to the shopping list"},
                { "sender": "Agent", "timestamp":"2024-06-14T12:25Z", "message": "Confirmed 'olives'. But no merchant offers olives on the market."},
                { "sender": "Homebase", "timestamp":"2024-06-14T15:31Z", "message": "Add three apples instead of olives to the shopping list"},
                { "sender": "Agent", "timestamp":"2024-06-14T15:32Z", "message": "Confirmed 'apples'. Apples are available at the market."},
                { "sender": "Agent","timestamp":"2024-06-14T15:45Z", "message": "Baught apples at the market."}  
        ],
        "agoraProfile": {
            "name": "Heraklion",
            "description": "A playground for agents to exchange digital goods and services. Currently without support for payment tools.",
            "imageUrl": "https://raw.githubusercontent.com/BulloRosso/reign-over-robots/main/img/agora-example.jpg"
                      },
        "agentProfile": {
            "name": "Xenos", 
            "role": "customer",
            "mission": "Buy items",
            "dueDate": "2024-12-31T23:59:59Z",
            "identity": {  "owner": "Ralph" },
            "imageUrl": "https://raw.githubusercontent.com/BulloRosso/reign-over-robots/main/img/agent-example.jpg"
                      },
        "domainLongTermMemory": {
            "nodes": [],
            "edges": []
                      },
        "conversationLog": [
            {
                "sender": "Archos",
                "receiver": "Xenos",
                "prompt" : {
                    "summary": "Pass context as memory",
                    "system": "Hello, how can I help you today?",
                    "task": "Xenos wants to buy a red bull",
                    "memory": "Martha is a seller. Joe is a seller."
                },
                "response": "I would like to buy a red bull",
                "toolUsage": [],     
                "state": {
                      "onEnter": "None",
                      "transition": "DoPlanning",
                      "onExit": "Planning"}
            },
            {
                "sender": "Xenos",
                "receiver": "Joe",
                "prompt" : {
                    "summary": "Ask for a red bull",
                    "system": "You are a buyer.",
                    "task": "I would like to buy a red bull",
                    "memory": ""
                },
                "response": "I can offer you one can of red bull for $2.50",
                "toolUsage": [],  
                 "state": {
                      "onEnter": "Planning",
                      "transition": "DoTasks",
                      "onExit": "Negotiating"}
            },
            {
                "sender": "Xenos",
                "receiver": "Joe",
                "prompt" : {
                    "summary": "Buy a red bull",
                    "system": "My name is Xenos and I am a customer.",
                    "task": "Please sell me a can of red bull.",
                    "memory": "Joe said he can offer me one can of red bull for $2.50"
                },
                "response": "Sold. Have a good day",
                "toolUsage": [ { "tool": "Payment", "timestamp": "2024-12-31T23:59:59Z", "parameters": { "amount": 2.50, "currency": "USD" }, "status": "Success" , "response": "{ 'fileCreated': 'invoice.pdf' }" } ],  
                "state": {
                      "onEnter": "Negotiating",
                      "transition": "IsSuccess",
                      "onExit": "Success"}
             }
        ]}
    ''' )
