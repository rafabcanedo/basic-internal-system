package main

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/rafabcanedo/basic-internal-system/internal-system-backend/internal/configuration/database"
)

func main() {

	db, err := database.InitPostgres()
    if err != nil {
        log.Fatalf("error initializing postgres: %v", err)
    }
    defer db.Close()

	router := gin.Default()

	router.GET("/health", func(c *gin.Context) {
        if err := db.Ping(); err != nil {
            c.JSON(http.StatusInternalServerError, gin.H{"status": "db_error", "error": err.Error()})
            return
        }
        c.JSON(http.StatusOK, gin.H{"status": "ok"})
    })

	port := ":3333"
	log.Printf("Server running on %s", port)

	if err := router.Run(port); err != nil {
		log.Fatalf("failed to start server: %v", err)
	}
}
