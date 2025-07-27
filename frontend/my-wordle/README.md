This repo contains a wordle clone that I've built to practice my JavaScript skills especially, plus my HTML, CSS skills.

Here's its database schema:
┌─────────────────┐ ┌──────────────────────┐ ┌─────────────────────┐
│ users │ │ game_sessions │ │ user_stats │
├─────────────────┤ ├──────────────────────┤ ├─────────────────────┤
│ id (PK) │◄───┤ user_id (FK) │ │ user_id (PK, FK) │
│ username │ │ id (PK) │ │ total_games │
│ email │ │ word │ │ games_won │
│ password_hash │ │ time_taken (seconds) │ │ games_lost │
│ created_at │ │ guesses_count │ │ best_time │
│ is_active │ │ won (boolean) │ │ best_guesses │
└─────────────────┘ │ date_played │ │ best_word │
│ created_at │ │ best_game_date │
└──────────────────────┘ │ updated_at │
└─────────────────────┘
