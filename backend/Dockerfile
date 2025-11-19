# ----------------------------------------------------
# UNIVERSAL LANGUAGE EXECUTION CONTAINER
# Supports: C, C++, Python, Java
# ----------------------------------------------------

FROM ubuntu:22.04

# Avoid interactive prompts
ENV DEBIAN_FRONTEND=noninteractive

# Install compilers and runtimes
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    python3 \
    openjdk-17-jdk \
    && apt-get clean

# Create working directory
WORKDIR /app

# Copy entry script
COPY entry.sh /usr/local/bin/entry.sh
RUN chmod +x /usr/local/bin/entry.sh

# Default entry point
ENTRYPOINT ["entry.sh"]


docker build -t universal-runner -f Dockerfile .