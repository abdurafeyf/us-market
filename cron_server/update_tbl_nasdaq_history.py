"""
The purpose of this is to get the nasdaq tickers historical data from 
the api (https://site.financialmodelingprep.com) and insert that data into our database.
"""
import requests
from dotenv import load_dotenv
import datetime
import os
from mysql.connector import Error
import mysql.connector
import time


load_dotenv()

ndx_url = f"https://financialmodelingprep.com/api/v3/historical-price-full/%5ENDX?apikey={os.getenv('FINANCIAL_MODELING_PREP_KEY')}"

ndx_data = []
# JSON object of all tickers available
data = requests.get(ndx_url).json()
for quote in data['historical']:
    year, month, date = (quote['date'].split('-'))
    ndx_data.append(
        (
            quote['date'],
            'NDX',
            'NASDAQ',
            '^NDX',
            quote['close'],
            quote['open'],
            quote['high'],
            quote['low'],
            quote['change'],
            quote['changePercent'],
            time.mktime(
                datetime
                .datetime(int(year), 
                         int(month), 
                         int(date))
                         .timetuple()),
            quote['date'],
            datetime.datetime.now(),
            quote['volume'],
            quote['changeOverTime']
        )
    )

try:
    connection = mysql.connector.connect(
        host=os.getenv("PLANETSCALE_HOST"),
        database=os.getenv("PLANETSCALE_DATABASE"),
        user=os.getenv("PLANETSCALE_USER_NAME"),
        passwd=os.getenv("PLANETSCALE_PASSWORD")        
    )

    mySql_insert_query = """
    INSERT INTO tbl_nasdaq_history (snapshot_date, 
    indice_symbol, indice_name, symbol, close, open, 
    high, low, `change`, change_p, unix_time, update_time, 
    job_run_time, volume, changeOverTime)
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, 
    %s, %s, %s, %s, %s, %s, %s)
    """
    mySql_delete_query = """
    DELETE FROM tbl_nasdaq_history
    """
    cursor = connection.cursor()
    cursor.execute(mySql_delete_query)
    print(cursor.rowcount, "records deleted successfully")


    cursor.executemany(mySql_insert_query, ndx_data)
    print(cursor.rowcount, "records inserted successfully")
    connection.commit()


except Error as error:
    print("Some error has occured {}".format(error))

finally:
    if connection.is_connected():
        cursor.close()
        connection.close()
        print("MySQL connection is closed")
