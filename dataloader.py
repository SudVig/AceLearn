import sqlite3
import mysql.connector
from mysql.connector import Error

# Function to connect to SQLite
def connect_to_sqlite(db_path):
    try:
        sqlite_connection = sqlite3.connect(db_path)
        print("Successfully connected to SQLite database")
        return sqlite_connection
    except sqlite3.Error as error:
        print("Error while connecting to SQLite", error)
        return None

# Function to connect to MySQL
def connect_to_mysql(host, user, password, database):
    try:
        mysql_connection = mysql.connector.connect(
            host=host,
            user=user,
            password=password,
            database=database
        )
        if mysql_connection.is_connected():
            print("Successfully connected to MySQL database")
            return mysql_connection
    except Error as e:
        print("Error while connecting to MySQL", e)
        return None

# Function to transfer data from SQLite to MySQL
def transfer_data(sqlite_connection, mysql_connection, excluded_table):
    try:
        # Fetch all tables from SQLite database
        sqlite_cursor = sqlite_connection.cursor()
        sqlite_cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
        tables = sqlite_cursor.fetchall()

        for table in tables:
            table_name = table[0]
            if table_name != excluded_table:
                print(f"Transferring data from table {table_name}")

                # Fetch all rows from the table in SQLite
                sqlite_cursor.execute(f"SELECT * FROM {table_name}")
                rows = sqlite_cursor.fetchall()

                # Debugging: Print number of rows to check if data exists
                print(f"Table {table_name} has {len(rows)} rows.")

                if rows:  # Check if there are rows to transfer
                    column_names = [description[0] for description in sqlite_cursor.description]

                    # Debugging: Print columns and rows to check if data is correct
                    print(f"Columns: {column_names}")
                    print(f"Rows to be transferred: {len(rows)}")

                    # Prepare SQL query to insert data into MySQL
                    placeholders = ", ".join(["%s"] * len(column_names))
                    insert_query = f"INSERT INTO {table_name} ({', '.join(column_names)}) VALUES ({placeholders})"
                    
                    mysql_cursor = mysql_connection.cursor()

                    # Insert each row into the MySQL database
                    try:
                        mysql_cursor.executemany(insert_query, rows)
                        mysql_connection.commit()
                        print(f"Data transferred for table {table_name}")
                    except Error as e:
                        print(f"Error during insert for table {table_name}: {e}")
                        mysql_connection.rollback()
                else:
                    print(f"Skipping table {table_name} (no data to transfer)")
            else:
                print(f"Skipping table {table_name} (excluded)")

    except Error as e:
        print(f"Error during data transfer: {e}")
        mysql_connection.rollback()

def main():
    # Paths and credentials
    sqlite_db_path = 'D:\project\AceLearn\Backend-LexoR\db.sqlite3'  # Replace with your SQLite DB path
    mysql_host = 'localhost'
    mysql_user = 'root'
    mysql_password = 'root'  # Replace with your MySQL password
    mysql_database = 'management_system'  # Replace with your MySQL database name
    excluded_table = 'apicode_User'  # The table to exclude from transfer

    # Connect to SQLite and MySQL
    sqlite_connection = connect_to_sqlite(sqlite_db_path)
    if sqlite_connection is None:
        return  # Exit if SQLite connection failed

    mysql_connection = connect_to_mysql(mysql_host, mysql_user, mysql_password, mysql_database)
    if mysql_connection is None:
        return  # Exit if MySQL connection failed

    # Transfer data from SQLite to MySQL
    transfer_data(sqlite_connection, mysql_connection, excluded_table)

    # Close the connections
    if sqlite_connection:
        sqlite_connection.close()
    if mysql_connection:
        mysql_connection.close()

if __name__ == '__main__':
    main()
