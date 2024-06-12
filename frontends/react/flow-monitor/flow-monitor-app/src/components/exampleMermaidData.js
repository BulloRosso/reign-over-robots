export default `
stateDiagram-v2
    [*] --> Waiting
    Waiting --> [*]: Due date reached
    Waiting --> Negotiating
    Negotiating --> Waiting
    Negotiating --> Success
    Success --> [*]
    `;
