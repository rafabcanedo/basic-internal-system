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

type ContactController struct {
	service service.ContactService
}

func NewContactController(service service.ContactService) *ContactController {
	return &ContactController{service: service}
}

func (cc *ContactController) CreateContact(c *gin.Context) {
	ownerID := c.GetString("userID")

	var req request.CreateContactRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		restErr := validation.ValidateContactError(err)
		c.JSON(restErr.Code, restErr)
		return
	}

	domain := domains.NewContactDomain(ownerID, req.Name, req.Email, req.Phone, req.Category)

	created, restErr := cc.service.Create(domain)
	if restErr != nil {
		c.JSON(restErr.Code, restErr)
		return
	}

	c.JSON(http.StatusCreated, view.ConvertContactDomainToResponse(created))
}

func (cc *ContactController) FindAllContacts(c *gin.Context) {
	ownerID := c.GetString("userID")

	contacts, restErr := cc.service.FindAll(ownerID)
	if restErr != nil {
		c.JSON(restErr.Code, restErr)
		return
	}

	c.JSON(http.StatusOK, view.ConvertContactDomainListToResponse(contacts))
}

func (cc *ContactController) FindContactByID(c *gin.Context) {
	id := c.Param("id")
	ownerID := c.GetString("userID")

	contact, restErr := cc.service.FindByID(id, ownerID)
	if restErr != nil {
		c.JSON(restErr.Code, restErr)
		return
	}

	c.JSON(http.StatusOK, view.ConvertContactDomainToResponse(contact))
}

func (cc *ContactController) UpdateContact(c *gin.Context) {
	id := c.Param("id")
	ownerID := c.GetString("userID")

	var req request.UpdateContactRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		restErr := validation.ValidateContactError(err)
		c.JSON(restErr.Code, restErr)
		return
	}

	domain := domains.NewContactDomainWithID(id, ownerID, req.Name, req.Email, req.Phone, req.Category)

	updated, restErr := cc.service.Update(domain)
	if restErr != nil {
		c.JSON(restErr.Code, restErr)
		return
	}

	c.JSON(http.StatusOK, view.ConvertContactDomainToResponse(updated))
}

func (cc *ContactController) DeleteContact(c *gin.Context) {
	id := c.Param("id")
	ownerID := c.GetString("userID")

	restErr := cc.service.Delete(id, ownerID)
	if restErr != nil {
		c.JSON(restErr.Code, restErr)
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "contact deleted successfully"})
}
