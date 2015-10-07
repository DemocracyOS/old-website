run: build
	@echo "Launching..."
	@npm run serve

build: packages
	@echo "Building..."
	@npm run build

packages:
	@echo "Installing dependencies..."
	@npm install

clean:
	@echo "Removing dependencies and built assets..."
	@rm -rf node_modules build
	@echo "Done.\n"

.PHONY: clean
