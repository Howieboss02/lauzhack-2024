# lauzhack-2024
<a name="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![MIT License][license-shield]][license-url]

### Authors
- [Ewa Miazga](https://github.com/ewaMiazga)
- [Stanisław Howard](https://github.com/Howieboss02)
- [Karolina Tofil](https://github.com/tflkarolina)
- [Maksym Ziemlewski](https://github.com/mziem)

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#motivation">Motivation</a></li>
        <li><a href="#goal">Goal</a></li>
      </ul>
    </li>
    <li>
      <a href="#for-developers">For Developers</a>
      <ul>
      <li><a href="#build-with">Build With</a></li>
      <li><a href="#getting-started">Getting Started</a></li>
      </ul>
  </ol>
</details>

## About The Project

### Motivation
We wanted to create an extension to the browser which allows users to get the summary of the news they read and twitter post they scroll through. 
The analysis is comprehensive and also impose a question if the news just read is a fakenews or not, to enforce the realisation how often the user encounters the fakenews.

### Goal
User friendly extension that can be a perosnal helper, while reviewing the news.

## For Developers

### Build With

* [![React][React.js]][React-url]
* [![Python][Python.org]][Python-url]
* [![Flask][Flask.com]][Flask-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>


### Getting started


#### Step 1: Create and Activate the Virtual Environment

##### Linux
```bash
# Create a virtual environment if not already created
python3 -m venv venv

# Activate the virtual environment
source venv/bin/activate

# Install the required packages
pip install -r requirements.txt
```
##### Windows
```bash
# Create a virtual environment if not already created
python -m venv venv

# Activate the virtual environment
venv\Scripts\activate

# Install the required packages
pip install -r requirements.txt
```

---

#### Step 2: Run the Flask Application
```bash
# Run the Flask application
python app.py
```

#### Step 3: Set Environment Variables

##### Linux
```bash
# Set the environment variables
export FLASK_APP=app.py
export FLASK_ENV=development
```

##### Windows
```bash
# Set the environment variables
set FLASK_APP=app.py
set FLASK_ENV=development
```


---

##### Step 4: Deactivate the Virtual Environment
```bash
# Deactivate the virtual environment
deactivate
```

---

### License
Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

[contributors-shield]: https://img.shields.io/badge/CONTRIBUTORS-4
[contributors-url]:https://github.com/Howieboss02/lauzhack-2024/graphs/contributors
[license-shield]: https://img.shields.io/badge/LICENSE-MIT-brightyellow?style=for-the-badge
[license-url]: https://github.com/Howieboss02/lauzhack-2024/blob/main/LICENSE


[React.js]: https://img.shields.io/badge/React-black?logo=react
[React-url]: https://reactjs.org/
[Python.org]: https://img.shields.io/badge/Python-brightgreeen?style=flat&logo=python&logoColor=FFE873&color=306998
[Python-url]: https://www.python.org/
[Flask.com]: https://img.shields.io/badge/Flask-black?style=plastic&logo=flask&color=%2361dafb
[Flask-url]: https://flask.palletsprojects.com/en/3.0.x/
