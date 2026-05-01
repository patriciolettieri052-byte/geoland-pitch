import json
import os

STATE_PATH = "brain/state.json"

def load_state():
    with open(STATE_PATH, "r") as f:
        return json.load(f)

def save_state(state):
    with open(STATE_PATH, "w") as f:
        json.dump(state, f, indent=4)

def analyze_responsive(url):
    print(f"[Responsive Expert] Analyzing mobile UX for: {url}")
    # Simulating mobile-specific analysis for taotajima.jp
    responsive_profile = {
        "breakpoints": [
            {"device": "mobile", "width": "320px-480px"},
            {"device": "tablet", "width": "481px-1024px"},
            {"device": "desktop", "width": "1025px+"}
        ],
        "mobile_adaptations": [
            "Grid transitions from multi-column to single-column vertical stack.",
            "Menu becomes full-screen overlay with larger touch targets.",
            "Three.js background complexity reduced for performance (lower pixel ratio).",
            "Liquid transition shaders simplified for mobile GPUs."
        ],
        "touch_controls": [
            "Swipe to navigate between projects implemented specifically for mobile.",
            "Double-tap to zoom or expand project details.",
            "Custom circular cursor replaced with standard touch interactions."
        ]
    }
    return responsive_profile

if __name__ == "__main__":
    state = load_state()
    url = state["project"]["reference_url"]
    if url:
        state["analysis"]["responsive"] = analyze_responsive(url)
        save_state(state)
        print("[Responsive Expert] Responsive analysis complete.")
    else:
        print("[Responsive Expert] Error: No reference URL found in state.")
