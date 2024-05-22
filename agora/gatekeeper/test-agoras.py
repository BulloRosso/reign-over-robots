from dotenv import load_dotenv
import os
import sys
import yaml
from datetime import datetime
from dateutil import parser  

parent_dir = os.path.abspath('..')
sys.path.append(parent_dir)

from agora_models import AgoraConfiguration

load_dotenv(dotenv_path='../.env')

agoras = []

temp_path = "C:/Data/GitHub/reign-over-robots/agora/agoras"
print("Loading agora configurations from " + temp_path)
for subdir, dirs, files in os.walk(temp_path):
    for file in files:
        if file.endswith(".yaml") and not "_state" in file:
            print("Loading agora configuration: " + file)
            with open(os.path.join(subdir, file), 'r') as f:
                data = yaml.safe_load(f)
                agora = AgoraConfiguration(**data)
                agoras.append(agora)
                print(" - " + agora.name)