# SUITCASE Recovery Guide

## Restore Stable Version

git checkout stable/auth-onboarding-v1

OR

git checkout v1-auth-onboarding-stable

## Install Dependencies

npm install

## Start Frontend

npm run dev

## Production Build

npm run build

## Restore Environment

Copy .env.example → .env
Add API keys.

## Restore Database

Import Supabase schema backups.
