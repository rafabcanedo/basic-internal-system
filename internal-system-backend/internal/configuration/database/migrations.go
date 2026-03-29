package database

import (
	"fmt"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"

	"github.com/rafabcanedo/basic-internal-system/internal-system-backend/internal/model/repository/entity"
)

func RunMigrations() error {
	host := getEnv("DB_HOST", "localhost")
	port := getEnv("DB_PORT", "5432")
	user := getEnv("DB_USER", "postgres")
	password := getEnv("DB_PASSWORD", "postgres")
	dbname := getEnv("DB_NAME", "internal")
	sslmode := getEnv("DB_SSLMODE", "disable")

	dsn := fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=%s",
		host, port, user, password, dbname, sslmode,
	)

	gormDB, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		return fmt.Errorf("error opening gorm connection for migrations: %w", err)
	}

	gormDB.Exec("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\"")

	err = gormDB.AutoMigrate(
		&entity.UsersEntity{},
	)
	if err != nil {
		return fmt.Errorf("error running migrations: %w", err)
	}

	sqlDB, _ := gormDB.DB()
	sqlDB.Close()

	return nil
}
