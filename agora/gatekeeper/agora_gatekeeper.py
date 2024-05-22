import paho.mqtt.client as mqtt
import os
import sys
from dotenv import load_dotenv
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import asyncio

from agent_manager import AgentManager

load_dotenv(dotenv_path='../.env')

'''
Creates a FAST API server listening on port 8000. The server is connected to MQTT broker and listens to the topic "agora-test".

start using fastapi run (for production) or fastapi dev agora-gatekeeper (for development)
'''

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
    return {"message": "This is the agora gatekeeper. Please use the /agents/ endpoint to POST an agent."}

@app.post("/agents/")
async def upload_agent_yaml(file: UploadFile):
    print("Received agent file: " + file.filename)
    content = await file.read()
    content_str = content.decode("utf-8")  # Convert bytes to string
    agent_manager = AgentManager()
    agent_manager.update_agent(content_str)
    # print("Agent updated: " + o["name"])
    return { "filename": file.filename }