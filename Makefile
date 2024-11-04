
dev:
	TARGET=dev docker compose up --build
prod:
	TARGET=prod docker compose up --build

fmt:
	npm run lint && npm run prettier