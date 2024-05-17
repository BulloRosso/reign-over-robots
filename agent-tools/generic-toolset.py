'''
A generic toolset for agents to use. This toolset is designed to be used by agents to perform various tasks.
'''

def get_vendors_for_item(item_name: str) -> str:
    """
    Get vendors for a given item.

    Args:
        item_name (str): The name or category for the item. 

    Returns: 
        array: array of the personas selling the item.
    """
    
    return ["John", "Martha", "Jarvis"]

def buy_item(item_name: str, seller_agent_name: str, buyer_agent_name) -> str:
    """
    Creates a contract for buying an item.

    Args: 
        item_name (str): The item to trade
        seller_agent_name (str): The name of the seller agent
        buyer_agent_name (str): The name of the buyer agent

    Returns:
        str: The path to the contract file
    """
    path = "c:/contracts/contract1.txt"
    return path