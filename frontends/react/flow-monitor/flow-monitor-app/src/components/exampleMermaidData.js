export default `
stateDiagram-v2
    direction TB

    classDef active fill:gold

    [*] --> Waiting
    Waiting --> [*]: Due date reached
    Waiting --> Negotiating
    Negotiating --> Waiting
    Negotiating --> Success
    Success --> [*]

    class Negotiating active
    `;
