package main

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	router.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"status": "ok",
		})
	})

	port := ":3333"
	log.Printf("Server running on %s", port)

	if err := router.Run(port); err != nil {
		log.Fatalf("failed to start server: %v", err)
	}
}
