import os
import yaml

class Agent:
    def __init__(self, name, mission, owner, llm, prompts):
        self.name = name
        self.mission = mission
        self.owner = owner
        self.llm = llm
        self.prompts = prompts

def read_agent_yaml(file_path):
    with open(file_path, 'r') as file:
        data = yaml.safe_load(file)
        name = data['name']
        mission = data['mission']
        owner = data['identity']['owner']
        llm = data['llm']
        prompts = data['prompts']
        return Agent(name, mission, owner, llm, prompts)

def get_agents_from_directory(directory):
    agents = []
    # Iterate over each subdirectory in the main directory
    for subdir in os.listdir(directory):
        subdir_path = os.path.join(directory, subdir)
        if os.path.isdir(subdir_path):
            # Assume there is one YAML file per subdirectory
            for file in os.listdir(subdir_path):
                if file.endswith('.yaml'):
                    file_path = os.path.join(subdir_path, file)
                    agent = read_agent_yaml(file_path)
                    agents.append(agent)
    return agents

# Usage example
agents_directory = 'C:/Data/GitHub/reign-over-robots/agents/personas'
agents = get_agents_from_directory(agents_directory)
for agent in agents:
    print(f'Agent Name: {agent.name}, Mission: {agent.mission}')
