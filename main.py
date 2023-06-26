import os

directory = "cron_server"  # Specify the directory where your scripts are located

for filename in os.listdir(directory):
    if filename.endswith(".py"):  # Check if the file is a Python script
        script_path = os.path.join(directory, filename)
        print(f"Running script: {script_path}")
        os.system(f"python {script_path}")