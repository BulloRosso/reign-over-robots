"""
While the agora-agent-executor is the frame around the engine (API Methods, MQTT connection) the engine deals with the actual agent logic.
The engine is responsible for the agent's decision-making process. It uses the agent's state to determine the next action and calls the OpenAI API to generate a response.
"""
from langchain_openai import ChatOpenAI
from langchain.agents import AgentExecutor
from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain.agents.format_scratchpad import format_to_openai_function_messages
from langchain.tools import StructuredTool
from langchain_core import utils
from langchain.agents.output_parsers import OpenAIFunctionsAgentOutputParser

from pydantic.v1 import BaseModel, Field
import os
import json
from agora_agent_instance import AgoraAgentInstance

# TODO placeholder for imported tool functions
class DummyFuncInput(BaseModel):
        """
        Pydantic arguments schema for dummy_func method
        """
        i: str = Field(..., description="Whatever you like to pass to the function.")

# Currently gpt-4 only with low temperature
class LLMInstance:

    def __init__(self, api_key):
        self.llm = ChatOpenAI(
            temperature=0.1,
            model_name="gpt-4",
            api_key=api_key)
        self.tools = []
       
    # TODO: Import module from configuration (as specified in AgoraAgentInstance)
    def dummy_func(i: str) -> str:
        """
        Just a dummy function

        Args: 
            i (str): Any string.

        Returns:
            str: the same string as given.
        """
        return i

    def set_tools(self):
        self.tools = [
            StructuredTool.from_function(
                func=self.dummy_func,
                args_schema=DummyFuncInput,
                description="This is a dummy function. do not use.",
            )
        ]
    # end of placeholder

    def invoke(self, system_prompt, user_prompt):

        # Initialize the prompt
        prompt = ChatPromptTemplate.from_messages(
            [
                ("system", system_prompt),
                ("user", user_prompt.format("{input}")),
                MessagesPlaceholder(variable_name="agent_scratchpad"),
            ],
        )

        self.set_tools()

        llm_with_tools = self.llm.bind(
            functions=[utils.function_calling.convert_to_openai_function(t) for t in self.tools]
        )       

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
                                    tools=self.tools, 
                                    verbose=True)    

        return agent_executor.invoke({"input": user_prompt}) 
        
 
class AgentEngine:
    def __init__(self, api_key):
        self.agent = AgoraAgentInstance()
        # Initialize the LLM
        self.llm = LLMInstance(api_key)
        # Clear/prepare the log file
        self.process_log = []

    def call_llm(self, prompt):
        response = self.llm.generate([prompt])
        return response

    def log_transition(self, state, prompt, response, iteration_to_call):
        self.process_log.append({
            'state': state,
            'prompt': prompt,
            'response': response,
            'iteration_to_call': iteration_to_call
        })

    def save_process_log(self, filename):
        with open(filename, 'w') as f:
            json.dump(self.process_log, f, indent=4)

    def run(self):
        while self.agent.state != 'completed':
            
            system="""You are a agent which can traverse through different states.
            Depending from you state choose the next action. The possible transitions are:
            * start_search from state 'start' to state 'searching'
            * find_item from state 'searching' to state 'negotiating'
            * agree_price from state 'negotiating' to state 'purchasing'
            * complete_purchase from state 'purchasing' to state 'completed'
            In your response just return the result of the transition and no explanation.
            """
            prompt = """
            Agent is in state 'start'. Set my state to 'searching'.
            """
            
            response = self.llm.invoke(system,prompt)
            print(response)
            
            iteration_to_do = response['output']

            old_state = self.agent.state
            # Define transition logic based on LLM response
            if iteration_to_do == 'start_search':
                self.agent.start_search()
            elif iteration_to_do == 'find_item':
                self.agent.find_item()
            elif iteration_to_do == 'agree_price':
                self.agent.agree_price()
            elif iteration_to_do ==  'complete_purchase':
                self.agent.complete_purchase()
            else:
                raise ValueError("Invalid transition")
            
            # Log the transition
            self.log_transition(old_state, prompt, response, iteration_to_do)

            # forced break until code completed
            self.agent.state = "completed"
        
        # Save the process log
        self.save_process_log('C:/Data/GitHub/reign-over-robots/agora/agent_executor/log.json')

# Example usage
if __name__ == "__main__":
    api_key = os.getenv("OPENAI_API_KEY")
    engine = AgentEngine(api_key)
    engine.run()
