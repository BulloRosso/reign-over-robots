from ollama import Client

client = Client(host='http://localhost:11434')
response = client.chat(model='llama3', messages=[
  {
    'role': 'user',
    'content': 'Why is the sky blue?',
  },
])

# for function calling start ollama run smangrul/llama-3-8b-instruct-function-calling:latest
# https://ollama.com/smangrul/llama-3-8b-instruct-function-calling:latest/blobs/de09ac457d69
print(response)