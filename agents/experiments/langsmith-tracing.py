from langchain_openai import ChatOpenAI
from langchain.agents.output_parsers import OpenAIFunctionsAgentOutputParser
from langchain.agents import AgentExecutor
from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain.tools.render import format_tool_to_openai_function
from langchain.agents.format_scratchpad import format_to_openai_function_messages
from langchain.tools import StructuredTool
from langchain_core import utils

from langsmith import traceable

import json
from pydantic.v1 import BaseModel, Field
from os import environ as env

print("Demo of langsmith tracing for token sum")
print("--------------------------------------------------------------------")
print("Accessing cloud with API key " + env.get("OPENAI_API_KEY"))

def get_customer_full_name(first_name: str) -> str:
    """
    Retrieve customer's full namepip given the customer first name.

    Args:
        first_name (str): The first name of the customer. 

    Returns: 
        str: The full name of the customer.
    """
    full_name = first_name + "_Smith"
    return full_name

def get_customer_email(full_name: str) -> str:
    """
    Retrieve customer email given the full name of the customer. 

    Args: 
        full_name (str): The full name of the customer.

    Returns:
        str: The email of the customer.
    """
    email = full_name.lower() + "@gmail.com"
    return email

class GetCustomerFullNameInput(BaseModel):
    """
    Pydantic arguments schema for get_customer_full_name method
    """
    first_name: str = Field(..., description="The first name of the customer")

class GetCustomerEmailInput(BaseModel):
    """
    Pydantic arguments schema for get_customer_email method
    """
    full_name: str = Field(..., description="The full name of the customer")

# Initialize the LLM
llm = ChatOpenAI(
    temperature=0.5,
    model_name="gpt-4",
    openai_api_key=env.get("OPENAI_API_KEY")
)

# Initialize the tools
tools = [
    StructuredTool.from_function(
        func=get_customer_full_name,
        args_schema=GetCustomerFullNameInput,
        description="Function to get customer full name.",
    ), 
    StructuredTool.from_function(
        func=get_customer_email,
        args_schema=GetCustomerEmailInput,
        description="Function to get customer email",
    )
]
llm_with_tools = llm.bind(
    functions=[utils.function_calling.convert_to_openai_function(t) for t in tools]
)

system_init_prompt = """
You are a shop manager capable of retrieving full names and emails of the customers. 
Given the question, answer it to the best of your abilities.
"""

user_init_prompt = """
The question is: {}. 
Go!
"""

# Initialize the prompt
prompt = ChatPromptTemplate.from_messages(
    [
        ("system", system_init_prompt),
        ("user", user_init_prompt.format("{input}")),
        MessagesPlaceholder(variable_name="agent_scratchpad"),
    ],
)

def parse_trace_logs(file_path):
    total_tokens = 0
    try:
        with open(file_path, 'r') as file:
            logs = json.load(file)
            for log in logs:
                if 'tokens' in log:
                    total_tokens += log['tokens']
    except FileNotFoundError:
        print("File not found. Please check the file path.")
    except json.JSONDecodeError:
        print("Error decoding JSON. Please check the file contents.")
    
    return total_tokens

@traceable
def call_llm_with_functions(user_message):
    # Initialize agent
    agent = (
        {
            "input": lambda x: x["input"],
            "agent_scratchpad": lambda x: format_to_openai_function_messages(
                x["intermediate_steps"]
            ),
        }
        | prompt
        | llm_with_tools
        | OpenAIFunctionsAgentOutputParser()
    )
    
    # Initialize the agent executor
    agent_executor = AgentExecutor(agent=agent, 
                                tools=tools, 
                                verbose=True)
   
    return agent_executor.invoke({"input": user_message})


# main code
user_message = "What is the full name and email of our customer John?"
response = call_llm_with_functions(user_message)
response = response.get("output")
print(f"Response: {response}")