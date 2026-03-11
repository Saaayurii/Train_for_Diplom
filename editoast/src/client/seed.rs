
use anyhow::Result;
use chrono::{DateTime, Utc};
use database::DbConnectionPoolV2;
use diesel::prelude::*;
use diesel_async::RunQueryDsl;
use fake::faker::internet::en::SafeEmail;
use fake::faker::lorem::en::Sentence;
use fake::Fake;

use database::tables;

#[derive(Insertable)]
#[diesel(table_name = tables::authn_user)]
pub struct NewUser {
    pub name: String,
}

#[derive(Insertable)]
#[diesel(table_name = tables::project)]
pub struct NewProject {
    pub name: String,
    pub objectives: Option<String>,
    pub description: Option<String>,
    pub creation_date: DateTime<Utc>,
    pub last_modification: DateTime<Utc>,
    pub tags: Vec<Option<String>>,
}

pub async fn seed_database(db_pool: DbConnectionPoolV2) -> Result<()> {
    let mut conn = db_pool.get().await?;

    // Seed users
    for _ in 0..15 {
        let name: String = SafeEmail().fake();
        let new_user = NewUser { name };
        diesel::insert_into(tables::authn_user::table)
            .values(&new_user)
            .execute(&mut conn)
            .await?;
    }

    // Seed projects
    for _ in 0..15 {
        let name: String = Sentence(1..3).fake();
        let new_project = NewProject {
            name,
            objectives: Some(Sentence(5..10).fake()),
            description: Some(Sentence(10..20).fake()),
            creation_date: Utc::now(),
            last_modification: Utc::now(),
            tags: Vec::<Option<String>>::new(),
        };
        diesel::insert_into(tables::project::table)
            .values(&new_project)
            .execute(&mut conn)
            .await?;
    }

    println!("Database seeded successfully!");

    Ok(())
}
