package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/rafabcanedo/basic-internal-system/internal-system-backend/internal/auth"
	"github.com/rafabcanedo/basic-internal-system/internal-system-backend/internal/controller"
)

func UserRoutes(router *gin.Engine, ctrl *controller.UserController) {
	router.POST("/user", ctrl.CreateUser)

    user := router.Group("/user")
    user.Use(auth.Middleware())
    {
        user.GET("/:id", ctrl.FindUserByID)
        user.PUT("/:id", ctrl.UpdateUser)
        user.DELETE("/:id", ctrl.DeleteUser)
    }

    users := router.Group("/users")
    users.Use(auth.Middleware())
    {
        users.GET("", ctrl.FindAllUsers)
    }
}
