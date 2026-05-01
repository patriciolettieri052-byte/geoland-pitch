import json
import os

STATE_PATH = "brain/state.json"

def load_state():
    with open(STATE_PATH, "r") as f:
        return json.load(f)

def save_state(state):
    with open(STATE_PATH, "w") as f:
        json.dump(state, f, indent=4)

def analyze_aesthetic(url):
    print(f"[Aesthetic Analyzer] Profiling visual style for: {url}")
    # Simulating aesthetic profile detection
    visual_profile = {
        "color_palette": {
            "primary": "#0f172a",
            "secondary": "#38bdf8",
            "accent": "#f472b6",
            "background": "#ffffff"
        },
        "typography": {
            "headings": "Inter, sans-serif",
            "body": "Roboto, sans-serif"
        },
        "style_tokens": {
            "roundness": "0.5rem",
            "glassmorphism": True,
            "dark_mode_optimized": True
        },
        "animations": ["fade-in", "slide-up", "hover-scale"]
    }
    return visual_profile

if __name__ == "__main__":
    state = load_state()
    url = state["project"]["reference_url"]
    if url:
        state["analysis"]["aesthetic"] = analyze_aesthetic(url)
        save_state(state)
        print("[Aesthetic Analyzer] Aesthetic profiling complete.")
    else:
        print("[Aesthetic Analyzer] Error: No reference URL found in state.")
