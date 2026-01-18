#!/usr/bin/env python3
import requests
import matplotlib.pyplot as plt
import matplotlib.patches as patches

# Konfiguracja
API_URL = "http://localhost:8000/api"
ROBOT_ID = "696ba3d89557cc494a2f4331"  # Zmień na swoje ID

# Przeszkody z backendu
OBSTACLES = [
    {"x": 300, "y": 00, "width": 300, "height": 100},
    # {"x": 150, "y": 100, "width": 50, "height": 20},
    # {"x": 80, "y": 150, "width": 40, "height": 40},
    # {"x": 200, "y": 50, "width": 20, "height": 80},
]

def test_path(robot_id, target_x, target_y):
    """Testuje pathfinding i rysuje wynik"""
    
    # Wywołaj API
    response = requests.post(
        f"{API_URL}/path/calculate",
        json={"robotId": robot_id, "target": {"x": target_x, "y": target_y}}
    )
    
    if response.status_code != 200:
        print(f"Error: {response.status_code}")
        print(response.json())
        return
    
    data = response.json()
    path = data["path"]
    start = data["start"]
    target = data["target"]
    
    print(f"Znaleziono ścieżkę z {len(path)} punktów")
    
    # Rysowanie
    fig, ax = plt.subplots(figsize=(12, 8))
    
    # Przeszkody (czerwone prostokąty)
    for obs in OBSTACLES:
        rect = patches.Rectangle(
            (obs["x"], obs["y"]), 
            obs["width"], 
            obs["height"],
            linewidth=1, 
            edgecolor='red', 
            facecolor='red', 
            alpha=0.5
        )
        ax.add_patch(rect)
    
    # Ścieżka (niebieska linia)
    if len(path) > 0:
        xs = [p["x"] for p in path]
        ys = [p["y"] for p in path]
        ax.plot(xs, ys, 'b-', linewidth=2, label='Ścieżka', alpha=0.7)
        ax.plot(xs, ys, 'bo', markersize=3)
    
    # Start (zielony punkt)
    ax.plot(start["x"], start["y"], 'go', markersize=15, label='Start', zorder=5)
    
    # Cel (czerwony punkt)
    ax.plot(target["x"], target["y"], 'rs', markersize=15, label='Cel', zorder=5)
    
    ax.set_xlabel('X')
    ax.set_ylabel('Y')
    ax.set_title(f'Pathfinding: ({start["x"]}, {start["y"]}) → ({target["x"]}, {target["y"]})')
    ax.legend()
    ax.grid(True, alpha=0.3)
    ax.set_aspect('equal')
    
    plt.tight_layout()
    plt.show()

if __name__ == "__main__":
    # Przykłady testów
    print("Test 1: (0,0) -> (1000, 500)")
    test_path(ROBOT_ID, 1000, 500)
    
    # Możesz dodać więcej testów:
    # test_path(ROBOT_ID, 100, 100)
    # test_path(ROBOT_ID, 300, 200)
