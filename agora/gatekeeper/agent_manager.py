import os
import sys
import yaml
from dotenv import load_dotenv
parent_dir = os.path.abspath('..')
sys.path.append(parent_dir)

# from agora_models import AgoraAgent

load_dotenv(dotenv_path='../.env')

class AgentManager:
    
    def __init__(self):
        self.storage = os.getenv("AGORA_AGENTS_REPOSITORY")
        print("Agent Manager using repository: ")

    def update_agent(self, agent_yaml):
        o = yaml.parse(agent_yaml)
        with open(self.storage + "/output.txt", "w", encoding="utf-8") as file:
            # Write the string to the file
            file.write(agent_yaml)
        return o
        
