'''
Basic class definitions for the Agora system
'''
from datetime import datetime
from pydantic import BaseModel, Field

class AgoraConfiguration(BaseModel):
    publicSchema: str = Field(..., alias="schema")
    name: str
    description: str
    
class AgoraState(BaseModel):
    name: str
    agents: list
    lastUpdated: datetime

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
    publicSchema: str = Field(..., alias="schema")
    name: str
    mission: str = None
    dueDate: str = None
    identity: AgoraIdentity
    llm: AgoraLLMConfiguration
    prompts: AgoraPromptSet

    def load_from_yaml(yaml_data: str):
        return AgoraAgent(**yaml_data)
