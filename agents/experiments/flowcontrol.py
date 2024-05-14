from langchain_openai import OpenAI
from langchain.chains import LLMChain
from langchain.schema import Prompt
from os import environ

# Setup GPT-4Turbo with your API key
completion_chain = openai.completions.create(model="gpt-4-turbo", api_key = environ.get("OPENAI_API_KEY") )
llm = OpenAI(model='gpt-4-turbo',temperature=0.1)
completion_chain = OpenAI.cr

class RouterAgent:
    def __init__(self, agents):
        self.agents = agents

    def route_request(self, agent_role, request):
        """ Route a request based on the role of the agent and collect responses. """
        responses = {}
        for agent in self.agents:
            prompt = f"Hello {agent['name']}, as a {agent['role']} {request}"
            response = completion_chain.run(Prompt(text=prompt))
            print(f"{agent['name']} ({agent['role']}) response: {response}")
            if 'price' in response:  # Assume price response contains a numeric value in a standard format.
                price = float(response.split('$')[1].split(' ')[0])
                responses[agent['name']] = price
            else:
                responses[agent['name']] = response
        return responses

# Define agents with roles
agents = [
    {"name": "Vendor 1", "role": "fruit vendor"},
    {"name": "Vendor 2", "role": "fruit vendor"},
    {"name": "Vendor 3", "role": "fruit vendor"},
    {"name": "CleanerCo", "role": "cleaning service provider"}
]

router_agent = RouterAgent(agents)

# Example use case 1: Buyer requests apple prices
buyer_request = "I am looking to buy an apple. Could you please provide the current price and availability of apples at your store?"
vendor_prices = router_agent.route_request("buyer", buyer_request)

# Handling responses, assume a selection process for simplicity
cheapest_vendor = min(vendor_prices, key=vendor_prices.get) if vendor_prices else None
if cheapest_vendor:
    print(f"Cheapest vendor is {cheapest_vendor} with price ${vendor_prices[cheapest_vendor]}")

