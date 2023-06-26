import os

# Specify the directory where your scripts are located
directory = "cron_server"  

for filename in os.listdir(directory):
    # Check if the file is a Python script
    if filename.endswith(".py"):
        script_path = os.path.join(directory, filename)
        print(f"Running script: {script_path}")
        os.system(f"python {script_path}")