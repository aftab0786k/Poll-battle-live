<!-- 
🔸 Frontend (ReactJS)
Users can enter their name (no password required).

Can create a new poll room or join one using a room code.

Shows a question with two options (e.g., Cats vs Dogs).

Allows voting only once.

Real-time vote updates as others vote.

A countdown timer (60 seconds) after which voting ends.

Local storage is used to remember user's vote even after a page refresh.

🔹 Backend (NodeJS + WebSocket)
Handles poll room creation and stores all data in memory (no database).

Accepts new votes and broadcasts updates to all users in the same room.

Supports multiple rooms with different users and vote states.
 How Vote State Sharing & Room Management Works
Each room has a unique room code. When a room is created, the server stores:

The room ID

The question

The vote count for each option

A list of usernames who have voted

When a user connects:

The server adds them to the correct room.

When they vote, the server updates the vote count and sends the updated state to all clients in that room using WebSocket broadcasts.

The vote is also stored in the user's browser using localStorage to prevent re-voting on refresh.
 -->