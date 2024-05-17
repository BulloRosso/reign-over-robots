from transitions import Machine

class AgoraAgentInstance:
    states = ['start', 'searching', 'negotiating', 'purchasing', 'completed']

    def __init__(self):
        self.machine = Machine(model=self, states=AgoraAgentInstance.states, initial='start')
        
        # Define transitions
        self.machine.add_transition('start_search', 'start', 'searching')
        self.machine.add_transition('find_item', 'searching', 'negotiating')
        self.machine.add_transition('agree_price', 'negotiating', 'purchasing')
        self.machine.add_transition('complete_purchase', 'purchasing', 'completed')

    def start_search(self):
        print("Starting search for item")

    def find_item(self):
        print("Finding item")

    def agree_price(self):
        print("Agreeing on price")  

    def complete_purchase(self):    
        print("Completing purchase")
