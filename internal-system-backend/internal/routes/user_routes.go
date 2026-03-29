package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/rafabcanedo/basic-internal-system/internal-system-backend/internal/controller"
)

func UserRoutes(router *gin.Engine, ctrl *controller.UserController) {
	users := router.Group("/users")
	{
		users.POST("", ctrl.CreateUser)
		users.GET("", ctrl.FindAllUsers)
		users.GET("/:id", ctrl.FindUserByID)
		users.PUT("/:id", ctrl.UpdateUser)
		users.DELETE("/:id", ctrl.DeleteUser)
	}
}
