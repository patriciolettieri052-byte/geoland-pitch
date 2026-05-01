import subprocess
import json
import os
import sys

STATE_PATH = "brain/state.json"

def load_state():
    with open(STATE_PATH, "r") as f:
        return json.load(f)

def save_state(state):
    with open(STATE_PATH, "w") as f:
        json.dump(state, f, indent=4)

def run_agent(agent_path):
    print(f"[Orchestrator] Running agent: {agent_path}")
    result = subprocess.run(["py", agent_path], capture_output=True, text=True)
    if result.returncode != 0:
        print(f"[Orchestrator] Agent {agent_path} failed: {result.stderr}")
    return result.stdout

def run_analysis(url):
    state = load_state()
    state["project"]["reference_url"] = url
    state["project"]["status"] = "ANALYZING"
    save_state(state)
    
    print(f"[Orchestrator] Starting full analysis for: {url}")
    
    # Run Analysts
    run_agent("agents/analyst/dom_scraper.py")
    run_agent("agents/analyst/tech_profiler.py")
    run_agent("agents/analyst/aesthetic_analyzer.py")
    run_agent("agents/analyst/responsive_expert.py")
    
    # Reload state after agents finishes
    state = load_state()
    state["project"]["current_phase"] = "WAITING_FOR_USER_BRIEF"
    state["project"]["status"] = "ANALYSIS_COMPLETE"
    save_state(state)
    
    print(f"\n[Orchestrator] Analysis complete for {url}")
    print("[Orchestrator] Milestone 1Reached: Waiting for user briefing (text, assets, structure).")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python main_orchestrator.py <URL>")
    else:
        run_analysis(sys.argv[1])
