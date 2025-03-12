#!/bin/bash
# Install system dependencies
apt-get update && apt-get install -y libgl1

# Install Python dependencies
pip install -r requirements.txt
