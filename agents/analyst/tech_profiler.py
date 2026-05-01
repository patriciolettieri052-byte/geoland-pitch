import json
import os

STATE_PATH = "brain/state.json"

def load_state():
    with open(STATE_PATH, "r") as f:
        return json.load(f)

def save_state(state):
    with open(STATE_PATH, "w") as f:
        json.dump(state, f, indent=4)

def profile_tech(url):
    print(f"[Tech Profiler] Detecting stack for: {url}")
    # Simulating tech detection logic
    # In practice, this would look for scripts, meta tags, and headers
    detected_stack = {
        "main_framework": "Next.js",
        "libraries": ["Three.js", "GSAP", "Framer Motion"],
        "styling": "Tailwind CSS",
        "language": "TypeScript"
    }
    return detected_stack

if __name__ == "__main__":
    state = load_state()
    url = state["project"]["reference_url"]
    if url:
        state["analysis"]["tech_stack"] = profile_tech(url)
        save_state(state)
        print("[Tech Profiler] Tech stack detection complete.")
    else:
        print("[Tech Profiler] Error: No reference URL found in state.")
