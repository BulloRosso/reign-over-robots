export default `
stateDiagram-v2
    direction TB

    classDef active fill:gold
    classDef final stroke:#000,stroke-width:3px;

    [*] --> Planning
    Planning --> Waiting
    Planning -->Invalid: No tasks created
    Waiting --> Expired: Due date reached
    Waiting --> Negotiating: Work on task
    Waiting --> Canceled: By human in the loop
    Waiting --> Planning: Feedback received
    Negotiating --> Waiting: Next task
    Negotiating --> PartialSuccess: 1+ tasks could not be completed
    Negotiating --> Success: All tasks completed
    Negotiating --> Waiting: Contact human for feedback
    Invalid --> [*]
    Success --> [*]
    PartialSuccess --> [*]
    Expired --> [*]
    Canceled --> [*]
    
    class Waiting active
    class Invalid final
    class Success final
    class PartialSuccess final
    class Expired final
    class Canceled final
    `;
