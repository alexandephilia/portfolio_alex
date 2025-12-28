<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1T9Wi9ONHudzU0nT9o8rCFltgyU6TwwqZ

## Run Locally

**Prerequisites:** [Bun](https://bun.sh)


1. Install dependencies:
   `bun install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `bun run dev`

## Other Commands

- Build for production: `bun run build`
- Preview production build: `bun run preview`
