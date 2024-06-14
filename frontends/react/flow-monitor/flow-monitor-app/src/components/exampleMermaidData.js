export default `
stateDiagram-v2
    direction TB

    classDef active fill:gold

    [*] --> Planning
    Planning --> Waiting
    Planning -->[*]: No tasks created
    Waiting --> [*]: Due date reached
    Waiting --> Negotiating
    Negotiating --> Waiting
    Negotiating --> Success
    Success --> [*]

    class Negotiating active
    `;
