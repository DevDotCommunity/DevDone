from flask import Flask, render_template, request, jsonify
import json
import os

app = Flask(__name__)

DATA_FILE = "data/todos.json"

# Ensure data directory exists
os.makedirs("data", exist_ok=True)

# Load todos from file
def load_todos():
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, "r") as file:
            return json.load(file)
    return []

# Save todos to file
def save_todos(todos):
    with open(DATA_FILE, "w") as file:
        json.dump(todos, file, indent=4)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/todos", methods=["GET"])
def get_todos():
    return jsonify(load_todos())

@app.route("/todos", methods=["POST"])
def add_todo():
    todos = load_todos()
    data = request.get_json()
    new_todo = {
        "id": data["id"],
        "text": data["text"],
        "completed": False
    }
    todos.append(new_todo)
    save_todos(todos)
    return jsonify(new_todo), 201

@app.route("/todos/<int:todo_id>", methods=["DELETE"])
def delete_todo(todo_id):
    todos = load_todos()
    todos = [todo for todo in todos if todo["id"] != todo_id]
    save_todos(todos)
    return jsonify({"message": "Todo deleted"}), 200

@app.route("/todos/<int:todo_id>", methods=["PUT"])
def update_todo(todo_id):
    todos = load_todos()
    for todo in todos:
        if todo["id"] == todo_id:
            todo["completed"] = not todo["completed"]
            break
    save_todos(todos)
    return jsonify({"message": "Todo updated"}), 200

if __name__ == "__main__":
    app.run(debug=True)
