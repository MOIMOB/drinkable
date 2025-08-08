# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Build Commands
- `npm run build` - Production build for F-Droid store
- `npm run build:play-store` - Production build for Google Play Store
- `npm run build:app-store` - Production build for Apple App Store  
- `npm run build:web` - Web-only production build
- `npm start` - Start development server at http://localhost:8080
- `npm run analyze` - Production build with webpack bundle analyzer

### Code Quality
- `npm test` - Run Jest tests
- `npm run format` - Format code with Prettier
- `npm run lint-fix` - Fix ESLint issues automatically

### Mobile Development
- `npx cap copy` - Copy web assets to native platforms (run after builds)
- `npx cap add ios` / `npx cap add android` - Add native platforms
- `npx cap open ios` / `npx cap open android` - Open in Xcode/Android Studio
- `npx cap sync` - Sync native dependencies

## Architecture Overview

### Framework Stack
- **Frontend**: Aurelia framework with TypeScript
- **Mobile**: Capacitor for native iOS/Android functionality
- **Styling**: Tailwind CSS + DaisyUI + SCSS
- **Build**: Webpack with custom configuration
- **Testing**: Jest with jsdom environment
- **E2E**: Cypress for end-to-end testing

### Project Structure
```
src/
├── modules/           # Main application modules
│   ├── home/         # Home page and settings
│   ├── cocktails/    # Cocktail browsing and filtering
│   ├── ingredients/  # Ingredient management  
│   └── user/         # User profile, lists, settings
├── services/         # Business logic services
├── components/       # Reusable UI components
├── data/            # Static data (cocktails, ingredients, tags)
├── domain/          # Domain entities and enums
└── locales/         # Internationalization files
```

### Key Services
- `CocktailService`: Cocktail data and filtering logic
- `IngredientService`: Ingredient management and substitutions
- `LocalStorageService`: Settings and user data persistence  
- `SupabaseService`: Backend API integration
- `ThemeService`: Dark/light theme management

### Data Architecture
- Static cocktail/ingredient data in `src/data/` directory
- User data stored in LocalStorage via `LocalStorageService`
- Supabase integration only for contact form functionality (disabled for F-Droid builds)
- Multi-language support with i18next

### Build System
- Webpack configuration supports multiple store targets (F-Droid, Play Store, App Store)
- Environment-specific builds using `--env store=<target>` flags
- Capacitor integration for mobile builds
- Asset optimization and code splitting

## Development Workflow

### Adding New Cocktails
1. Add cocktail data to `src/data/cocktail-data.ts`
2. Add translations to `src/locales/*/cocktails.json` and `instructions.json`
3. Add cocktail image to `static/images/` directory

### Adding New Ingredients  
1. Add ingredient to `src/data/ingredient-data.ts`
2. Add translations to `src/locales/*/ingredients.json`
3. Update spirit type classification if alcoholic

### Testing
- Unit tests in `tests/` directory mirror `src/` structure
- Cypress E2E tests in `cypress/e2e/`
- Jest configuration supports ES modules and Aurelia framework
- Run `npm test` before committing changes

### Code Style
- ESLint configuration enforces TypeScript best practices
- Prettier handles code formatting
- Prefer `type` over `interface` (ESLint rule)
- Use strict equality (`===`) except for null checks