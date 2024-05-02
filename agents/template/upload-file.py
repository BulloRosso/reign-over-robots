# expects assistants API v2

import os
import json
from openai import OpenAI
client = OpenAI()
OpenAI.api_key = os.getenv('OPENAI_API_KEY')

print("Analyzing image now")

# Analyze a picture with gpt4-vision
def analyze_image(client, public_url):

  payload = """[
  {
    "role": "user",
    "content": [
                {
                    "type": "text",
                    "text": "promptText"
                },
                {
                    "type": "image_url",
                    "image_url": {
                    "url": "%s" }
                }
        ]
  }
  ]""" % (public_url)

  response = client.chat.completions.create(model = "gpt-4-vision-preview", messages = json.loads(payload))
  return { "content": response.choices[0].message.content, "tokens": response.usage.total_tokens }

print(analyze_image(client, "https://www.krugerpark.co.za/images/black-maned-lion-shem-compion-786x500.jpg"))

#assistant_id = 'asst_puxSZ96qFBu5ho71a7Idjnsj'
#api_key = os.getenv('OPENAI_API_KEY')
#file_path = r"C:\Users\ralph\Pictures\comic-loewi.png" 

#client.files.create(file_path, "purpose" = "assistants")

#0print(f"File '{file_path}' uploaded and added to the assistant with ID: {assistant_id}")

