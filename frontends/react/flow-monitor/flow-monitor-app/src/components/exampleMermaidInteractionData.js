export default `
sequenceDiagram
    autonumber
    participant Alice
    participant John
    link Alice: Display Status @ agent/alice
    link John: Display Status @ agent/john
    Alice->>+John: Hello John, how are you?
    Alice->>+John: John, can you hear me?
    John-->>-Alice: Hi Alice, I can hear you!
    John-->>-Alice: I feel great!
    `;
