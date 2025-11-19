#!/bin/bash
# entry.sh – Universal code executor inside Docker container

LANGUAGE="$1"
STDIN="$2"

cd /app

if [ "$LANGUAGE" = "c" ]; then
    gcc main.c -o prog 2> compile_err.txt
    if [ $? -ne 0 ]; then
        cat compile_err.txt
        exit 1
    fi
    echo -e "$STDIN" | ./prog

elif [ "$LANGUAGE" = "cpp" ]; then
    g++ main.cpp -o prog 2> compile_err.txt
    if [ $? -ne 0 ]; then
        cat compile_err.txt
        exit 1
    fi
    echo -e "$STDIN" | ./prog

elif [ "$LANGUAGE" = "python" ]; then
    echo -e "$STDIN" | python3 script.py

elif [ "$LANGUAGE" = "java" ]; then
    javac Main.java 2> compile_err.txt
    if [ $? -ne 0 ]; then
        cat compile_err.txt
        exit 1
    fi
    echo -e "$STDIN" | java Main

else
    echo "Unsupported language: $LANGUAGE"
    exit 1
fi
