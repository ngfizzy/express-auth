
test:
	npm i && docker compose build && docker compose run test test
dev:
	NODE_ENV=develop npm i && docker compose up develop --build
prod: 
	docker compose up app --build
teardown:
	docker compose down && docker system prune -a --volumes && rm -rfv ./data ./node_modules ./dist ./logs
gen_migration:
	docker compose build
	docker compose run generate_migration ./src/migrations/${name}
migrate:
	docker compose run migrate
reset_db:
	docker compose build migrate_revert
	@echo "Reverting all migrations..."
	@while true; do \
		output=$$(docker compose run migrate_revert); \
		echo "$$output"; \
		if echo "$$output" | grep -q "No migrations were found in the database. Nothing to revert!"; then \
			echo "No more migrations to revert."; \
			break; \
		fi; \
		if echo "$$output" | grep -q "Error"; then \
			echo "An error occurred during migration reversion."; \
			exit 1; \
		fi; \
	done
	@rm -rfv ./data
	@echo "Database reset complete!"


refresh_db: reset_db migrate

fmt:
	npm run lint && npm run prettier