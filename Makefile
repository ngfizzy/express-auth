
dev:
	TARGET=dev docker compose up --build
prod:
	TARGET=prod docker compose up --build

gen_migration:
	npm run migration:gen ./src/migrations/${name}
run_migration:
	npm run migration:run
fmt:
	npm run lint && npm run prettier