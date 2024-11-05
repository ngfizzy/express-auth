
dev:
	TARGET=dev docker compose up --build
prod: 
	TARGET=prod docker compose up --build
teardown:
	docker compose down && docker system prune -a --volumes && rm -rfv ./data
gen_migration:
	docker compose build && docker compose run generate_migration -- ./src/migrations/${name}
migrate:
	docker compose run migrate
fmt:
	npm run lint && npm run prettier