This repo contains a wordle clone that I initially built to practice my JavaScript skills especially, plus my HTML, CSS skills.

It's since then morphed into a full-stack Flask/Python app. Here's the PostgreSQL database schema for the app:

| users         | game_sessions            | user_stats                   |
| ------------- | ------------------------ | ---------------------------- |
| id (PK)       | user_id (FK <- users.id) | user_id (PK, FK <- users.id) |
| username      | id (PK)                  | total_games                  |
| email         | word                     | games_won                    |
| password_hash | time_taken (seconds)     | games_lost                   |
| created_at    | guesses_count            | best_time                    |
| is_active     | won (boolean)            | best_guesses                 |
|               | date_played              | best_word                    |
|               | created_at               | best_game_date               |
|               |                          | updated_at                   |
