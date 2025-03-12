#!/bin/bash
gunicorn app:app --timeout 600
