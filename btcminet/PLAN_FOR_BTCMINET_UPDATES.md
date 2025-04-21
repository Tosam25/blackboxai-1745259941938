# Plan for BTCMINET Updates - Referral Fixes and Faucet Improvements

## 1. Referral Section Fixes (referrals.html and dashboard.html)
- Fix "Ganancias por Referidos" to show 0 BTC by default if no earnings.
- Calculate referral earnings dynamically if possible, else default to 0.
- Fix referral link generation to use full wallet address (no truncation).
- Ensure referral link is copied correctly.
- Referral registration logic assumed backend or external, no changes here.

## 2. Points and Levels System (contracts.html, faucet.html, dashboard.html)
- Define points system:
  - 1 point per $1 USD spent on contracts.
- Define levels thresholds (example):
  - Level 1: 0-99 points
  - Level 2: 100-199 points
  - Level 3: 200-399 points
  - Level 4: 400-699 points
  - Level 5: 700+ points
- Store points and level in localStorage for demo.
- On contract purchase:
  - Add points = contract amount.
  - Update level based on points.
  - Save points and level in localStorage.
- Update dashboard.html and faucet.html to display current level and progress to next level.

## 3. Faucet Improvements (faucet.html)
- Show current user level and progress bar for points to next level.
- Adjust faucet reward based on level (e.g., base reward * level multiplier).
- Add visible message: "🏷️ Función de cupones disponible próximamente".
- Ensure faucet reward, countdown, and claim button work as before.
- Update localStorage or state on claim to keep in sync.

## 4. Real-time Updates and Synchronization
- On contract purchase, update points and level immediately.
- On faucet claim, update balance and show updated reward.
- Referral earnings and total referrals to be updated dynamically if possible.

## 5. UI/UX
- Use Tailwind CSS for styling.
- Keep existing referral table unchanged.
- Add new UI elements for level and progress in faucet.html.
- Use alerts or notifications for user feedback on copy, purchase, claim.

---

This plan will be implemented step-by-step with code changes in the respective files.