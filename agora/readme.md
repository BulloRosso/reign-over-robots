# Agora (Runtime environment)
Agora executes Python and is available to the frontends as FastAPI methods.

Methods:
1. First call is the agent which visits the marketplace (and is internally connected to Archos) -> return session number
2. Seconds call uses session directory <agentname>-<session> (=next step)
3. Status calls (examine prompt, get actions log, ...)
