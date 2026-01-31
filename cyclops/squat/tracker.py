import json
import os
import matplotlib.pyplot as plt

# Detect lift name from folder
LIFT_NAME = os.path.basename(os.getcwd())
DATA_FILE = "data.json"

# Load existing data
if os.path.exists(DATA_FILE):
    with open(DATA_FILE, "r") as f:
        weights = json.load(f)
else:
    weights = []

# Input
today = int(input(f"Enter today's {LIFT_NAME} weight (lbs): "))
weights.append(today)

# Save
with open(DATA_FILE, "w") as f:
    json.dump(weights, f)

# Stats
average = sum(weights) / len(weights)
pr = max(weights)

print(f"\n👁️ CYCLOPS — {LIFT_NAME.upper()}")
print("------------------------")
print(f"Sessions: {len(weights)}")
print(f"Average: {average:.1f} lbs")
print(f"PR: {pr} lbs")

# Graph
plt.plot(weights, marker="o")
plt.title(f"{LIFT_NAME.capitalize()} Progress")
plt.xlabel("Workout Number")
plt.ylabel("Weight (lbs)")
plt.grid(True)
plt.show()
