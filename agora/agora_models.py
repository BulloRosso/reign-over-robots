'''
Basic class definitions for the Agora system:
* AgoraConfiguration:   The instance of an Agora which contains the states for the state machine
* AgoraState:           The state of an Agora (e.g. active Agents)
* AgoraAgent:           The acting entitiy on the agora
'''
from datetime import datetime
from typing_extensions import Unpack
from pydantic import BaseModel, ConfigDict, Field
from yaml import dump 

class AgoraConfiguration(BaseModel):
    modelSchema: str 
    name: str
    description: str
    
class AgoraState(BaseModel):
    modelSchema: str 
    agents: list[str]
    lastUpdated: str

    def save_to_disc(self, path: str):
        with open(path, 'w') as f:
            dump(self.model_dump(), f)  

class AgoraLLMConfiguration(BaseModel):
    name: str
    contextWindowSizeKB: int

class AgoraIdentity(BaseModel):
    owner: str

class AgoraPromptSet(BaseModel):
    system: str
    task: str
    memory: str

class AgoraAgent(BaseModel):
    modelSchema: str
    name: str
    role: str
    mission: str = None
    dueDate: str = None
    identity: AgoraIdentity
    llm: AgoraLLMConfiguration
    prompts: AgoraPromptSet

    def load_from_yaml(yaml_data: str):
        return AgoraAgent(**yaml_data)
