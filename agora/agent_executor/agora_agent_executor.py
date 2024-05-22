import paho.mqtt.client as mqtt
import os
import sys
from dotenv import load_dotenv
from fastapi import FastAPI
from pydantic import BaseModel
import asyncio

# models are defined one directory level above to be shared between gatekeeper and executor
parent_dir = os.path.abspath('..')
sys.path.append(parent_dir)

from agora.agora_models import AgoraAgent

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

@app.on_event("startup")
async def startup_event():
    loop = asyncio.get_running_loop()
    await loop.run_in_executor(None, start_mqtt_client)

@app.get("/")
async def root():
    return {"message": "This is the agora agent executor. Please use the /conversation/ endpoint to POST an message."}

@app.post("/conversation/")
async def create_item(agent: AgoraAgent):
    # Process the item here
    return agent