 #!/bin/bash
cd ./gatekeeper 
fastapi dev agora_gatekeeper.py --port 8077& 
cd ../agent_executor 
fastapi dev agora_agent_executor.py --port 8078&
cd ../../frontends/react/flow-monitor/flow-monitor-app
npm run dev 
start https://localhost:5173/&
echo "Agora started"