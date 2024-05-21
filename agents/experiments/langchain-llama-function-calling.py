from langchain_core.prompts import PromptTemplate
from langchain_core.pydantic_v1 import BaseModel, Field
from langchain_experimental.llms.ollama_functions import OllamaFunctions

# Chain
llm = OllamaFunctions(model="llama3", 
                      format="json", 
                      temperature=0)

def get_current_weather(location: str, unit: str = "celsius") -> str:
    return f"The weather in {location} is sunny at 35 degrees {unit}"

model = llm.bind(
    functions = [
        {
            "name": "get_current_weather",
            "description": "Get the current weather in a given location",
            "parameters": {
                "type": "object",
                "properties": {
                    "location": {
                        "type": "string",
                        "description": "The city and state, " "e.g. San Francisco, CA",
                    },
                    "unit": {
                        "type": "string",
                        "enum": ["celsius", "fahrenheit"],
                    },
                },
                "required": ["location"],
            },
        }
    ],
    function_call = {"name": "get_current_weather"},
)

response = model.invoke("what is the weather in Singapore?")
# function calling means content is empty
ret_content = response.content
while ret_content == "": 
    function_name = response.additional_kwargs["function_call"]["name"]
    function_args = eval(response.additional_kwargs["function_call"]["arguments"])
    
    if response.additional_kwargs["function_call"]["arguments"] != "":
        function_name += "("
        for key, value in function_args.items():
            if type(value) == str:
                v = "'" + value + "'"
            else:
                v = value
            function_name += key + "=" + v + ","
        function_name = function_name[:-1] + ")"

    print("Manually calling local function: " + function_name)
    ret_content = eval(function_name)
    print(ret_content)  

