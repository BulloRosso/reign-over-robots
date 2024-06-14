export default `
stateDiagram-v2
    direction TB

    classDef active fill:gold

    [*] --> Planning
    Planning --> Waiting
    Planning -->[*]: No tasks created
    Waiting --> [*]: Due date reached
    Waiting --> [*]: Canceled by human in the loop
    Waiting --> Negotiating
    Negotiating --> Waiting
    Negotiating --> PartialSuccess
    Negotiating --> Success: All tasks completed
    PartialSuccess --> [*]: 1+ tasks could not be completed
    Success --> [*]

    class Negotiating active
    `;
