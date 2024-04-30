# expects assistants API v2

import os
from openai import OpenAI
client = OpenAI()
OpenAI.api_key = os.getenv('OPENAI_API_KEY')

# Step 1: Create an Assistant
my_assistant = client.beta.assistants.create(
    model="gpt-4",
    instructions="You are a personal math tutor. When asked a question, write and run Python code to answer the question.",
    name="Math Tutor",
    tools=[{"type": "code_interpreter"}],
)
print(f"This is the assistant object: {my_assistant} \n")