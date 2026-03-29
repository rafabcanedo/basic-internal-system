package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/rafabcanedo/basic-internal-system/internal-system-backend/internal/configuration/validation"
	"github.com/rafabcanedo/basic-internal-system/internal-system-backend/internal/model/domains"
	"github.com/rafabcanedo/basic-internal-system/internal-system-backend/internal/model/service"
	"github.com/rafabcanedo/basic-internal-system/internal-system-backend/internal/view"
	"github.com/rafabcanedo/basic-internal-system/internal-system-backend/internal/view/request"
)

type UserController struct {
	service service.UserService
}

func NewUserController(service service.UserService) *UserController {
	return &UserController{service: service}
}

func (uc *UserController) CreateUser(c *gin.Context) {
	var req request.CreateUserRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		restErr := validation.ValidateUserError(err)
		c.JSON(restErr.Code, restErr)
		return
	}

	domain := domains.NewUserDomain(req.Name, req.Email, req.Password, req.Phone)

	created, restErr := uc.service.Create(domain)
	if restErr != nil {
		c.JSON(restErr.Code, restErr)
		return
	}

	c.JSON(http.StatusCreated, view.ConvertDomainToResponse(created))
}

func (uc *UserController) FindAllUsers(c *gin.Context) {
	users, restErr := uc.service.FindAll()
	if restErr != nil {
		c.JSON(restErr.Code, restErr)
		return
	}

	c.JSON(http.StatusOK, view.ConvertDomainListToResponse(users))
}

func (uc *UserController) FindUserByID(c *gin.Context) {
	id := c.Param("id")

	user, restErr := uc.service.FindByID(id)
	if restErr != nil {
		c.JSON(restErr.Code, restErr)
		return
	}

	c.JSON(http.StatusOK, view.ConvertDomainToResponse(user))
}

func (uc *UserController) UpdateUser(c *gin.Context) {
	id := c.Param("id")

	var req request.UpdateUserRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		restErr := validation.ValidateUserError(err)
		c.JSON(restErr.Code, restErr)
		return
	}

	domain := domains.NewUserDomainWithID(id, req.Name, req.Email, req.Password, req.Phone)

	updated, restErr := uc.service.Update(domain)
	if restErr != nil {
		c.JSON(restErr.Code, restErr)
		return
	}

	c.JSON(http.StatusOK, view.ConvertDomainToResponse(updated))
}

func (uc *UserController) DeleteUser(c *gin.Context) {
	id := c.Param("id")

	restErr := uc.service.Delete(id)
	if restErr != nil {
		c.JSON(restErr.Code, restErr)
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "user deleted successfully"})
}
