package main

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/rafabcanedo/basic-internal-system/internal-system-backend/internal/configuration/database"
	"github.com/rafabcanedo/basic-internal-system/internal-system-backend/internal/controller"
	"github.com/rafabcanedo/basic-internal-system/internal-system-backend/internal/model/repository"
	"github.com/rafabcanedo/basic-internal-system/internal-system-backend/internal/model/service"
	"github.com/rafabcanedo/basic-internal-system/internal-system-backend/internal/routes"
)

func main() {
	db, err := database.InitPostgres()
	if err != nil {
		log.Fatalf("error initializing postgres: %v", err)
	}
	defer db.Close()

	if err := database.RunMigrations(); err != nil {
		log.Fatalf("error running migrations: %v", err)
	}

	userRepo := repository.NewUserRepository(db)
	userSvc := service.NewUserService(userRepo)
	userCtrl := controller.NewUserController(userSvc)

	router := gin.Default()

	router.GET("/health", func(c *gin.Context) {
		if err := db.Ping(); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"status": "db_error", "error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, gin.H{"status": "ok"})
	})

	routes.UserRoutes(router, userCtrl)

	port := ":3333"
	log.Printf("Server running on %s", port)

	if err := router.Run(port); err != nil {
		log.Fatalf("failed to start server: %v", err)
	}
}
