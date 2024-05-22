from dotenv import load_dotenv
import os
import sys
import yaml
from datetime import datetime
from dateutil import parser  

parent_dir = os.path.abspath('..')
sys.path.append(parent_dir)

from agora_models import AgoraAgent

load_dotenv(dotenv_path='../.env')

def_dir = "c:/data/github/reign-over-robots/agents/personas"

print("Using repository: " + os.getenv("AGORA_AGENTS_REPOSITORY"))

with open(def_dir + '/xenos/agent-manifest.yaml', 'r') as file:
    data = yaml.safe_load(file)

agent = AgoraAgent(**data)

print("Agent loaded: " + agent.name)
# print(type(agent))
print("----------------")
print(agent.prompts.memory)
print("----------------")
print("Will remain active until " + parser.parse(agent.dueDate).strftime("%Y-%m-%d %H:%M:%S") + " (UTC)")