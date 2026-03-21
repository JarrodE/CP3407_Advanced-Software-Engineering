# 5. Version Control — Git & GitHub Usage

## Repository

**[github.com/JarroDe/CP3407_Advanced-Software-Engineering](https://github.com/JarroDe/CP3407_Advanced-Software-Engineering)**

## Branching Strategy

- **`main`** branch is the production branch — always deployable
- Feature work is committed directly to main (solo developer workflow)
- GitHub Pages auto-deploys from the `main` branch

## Commit History

Commits follow descriptive messages that explain the *why* of changes, not just the *what*. Examples from the repo:
- Initial prototype with all 8 pages and user stories
- HD improvements: UI overhaul, Firebase integration, CI pipeline, ESLint
- CI fix: regenerate package-lock.json for npm ci compatibility
- Bug fix: restore cartCount element for menu.js compatibility

## GitHub Features Used

| Feature | Purpose |
|---------|---------|
| **GitHub Pages** | Hosts the live demo site automatically from `main` |
| **GitHub Actions CI** | Runs all 95 tests on every push and PR |
| **Issues** | Track bugs and feature requests |
| **Issue Templates** | Standardised bug report and feature request forms |
| **Pull Request Template** | Consistent PR descriptions with test checklists |
| **README.md** | Project overview, quick start, documentation links |
