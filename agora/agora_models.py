'''
Basic class definitions for the Agora system
'''

from pydantic import BaseModel

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
    name: str
    mission: str = None
    identity: AgoraIdentity
    llm: AgoraLLMConfiguration
    prompts: AgoraPromptSet
