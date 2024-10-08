FROM oven/bun:latest

WORKDIR /app
COPY . .
RUN bun install --no-save
RUN bun run --bun build
RUN bun --version
CMD ["bunx", "--bun", "serve", "dist"]