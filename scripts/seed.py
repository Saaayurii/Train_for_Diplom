import psycopg2
from faker import Faker

# Database connection details
DB_HOST = "localhost"
DB_PORT = "5432"
DB_NAME = "osrd"
DB_USER = "osrd"
DB_PASSWORD = "password"

# Number of entities to create
NUM_ENTITIES = 15

def seed_database():
    try:
        # Connect to the database
        conn = psycopg2.connect(
            host=DB_HOST,
            port=DB_PORT,
            dbname=DB_NAME,
            user=DB_USER,
            password=DB_PASSWORD
        )
        cur = conn.cursor()

        # Initialize Faker
        fake = Faker()

        # Seed authn_user table
        for _ in range(NUM_ENTITIES):
            name = fake.email()
            cur.execute("INSERT INTO authn_user (name) VALUES (%s)", (name,))

        # Seed project table
        for _ in range(NUM_ENTITIES):
            name = fake.sentence(nb_words=3)
            objectives = fake.sentence(nb_words=10)
            description = fake.paragraph(nb_sentences=5)
            creation_date = fake.date_time_this_decade()
            last_modification = fake.date_time_this_decade()
            tags = []
            cur.execute(
                "INSERT INTO project (name, objectives, description, creation_date, last_modification, tags) VALUES (%s, %s, %s, %s, %s, %s)",
                (name, objectives, description, creation_date, last_modification, tags)
            )


        # Commit the changes
        conn.commit()

        print("Database seeded successfully!")

    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()

if __name__ == '__main__':
    seed_database()
