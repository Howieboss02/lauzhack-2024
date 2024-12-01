# lauzhack-2024
Project for Lauzhack2024


# Running a Flask Application in a Virtual Environment on linux


## Step 1: Create and Activate the Virtual Environment

### Linux
```bash
# Create a virtual environment if not already created
python3 -m venv venv

# Activate the virtual environment
source venv/bin/activate

# Install the required packages
pip install -r requirements.txt
```
### Windows
```bash
# Create a virtual environment if not already created
python -m venv venv

# Activate the virtual environment
venv\Scripts\activate

# Install the required packages
pip install -r requirements.txt
```

---

## Step 2: Run the Flask Application
```bash
# Run the Flask application
python app.py
```

## Step 3: Set Environment Variables

### Linux
```bash
# Set the environment variables
export FLASK_APP=app.py
export FLASK_ENV=development
```

### Windows
```bash
# Set the environment variables
set FLASK_APP=app.py
set FLASK_ENV=development
```


---

## Step 4: Deactivate the Virtual Environment
```bash
# Deactivate the virtual environment
deactivate
```

---