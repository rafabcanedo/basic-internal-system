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

type CostController struct {
	service service.CostService
}

func NewCostController(service service.CostService) *CostController {
	return &CostController{service: service}
}

func (cc *CostController) CreateCost(c *gin.Context) {
	userID := c.GetString("userID")

	var req request.CreateCostRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		restErr := validation.ValidateCostError(err)
		c.JSON(restErr.Code, restErr)
		return
	}

	domain := domains.NewCostDomain(userID, req.GroupID, req.CostName, req.Category, req.TotalValue, 0)

	created, restErr := cc.service.Create(domain, req.OwnerPercentage)
	if restErr != nil {
		c.JSON(restErr.Code, restErr)
		return
	}

	c.JSON(http.StatusCreated, view.ConvertCostDomainToResponse(created))
}

func (cc *CostController) FindAllCosts(c *gin.Context) {
	userID := c.GetString("userID")

	costs, restErr := cc.service.FindAll(userID)
	if restErr != nil {
		c.JSON(restErr.Code, restErr)
		return
	}

	c.JSON(http.StatusOK, view.ConvertCostDomainListToResponse(costs))
}

func (cc *CostController) FindCostByID(c *gin.Context) {
	id := c.Param("id")
	userID := c.GetString("userID")

	cost, restErr := cc.service.FindByID(id, userID)
	if restErr != nil {
		c.JSON(restErr.Code, restErr)
		return
	}

	c.JSON(http.StatusOK, view.ConvertCostDomainToDetailResponse(cost))
}

func (cc *CostController) UpdateCost(c *gin.Context) {
	id := c.Param("id")
	userID := c.GetString("userID")

	var req request.UpdateCostRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		restErr := validation.ValidateCostError(err)
		c.JSON(restErr.Code, restErr)
		return
	}

	ownerPercentage := 0.0
	if req.OwnerPercentage != nil {
		ownerPercentage = *req.OwnerPercentage
	}

	domain := domains.NewCostDomain(userID, "", req.CostName, req.Category, req.TotalValue, ownerPercentage)

	updated, restErr := cc.service.Update(id, userID, domain)
	if restErr != nil {
		c.JSON(restErr.Code, restErr)
		return
	}

	c.JSON(http.StatusOK, view.ConvertCostDomainToDetailResponse(updated))
}

func (cc *CostController) DeleteCost(c *gin.Context) {
	id := c.Param("id")
	userID := c.GetString("userID")

	restErr := cc.service.Delete(id, userID)
	if restErr != nil {
		c.JSON(restErr.Code, restErr)
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "cost deleted successfully"})
}
